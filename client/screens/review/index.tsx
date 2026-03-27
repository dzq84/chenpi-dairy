import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useSafeRouter } from '@/hooks/useSafeRouter';
import { useTheme } from '@/hooks/useTheme';
import { Screen } from '@/components/Screen';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FontAwesome6 } from '@expo/vector-icons';
import { createStyles } from './styles';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import Toast from 'react-native-toast-message';

interface Stats {
  totalJournals: number;
  todayJournals: number;
  weekJournals: number;
  totalReviews: number;
  streak: number;
  moodCounts: { happy: number; calm: number; sad: number };
}

interface Review {
  id: string;
  type: string;
  date: string;
  title: string;
  summary: string;
  content: string;
  mood?: string;
  keywords?: string[];
  journalCount?: number;
  createdAt: string;
}

export default function ReviewScreen() {
  const { theme } = useTheme();
  const router = useSafeRouter();
  const styles = createStyles(theme);
  const [stats, setStats] = useState<Stats | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const [statsRes, reviewsRes] = await Promise.all([
        fetch(`${process.env.EXPO_PUBLIC_BACKEND_BASE_URL}/api/v1/reviews/stats`),
        fetch(`${process.env.EXPO_PUBLIC_BACKEND_BASE_URL}/api/v1/reviews`),
      ]);
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
      if (reviewsRes.ok) {
        const reviewsData = await reviewsRes.json();
        setReviews(reviewsData.reviews || []);
      }
    } catch (e) {
      console.error('加载数据失败:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    loadData();
  }, []);

  const handleGenerate = async (type: string) => {
    setGenerating(type);
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_BASE_URL}/api/v1/reviews/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });
      const data = await res.json();
      if (res.ok) {
        Toast.show({ type: 'success', text1: '回顾生成成功', position: 'bottom' });
        loadData();
      } else {
        Toast.show({ type: 'error', text1: data.error || '生成失败', position: 'bottom' });
      }
    } catch (e) {
      Toast.show({ type: 'error', text1: '生成失败', position: 'bottom' });
    } finally {
      setGenerating('');
    }
  };

  const getMoodEmoji = (mood?: string) => {
    switch (mood) {
      case 'happy': return '😊';
      case 'sad': return '😢';
      case 'mixed': return '🤔';
      default: return '😌';
    }
  };

  const getCardBg = (index: number) => {
    const colors = [theme.cardPeach, theme.cardSage, theme.cardPeriwinkle];
    return colors[index % colors.length];
  };

  return (
    <Screen backgroundColor={theme.backgroundRoot} statusBarStyle="dark">
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadData(); }} />}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <ThemedText variant="body" color={theme.textSecondary}>你的成长轨迹</ThemedText>
            <ThemedText variant="h1" color={theme.textPrimary} style={styles.heroTitle}>
              心灵{'\n'}回顾
            </ThemedText>
          </View>
        </View>

        {/* 统计大卡片 - 蜜桃色 */}
        <View style={[styles.statHeroCard, { backgroundColor: theme.cardPeach }]}>
          <ThemedText style={styles.statLabel} color={theme.textPrimary}>累计记录</ThemedText>
          <ThemedText style={styles.statHeroNumber} color={theme.textPrimary}>
            {stats?.totalJournals || 0}
          </ThemedText>
          <ThemedText style={styles.statUnit} color={theme.textPrimary}>篇日记</ThemedText>
          <View style={styles.statHeroAction}>
            <ThemedText style={{ fontSize: 14, fontWeight: '500' }} color={theme.textPrimary}>
              连续记录 {stats?.streak || 0} 天
            </ThemedText>
            <ThemedText color={theme.textPrimary}>→</ThemedText>
          </View>
        </View>

        {/* 2x2 网格指标 */}
        <View style={styles.grid2}>
          <View style={[styles.metricCard, { backgroundColor: theme.cardSage }]}>
            <ThemedText style={styles.statLabel} color={theme.textPrimary}>今日</ThemedText>
            <ThemedText style={styles.metricNumber} color={theme.textPrimary}>
              {stats?.todayJournals || 0}
            </ThemedText>
            <ThemedText style={styles.metricUnit} color={theme.textSecondary}>篇</ThemedText>
          </View>
          <View style={[styles.metricCard, { backgroundColor: theme.cardPeriwinkle }]}>
            <ThemedText style={styles.statLabel} color={theme.textPrimary}>本周</ThemedText>
            <ThemedText style={styles.metricNumber} color={theme.textPrimary}>
              {stats?.weekJournals || 0}
            </ThemedText>
            <ThemedText style={styles.metricUnit} color={theme.textSecondary}>篇</ThemedText>
          </View>
        </View>

        {/* AI 生成回顾 - 描边卡片 */}
        <View style={styles.generateCard}>
          <ThemedText variant="h3" color={theme.textPrimary} style={{ marginBottom: 8 }}>
            AI 生成回顾
          </ThemedText>
          <ThemedText variant="body" color={theme.textSecondary} style={{ marginBottom: 16 }}>
            根据你的日记，AI 会为你生成温暖的回顾总结。
          </ThemedText>

          {[
            { type: 'daily', label: '今日回顾', icon: 'sun' },
            { type: 'weekly', label: '本周回顾', icon: 'calendar-week' },
            { type: 'monthly', label: '本月回顾', icon: 'calendar' },
          ].map((item) => (
            <TouchableOpacity
              key={item.type}
              style={styles.generateItem}
              onPress={() => handleGenerate(item.type)}
              disabled={!!generating}
            >
              <View style={styles.generateItemLeft}>
                <View style={styles.generateIcon}>
                  {generating === item.type ? (
                    <ActivityIndicator size="small" color={theme.textPrimary} />
                  ) : (
                    <FontAwesome6 name={item.icon as any} size={16} color={theme.textPrimary} />
                  )}
                </View>
                <ThemedText variant="bodyMedium" color={theme.textPrimary}>{item.label}</ThemedText>
              </View>
              <ThemedText color={theme.textMuted}>→</ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {/* 心情统计 - 蓝色卡 */}
        {stats && (stats.moodCounts.happy > 0 || stats.moodCounts.calm > 0 || stats.moodCounts.sad > 0) && (
          <View style={[styles.moodCard, { backgroundColor: theme.cardPeriwinkle }]}>
            <ThemedText style={styles.statLabel} color={theme.textPrimary}>心情分布</ThemedText>
            <View style={styles.moodRow}>
              <View style={styles.moodItem}>
                <ThemedText style={{ fontSize: 28 }}>😊</ThemedText>
                <ThemedText style={styles.moodCount} color={theme.textPrimary}>{stats.moodCounts.happy}</ThemedText>
              </View>
              <View style={styles.moodItem}>
                <ThemedText style={{ fontSize: 28 }}>😌</ThemedText>
                <ThemedText style={styles.moodCount} color={theme.textPrimary}>{stats.moodCounts.calm}</ThemedText>
              </View>
              <View style={styles.moodItem}>
                <ThemedText style={{ fontSize: 28 }}>😢</ThemedText>
                <ThemedText style={styles.moodCount} color={theme.textPrimary}>{stats.moodCounts.sad}</ThemedText>
              </View>
            </View>
          </View>
        )}

        {/* 历史回顾列表 */}
        {reviews.length > 0 && (
          <>
            <ThemedText style={styles.sectionTitle} color={theme.textPrimary}>历史回顾</ThemedText>
            {reviews.map((review, index) => (
              <TouchableOpacity
                key={review.id}
                style={[styles.reviewCard, { backgroundColor: getCardBg(index) }]}
                onPress={() => router.push('/review-detail', { id: review.id })}
                activeOpacity={0.8}
              >
                <View style={styles.reviewCardHeader}>
                  <ThemedText style={styles.statLabel} color={theme.textPrimary}>
                    {review.type === 'daily' ? '每日' : review.type === 'weekly' ? '每周' : '每月'}回顾
                  </ThemedText>
                  <ThemedText style={{ fontSize: 20 }}>{getMoodEmoji(review.mood)}</ThemedText>
                </View>
                <ThemedText style={styles.reviewCardTitle} color={theme.textPrimary}>
                  {review.title}
                </ThemedText>
                <ThemedText style={styles.reviewCardSummary} color={theme.textPrimary} numberOfLines={2}>
                  {review.summary}
                </ThemedText>
                {review.keywords && review.keywords.length > 0 && (
                  <View style={styles.keywordsRow}>
                    {review.keywords.map((kw, i) => (
                      <View key={i} style={styles.keywordTag}>
                        <ThemedText style={{ fontSize: 12 }} color={theme.textPrimary}>{kw}</ThemedText>
                      </View>
                    ))}
                  </View>
                )}
                <View style={styles.reviewCardFooter}>
                  <ThemedText style={{ fontSize: 13, opacity: 0.6 }} color={theme.textPrimary}>
                    {dayjs(review.createdAt).format('M月D日 HH:mm')}
                  </ThemedText>
                  <ThemedText style={{ fontSize: 14, fontWeight: '500' }} color={theme.textPrimary}>
                    查看详情 →
                  </ThemedText>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </Screen>
  );
}
