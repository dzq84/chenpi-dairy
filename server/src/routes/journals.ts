import express from 'express';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { insertJournalEntrySchema } from '@/storage/database/shared/schema';
import { z } from 'zod';

const router = express.Router();

// 获取今日日记列表
router.get('/today', async (req, res) => {
  try {
    const client = getSupabaseClient();

    // 获取今天的日期范围
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const { data, error } = await client
      .from('journal_entries')
      .select('*')
      .gte('created_at', startOfDay.toISOString())
      .lt('created_at', endOfDay.toISOString())
      .order('created_at', { ascending: false });

    if (error) {
      console.error('查询今日日记失败:', error);
      return res.status(500).json({ error: '查询失败' });
    }

    res.json({ data: data || [] });
  } catch (err: any) {
    console.error('查询今日日记异常:', err);
    res.status(500).json({ error: err.message || '服务器错误' });
  }
});

// 创建日记
router.post('/', async (req, res) => {
  try {
    const client = getSupabaseClient();

    // 验证请求数据
    const validatedData = insertJournalEntrySchema.parse(req.body);

    // 插入日记
    const { data, error } = await client
      .from('journal_entries')
      .insert(validatedData)
      .select()
      .single();

    if (error) {
      console.error('创建日记失败:', error);
      return res.status(500).json({ error: '创建失败' });
    }

    res.status(201).json({ data });
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
    const client = getSupabaseClient();

    const { data, error } = await client
      .from('journal_entries')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('查询日记失败:', error);
      return res.status(500).json({ error: '查询失败' });
    }

    if (!data) {
      return res.status(404).json({ error: '日记不存在' });
    }

    res.json({ data });
  } catch (err: any) {
    console.error('查询日记异常:', err);
    res.status(500).json({ error: err.message || '服务器错误' });
  }
});

// 更新日记
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const client = getSupabaseClient();

    // 验证请求数据
    const validatedData = insertJournalEntrySchema.partial().parse(req.body);

    // 更新日记
    const { data, error } = await client
      .from('journal_entries')
      .update({
        ...validatedData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('更新日记失败:', error);
      return res.status(500).json({ error: '更新失败' });
    }

    if (!data) {
      return res.status(404).json({ error: '日记不存在' });
    }

    res.json({ data });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      console.error('数据验证失败:', err.issues);
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
    const client = getSupabaseClient();

    const { error } = await client
      .from('journal_entries')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('删除日记失败:', error);
      return res.status(500).json({ error: '删除失败' });
    }

    res.status(204).send();
  } catch (err: any) {
    console.error('删除日记异常:', err);
    res.status(500).json({ error: err.message || '服务器错误' });
  }
});

export default router;
