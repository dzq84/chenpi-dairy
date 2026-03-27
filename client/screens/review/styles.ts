import { StyleSheet, Platform } from 'react-native';
import { Spacing, BorderRadius, Theme } from '@/constants/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    scrollContent: {
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.xl,
      paddingBottom: 120,
    },
    header: {
      marginBottom: Spacing.md,
    },
    heroTitle: {
      fontSize: 36,
      fontWeight: '400',
      letterSpacing: -0.5,
      lineHeight: 40,
    },
    // 大统计卡 - 蜜桃色
    statHeroCard: {
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      marginBottom: Spacing.sm,
      minHeight: 200,
      justifyContent: 'space-between',
    },
    statLabel: {
      fontSize: 12,
      fontWeight: '600',
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      opacity: 0.6,
    },
    statHeroNumber: {
      fontSize: 56,
      fontWeight: '300',
      lineHeight: 60,
      marginVertical: 8,
    },
    statUnit: {
      fontSize: 15,
      opacity: 0.7,
    },
    statHeroAction: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'rgba(255,255,255,0.25)',
      padding: 14,
      borderRadius: 999,
      marginTop: 16,
    },
    // 2x2 网格
    grid2: {
      flexDirection: 'row',
      gap: Spacing.sm,
      marginBottom: Spacing.sm,
    },
    metricCard: {
      flex: 1,
      aspectRatio: 1,
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      justifyContent: 'center',
      alignItems: 'center',
    },
    metricNumber: {
      fontSize: 32,
      fontWeight: '400',
      marginVertical: 4,
    },
    metricUnit: {
      fontSize: 14,
      opacity: 0.7,
    },
    // AI 生成卡
    generateCard: {
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      marginBottom: Spacing.sm,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: 'transparent',
    },
    generateItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(26,26,26,0.05)',
    },
    generateItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    generateIcon: {
      width: 36,
      height: 36,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: theme.textPrimary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    // 心情卡
    moodCard: {
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      marginBottom: Spacing.sm,
    },
    moodRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 16,
    },
    moodItem: {
      alignItems: 'center',
      gap: 6,
    },
    moodCount: {
      fontSize: 20,
      fontWeight: '500',
    },
    // 区块标题
    sectionTitle: {
      fontSize: 12,
      fontWeight: '600',
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      opacity: 0.6,
      marginBottom: Spacing.sm,
      marginTop: Spacing.xs,
    },
    // 回顾卡片
    reviewCard: {
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      marginBottom: Spacing.sm,
    },
    reviewCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    reviewCardTitle: {
      fontSize: 20,
      fontWeight: '400',
      lineHeight: 26,
      marginBottom: 6,
    },
    reviewCardSummary: {
      fontSize: 14,
      lineHeight: 20,
      opacity: 0.7,
      marginBottom: 12,
    },
    keywordsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      marginBottom: 12,
    },
    keywordTag: {
      backgroundColor: 'rgba(255,255,255,0.3)',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 999,
    },
    reviewCardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: 'rgba(26,26,26,0.08)',
    },
  });
};
