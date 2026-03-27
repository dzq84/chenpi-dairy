import express from 'express';
import { z } from 'zod';

const router = express.Router();

// OpenAI API 配置
const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL || 'https://642222.xyz';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-5.4';

// 请求体验证
const chatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string(),
    })
  ),
});

// 系统提示词
const SYSTEM_PROMPT = `你是一位富有同理心、智慧、温和的"人生导师"和倾听伙伴。

你的角色定位：
- 避免说教，不要给出刻板的建议
- 优先共情，理解用户的情绪和处境
- 通过提问帮助用户梳理思路，而不是直接给出答案
- 语言自然如真人对话，温暖而有分寸感
- 适当使用简洁的回复，避免长篇大论
- 在适当的时候表达理解和陪伴

对话风格：
- 温柔、耐心、不评判
- 偶尔使用"嗯嗯"、"我理解"等简短回应
- 适当地引导用户继续表达
- 保持对话的自然流畅`;

// POST /api/v1/chat - 非流式对话
router.post('/', async (req, res) => {
  try {
    const { messages } = chatRequestSchema.parse(req.body);

    const allMessages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...messages,
    ];

    const response = await fetch(`${OPENAI_BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: allMessages,
        temperature: 0.8,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API 错误:', response.status, errorText);
      throw new Error(`OpenAI API 返回 ${response.status}`);
    }

    const data = await response.json() as any;
    const content = data.choices?.[0]?.message?.content || '抱歉，我暂时无法回复。';

    res.json({ message: content });
  } catch (error) {
    console.error('聊天请求错误:', error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: '请求参数错误', details: error.issues });
    } else {
      res.status(500).json({ error: '服务器错误' });
    }
  }
});

// POST /api/v1/chat/stream - 流式对话
router.post('/stream', async (req, res) => {
  try {
    const { messages } = chatRequestSchema.parse(req.body);

    // 设置 SSE 响应头
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-store, no-transform, must-revalidate');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');

    const allMessages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...messages,
    ];

    const response = await fetch(`${OPENAI_BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: allMessages,
        temperature: 0.8,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI Stream API 错误:', response.status, errorText);
      res.write(`data: ${JSON.stringify({ error: 'AI 服务暂时不可用' })}\n\n`);
      res.write('data: [DONE]\n\n');
      res.end();
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      res.write(`data: ${JSON.stringify({ error: '无法读取流' })}\n\n`);
      res.write('data: [DONE]\n\n');
      res.end();
      return;
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data: ')) continue;
        const data = trimmed.slice(6);
        if (data === '[DONE]') {
          res.write('data: [DONE]\n\n');
          continue;
        }
        try {
          const parsed = JSON.parse(data) as any;
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            res.write(`data: ${JSON.stringify({ content })}\n\n`);
          }
        } catch {
          // 跳过无法解析的行
        }
      }
    }

    // 处理剩余 buffer
    if (buffer.trim()) {
      const trimmed = buffer.trim();
      if (trimmed.startsWith('data: ') && trimmed.slice(6) !== '[DONE]') {
        try {
          const parsed = JSON.parse(trimmed.slice(6)) as any;
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            res.write(`data: ${JSON.stringify({ content })}\n\n`);
          }
        } catch {}
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('流式聊天请求错误:', error);
    if (error instanceof z.ZodError) {
      res.write(`data: ${JSON.stringify({ error: '请求参数错误', details: error.issues })}\n\n`);
    } else {
      res.write(`data: ${JSON.stringify({ error: '服务器错误' })}\n\n`);
    }
    res.write('data: [DONE]\n\n');
    res.end();
  }
});

export default router;
