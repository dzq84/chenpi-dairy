import express from 'express';
import { z } from 'zod';

const router = express.Router();

// 请求参数验证
const reviewsQuerySchema = z.object({
  type: z.enum(['daily', 'weekly', 'monthly']),
});

// 模拟每日回顾数据
const dailyReviews = [
  {
    id: 'daily-1',
    type: 'daily' as const,
    date: new Date().toISOString(),
    title: '今日自我觉察',
    summary: '今天在处理工作项目时感到压力较大，但通过与同事沟通后找到了解决方案。晚上散步时心情放松了许多。',
    content: '今天在处理工作项目时感到压力较大，但通过与同事沟通后找到了解决方案。晚上散步时心情放松了许多。其实压力来源主要是对结果的担忧，但当我和同事分享我的想法后，发现大家的想法都很相似，这让我感到不那么孤单了。通过这个经历，我意识到沟通的重要性，以及团队合作能够带来的积极影响。在散步的过程中，我注意到了路边的风景，这让我的心情得到了舒缓。',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80'
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'daily-2',
    type: 'daily' as const,
    date: new Date(Date.now() - 86400000).toISOString(),
    title: '情绪的起伏',
    summary: '上午心情不错，完成了一项重要的任务。下午因为一个小失误有些沮丧，但很快调整了心态。',
    content: '上午心情不错，完成了一项重要的任务。下午因为一个小失误有些沮丧，但很快调整了心态。这个失误让我意识到，即使在顺利的时候，也要保持警惕和专注。我学会了一个重要教训：不要因为一时的成功而放松对自己的要求。另外，通过和朋友聊天，我发现原来每个人都会遇到类似的问题，这让我感觉好多了。明天我会更加小心，同时也会继续保持积极的态度。',
    images: [
      'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&q=80'
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'daily-3',
    type: 'daily' as const,
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    title: '平静的一天',
    summary: '今天过得很平静，没有太多波折。和陪聊伙伴交流后，对最近的状态有了更清晰的认识。',
    content: '今天过得很平静，没有太多波折。和陪聊伙伴交流后，对最近的状态有了更清晰的认识。我们聊到了很多关于自我接纳的话题，让我意识到接纳自己是一个持续的过程。我学会了在忙碌的生活中给自己一些喘息的空间，这不是逃避，而是为了更好地前进。今天虽然没有什么特别的事件发生，但这种内心的平静让我感觉很充实。',
    images: [
      'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=800&q=80',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80'
    ],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

// 模拟每周回顾数据
const weeklyReviews = [
  {
    id: 'weekly-1',
    type: 'weekly' as const,
    date: new Date().toISOString(),
    title: '本周情绪关键词：成长与调整',
    summary: '这周在工作和生活中都面临了一些挑战，但通过积极的心态调整和寻求帮助，最终都得到了解决。情绪总体平稳，有明显的自我觉察提升。',
    content: '这周在工作和生活中都面临了一些挑战，但通过积极的心态调整和寻求帮助，最终都得到了解决。情绪总体平稳，有明显的自我觉察提升。\n\n工作上，遇到了一个需要团队协作的项目。起初大家意见不一，但通过耐心沟通，最终达成了共识。这个过程让我学到了倾听的重要性，以及如何在保持自己观点的同时尊重他人的想法。\n\n生活方面，这周开始尝试每天早晨冥想，虽然时间不长，但对整个人的状态有很大的帮助。我发现自己在面对压力时能够更快地平静下来。\n\n本周的情绪关键词"成长"和"调整"很好地概括了我的状态。成长来自于面对挑战的过程，调整则来自于对自己情绪的觉察和管理。这个星期让我更相信，只要有正确的心态，任何困难都可以被克服。',
    keywords: ['成长', '调整', '平稳', '觉察'],
    images: [
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80',
      'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?w=800&q=80',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80'
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'weekly-2',
    type: 'weekly' as const,
    date: new Date(Date.now() - 86400000 * 7).toISOString(),
    title: '本周情绪关键词：探索与反思',
    summary: '本周进行了很多内省，对自己的情绪和需求有了更深的理解。虽然有些时刻感到迷茫，但通过书写和交流逐渐找到了方向。',
    content: '本周进行了很多内省，对自己的情绪和需求有了更深的理解。虽然有些时刻感到迷茫，但通过书写和交流逐渐找到了方向。\n\n这周花了很多时间思考自己的职业规划和人生目标。我意识到，与其担心未来，不如专注于当下可以做的事情。这个想法让我感到释然。\n\n和家人朋友聊天时，我分享了一些自己的困惑。他们的支持和建议让我看到了不同的角度。有时候我们会被自己的思维限制住，而外界的声音能帮助我们打破这些限制。\n\n"探索"和"反思"是这周的关键词。探索意味着走出舒适区，尝试新的可能性；反思则意味着停下来审视自己，不断学习和改进。下周我希望继续保持这种内省的习惯，同时将更多想法付诸行动。',
    keywords: ['探索', '反思', '迷茫', '方向'],
    images: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80'
    ],
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
];

// 模拟每月回顾数据
const monthlyReviews = [
  {
    id: 'monthly-1',
    type: 'monthly' as const,
    date: new Date().toISOString(),
    title: '一月总结：在变化中寻找平衡',
    summary: '这个月在工作上取得了进展，生活中也保持了规律的作息。通过日记和陪聊，对自己的情绪模式有了更深的理解。',
    content: '这个月在工作上取得了进展，生活中也保持了规律的作息。通过日记和陪聊，对自己的情绪模式有了更深的理解。\n\n工作方面，完成了一个重要的项目，得到了团队的认可。这个过程虽然辛苦，但结果让我感到值得。我学会了更好地管理时间，区分优先级，这让我在忙碌中依然能够保持效率。\n\n生活方面，这月养成了几个好习惯：每天晚上写日记，每周三次运动，以及保持规律的作息。这些看似简单的习惯，对我的身心健康产生了积极的影响。\n\n情绪管理方面，通过持续的日记记录，我发现自己的一些情绪模式。例如，在压力大时，我倾向于拖延而不是直接面对。意识到这一点后，我开始尝试改变，虽然还需要时间，但已经看到了一些进步。\n\n在变化中寻找平衡，是我这个月最大的收获。外部环境在不断变化，但我可以通过内在的调整，保持内心的平静和方向。',
    modules: ['工作', '生活', '情绪管理'],
    images: [
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80'
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'monthly-2',
    type: 'monthly' as const,
    date: new Date(Date.now() - 86400000 * 30).toISOString(),
    title: '上月总结：自我觉察的深化',
    summary: '上月专注于提升自我觉察能力，通过持续的日记记录和对话练习，逐渐建立了更稳定的内在支持系统。',
    content: '上月专注于提升自我觉察能力，通过持续的日记记录和对话练习，逐渐建立了更稳定的内在支持系统。\n\n自我成长方面，我认识到觉察是一切改变的前提。只有当我们清楚地看见自己的思维模式、情绪反应和行为习惯，才能做出有意识的选择。这个月我练习在日常生活中保持觉察，例如在做决定时问自己"我为什么这么做"，在情绪激动时观察自己的身体反应。\n\n情绪觉察方面，我学会了给自己的情绪命名。当我能够准确地说出"我感到沮丧"而不是"我感觉不好"时，这种精确的描述反而让我更容易处理情绪。我还发现，情绪本身没有好坏之分，关键是如何与之相处。\n\n对话练习方面，我和陪聊伙伴进行了多次深入的交流。这些对话帮助我看到了自己的盲点，也让我学会了更好地倾听和理解他人。有时候，我们需要的不是答案，而是被听见。\n\n这个月的经历让我明白，自我觉察不是一次性的，而是一个持续的过程。每一天都是学习和成长的机会。',
    modules: ['自我成长', '情绪觉察', '对话练习'],
    images: [
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80'
    ],
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
];

// GET /api/v1/reviews - 获取回顾列表
router.get('/', async (req, res) => {
  try {
    const { type } = reviewsQuerySchema.parse(req.query);

    // 根据类型返回对应的模拟数据
    let reviews = [];
    switch (type) {
      case 'daily':
        reviews = dailyReviews;
        break;
      case 'weekly':
        reviews = weeklyReviews;
        break;
      case 'monthly':
        reviews = monthlyReviews;
        break;
    }

    res.json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.error('获取回顾列表错误:', error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: '请求参数错误', details: error.issues });
    } else {
      res.status(500).json({ error: '服务器错误' });
    }
  }
});

// GET /api/v1/reviews/:id - 获取回顾详情
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // 查找对应ID的回顾
    const allReviews = [...dailyReviews, ...weeklyReviews, ...monthlyReviews];
    const review = allReviews.find(r => r.id === id);

    if (!review) {
      res.status(404).json({ error: '回顾不存在' });
      return;
    }

    res.json({
      success: true,
      review,
    });
  } catch (error) {
    console.error('获取回顾详情错误:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// POST /api/v1/reviews - 创建新回顾（预留接口）
router.post('/', async (req, res) => {
  try {
    // TODO: 集成真实的 LLM API 生成回顾
    // 目前返回模拟响应
    res.json({
      success: true,
      message: '回顾生成功能正在开发中',
    });
  } catch (error) {
    console.error('创建回顾错误:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// DELETE /api/v1/reviews/:id - 删除回顾
router.delete('/:id', async (req, res) => {
  try {
    // TODO: 实现删除功能
    res.json({
      success: true,
      message: '回顾删除成功',
    });
  } catch (error) {
    console.error('删除回顾错误:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

// PUT /api/v1/reviews/:id - 更新回顾
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary, content, images } = req.body;

    // 在所有回顾数组中查找并更新
    let updatedReview = null;

    // 查找并更新每日回顾
    const dailyIndex = dailyReviews.findIndex(r => r.id === id);
    if (dailyIndex !== -1) {
      dailyReviews[dailyIndex] = {
        ...dailyReviews[dailyIndex],
        title: title || dailyReviews[dailyIndex].title,
        summary: summary || dailyReviews[dailyIndex].summary,
        content: content || dailyReviews[dailyIndex].content,
        images: images !== undefined ? images : dailyReviews[dailyIndex].images,
      };
      updatedReview = dailyReviews[dailyIndex];
    }

    // 查找并更新每周回顾
    const weeklyIndex = weeklyReviews.findIndex(r => r.id === id);
    if (weeklyIndex !== -1) {
      weeklyReviews[weeklyIndex] = {
        ...weeklyReviews[weeklyIndex],
        title: title || weeklyReviews[weeklyIndex].title,
        summary: summary || weeklyReviews[weeklyIndex].summary,
        content: content || weeklyReviews[weeklyIndex].content,
        images: images !== undefined ? images : weeklyReviews[weeklyIndex].images,
      };
      updatedReview = weeklyReviews[weeklyIndex];
    }

    // 查找并更新每月回顾
    const monthlyIndex = monthlyReviews.findIndex(r => r.id === id);
    if (monthlyIndex !== -1) {
      monthlyReviews[monthlyIndex] = {
        ...monthlyReviews[monthlyIndex],
        title: title || monthlyReviews[monthlyIndex].title,
        summary: summary || monthlyReviews[monthlyIndex].summary,
        content: content || monthlyReviews[monthlyIndex].content,
        images: images !== undefined ? images : monthlyReviews[monthlyIndex].images,
      };
      updatedReview = monthlyReviews[monthlyIndex];
    }

    if (!updatedReview) {
      return res.status(404).json({ error: '回顾不存在' });
    }

    res.json({
      success: true,
      message: '回顾更新成功',
      review: updatedReview,
    });
  } catch (error) {
    console.error('更新回顾错误:', error);
    res.status(500).json({ error: '服务器错误' });
  }
});

export default router;
