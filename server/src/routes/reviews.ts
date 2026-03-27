import express from 'express';
import { z } from 'zod';
import { randomUUID } from 'crypto';

const router = express.Router();

const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL || 'https://642222.xyz';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-5.4';

// 内存存储所有回顾
let allReviews: any[] = [];

// 请求参数验证
const reviewsQuerySchema = z.object({
  type: z.enum(['daily', 'weekly', 'monthly']).optional(),
});

// 引入日记存储（从 journals 路由获取）
// 由于是内存存储，我们直接导入共享的日记数据
import { getJournalEntries } from './journals';

// 用 AI 生成回顾
async function generateAIReview(journals: any[], type: string): Promise<{ title: string; summary: string; content: string; mood: string; keywords: string[] }> {
  const journalTexts = journals.map((j, i) => {
    const mood = j.mood ? `(心情: ${j.mood})` : '';
    return `[${i + 1}] ${j.text || '(无文字)'} ${mood}`;
  }).join('\n');

  const typeLabel = type === 'daily' ? '今日' : type === 'weekly' ? '本周' : '本月';

  const prompt = `你是一位温暖的心理日记分析师。请根据以下${typeLabel}日记内容，生成一份回顾报告。

日记内容：
${journalTexts}

请以JSON格式返回（不要包含markdown代码块标记），字段如下：
{
  "title": "简短有温度的标题（10字以内）",
  "summary": "一句话总结（30字以内）",
  "content": "详细的回顾内容（100-200字，温暖鼓励的语气）",
  "mood": "overall mood: happy/calm/sad/mixed",
  "keywords": ["关键词1", "关键词2", "关键词3"]
}`;

  try {
    const response = await fetch(`${OPENAI_BASE_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) throw new Error('AI API failed');

    const data = await response.json() as any;
    let text = data.choices?.[0]?.message?.content || '';
    // 去除可能的 markdown 代码块
    text = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    return JSON.parse(text);
  } catch (e) {
    console.error('AI 回顾生成失败:', e);
    return {
      title: `${typeLabel}回顾`,
      summary: `记录了 ${journals.length} 篇日记`,
      content: `${typeLabel}共记录了 ${journals.length} 篇日记。继续保持记录的习惯，你做得很好！`,
      mood: 'calm',
      keywords: ['记录', '坚持', '成长'],
    };
  }
}

// GET /api/v1/reviews - 获取回顾列表
router.get('/', async (req, res) => {
  try {
    const { type } = reviewsQuerySchema.parse(req.query);

    let reviews = allReviews;
    if (type) {
      reviews = allReviews.filter(r => r.type === type);
    }

    // 按日期倒序
    reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json({ success: true, reviews });
  } catch (error) {
    console.error('获取回顾列表错误:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// GET /api/v1/reviews/stats - 获取统计数据
router.get('/stats', async (req, res) => {
  try {
    const journals = getJournalEntries();
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const todayJournals = journals.filter(j => new Date(j.created_at) >= startOfDay);
    const weekJournals = journals.filter(j => new Date(j.created_at) >= startOfWeek);

    // 心情统计
    const moodCounts = { happy: 0, calm: 0, sad: 0 };
    journals.forEach(j => {
      if (j.mood && moodCounts.hasOwnProperty(j.mood)) {
        (moodCounts as any)[j.mood]++;
      }
    });

    // 连续记录天数（简化计算）
    const uniqueDays = new Set(journals.map(j =>
      new Date(j.created_at).toDateString()
    ));
    let streak = 0;
    const d = new Date();
    while (uniqueDays.has(d.toDateString())) {
      streak++;
      d.setDate(d.getDate() - 1);
    }

    res.json({
      totalJournals: journals.length,
      todayJournals: todayJournals.length,
      weekJournals: weekJournals.length,
      totalReviews: allReviews.length,
      streak,
      moodCounts,
    });
  } catch (error) {
    console.error('获取统计错误:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// GET /api/v1/reviews/:id - 获取回顾详情
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const review = allReviews.find(r => r.id === id);
    if (!review) {
      return res.status(404).json({ error: '回顾不存在' });
    }
    res.json({ success: true, review });
  } catch (error) {
    console.error('获取回顾详情错误:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// POST /api/v1/reviews/generate - AI 生成回顾
router.post('/generate', async (req, res) => {
  try {
    const { type } = req.body;
    if (!['daily', 'weekly', 'monthly'].includes(type)) {
      return res.status(400).json({ error: '无效的回顾类型' });
    }

    const journals = getJournalEntries();
    const now = new Date();
    let filteredJournals: any[] = [];

    if (type === 'daily') {
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      filteredJournals = journals.filter(j => new Date(j.created_at) >= startOfDay);
    } else if (type === 'weekly') {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - 7);
      filteredJournals = journals.filter(j => new Date(j.created_at) >= startOfWeek);
    } else {
      const startOfMonth = new Date(now);
      startOfMonth.setDate(now.getDate() - 30);
      filteredJournals = journals.filter(j => new Date(j.created_at) >= startOfMonth);
    }

    if (filteredJournals.length === 0) {
      return res.status(400).json({ error: '没有足够的日记来生成回顾，请先写一些日记吧' });
    }

    const aiResult = await generateAIReview(filteredJournals, type);

    const review = {
      id: randomUUID(),
      type,
      date: now.toISOString(),
      title: aiResult.title,
      summary: aiResult.summary,
      content: aiResult.content,
      mood: aiResult.mood,
      keywords: aiResult.keywords,
      journalCount: filteredJournals.length,
      createdAt: now.toISOString(),
    };

    allReviews.push(review);

    res.json({ success: true, review });
  } catch (error) {
    console.error('生成回顾错误:', error);
    res.status(500).json({ error: '生成回顾失败' });
  }
});

// PUT /api/v1/reviews/:id - 更新回顾
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const idx = allReviews.findIndex(r => r.id === id);
    if (idx === -1) return res.status(404).json({ error: '回顾不存在' });

    const { title, summary, content } = req.body;
    allReviews[idx] = { ...allReviews[idx], ...( title && { title }), ...(summary && { summary }), ...(content && { content }) };
    res.json({ success: true, review: allReviews[idx] });
  } catch (error) {
    console.error('更新回顾错误:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

export default router;
