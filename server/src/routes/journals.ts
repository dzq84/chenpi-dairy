import express from 'express';
import { z } from 'zod';
import { randomUUID } from 'crypto';

const router = express.Router();

// 内存存储（替代 Supabase，重启后数据会丢失）
let journalEntries: any[] = [];

// 导出获取日记数据的函数，供回顾功能使用
export function getJournalEntries() {
  return journalEntries;
}

// 创建日记验证
const insertJournalEntrySchema = z.object({
  user_id: z.string().optional(),
  text: z.string().optional(),
  mood: z.enum(["happy", "calm", "sad"]).nullable().optional(),
  images: z.array(z.string()).optional(),
  audio_uri: z.string().nullable().optional(),
  audio_duration: z.number().int().nullable().optional(),
});

// 获取今日日记列表
router.get('/today', async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const todayEntries = journalEntries.filter((entry) => {
      const createdAt = new Date(entry.created_at);
      return createdAt >= startOfDay && createdAt < endOfDay;
    }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    res.json({ data: todayEntries });
  } catch (err: any) {
    console.error('查询今日日记异常:', err);
    res.status(500).json({ error: err.message || '服务器错误' });
  }
});

// 创建日记
router.post('/', async (req, res) => {
  try {
    const validatedData = insertJournalEntrySchema.parse(req.body);

    const newEntry = {
      id: randomUUID(),
      ...validatedData,
      images: validatedData.images || [],
      created_at: new Date().toISOString(),
      updated_at: null,
    };

    journalEntries.push(newEntry);

    res.status(201).json({ data: newEntry });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      console.error('数据验证失败:', err.issues);
      return res.status(400).json({ error: '数据验证失败', details: err.issues });
    }
    console.error('创建日记异常:', err);
    res.status(500).json({ error: err.message || '服务器错误' });
  }
});

// 获取单条日记
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const entry = journalEntries.find((e) => e.id === id);

    if (!entry) {
      return res.status(404).json({ error: '日记不存在' });
    }

    res.json({ data: entry });
  } catch (err: any) {
    console.error('查询日记异常:', err);
    res.status(500).json({ error: err.message || '服务器错误' });
  }
});

// 更新日记
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = insertJournalEntrySchema.partial().parse(req.body);

    const index = journalEntries.findIndex((e) => e.id === id);
    if (index === -1) {
      return res.status(404).json({ error: '日记不存在' });
    }

    journalEntries[index] = {
      ...journalEntries[index],
      ...validatedData,
      updated_at: new Date().toISOString(),
    };

    res.json({ data: journalEntries[index] });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: '数据验证失败', details: err.issues });
    }
    console.error('更新日记异常:', err);
    res.status(500).json({ error: err.message || '服务器错误' });
  }
});

// 删除日记
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const index = journalEntries.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.status(404).json({ error: '日记不存在' });
    }

    journalEntries.splice(index, 1);
    res.status(204).send();
  } catch (err: any) {
    console.error('删除日记异常:', err);
    res.status(500).json({ error: err.message || '服务器错误' });
  }
});

export default router;
