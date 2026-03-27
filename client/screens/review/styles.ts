import { StyleSheet, Platform } from 'react-native';
import { Spacing, BorderRadius, Theme } from '@/constants/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    header: {
      paddingHorizontal: Spacing['2xl'],
      paddingTop: Spacing['5xl'],
      paddingBottom: Spacing.lg,
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      color: theme.textPrimary,
      marginBottom: Spacing.sm,
      letterSpacing: -0.5,
    },
    subtitle: {
      fontSize: 15,
      color: theme.textMuted,
      lineHeight: 22,
    },
    typeSelector: {
      flexDirection: 'row',
      paddingHorizontal: Spacing['2xl'],
      paddingVertical: Spacing.lg,
      backgroundColor: 'rgba(255,255,255,0.02)',
      gap: Spacing.sm,
    },
    typeButton: {
      flex: 1,
      paddingVertical: Spacing.sm,
      borderRadius: BorderRadius['2xl'],
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.borderLight,
      backgroundColor: 'rgba(255,255,255,0.02)',
    },
    typeButtonActive: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    typeButtonText: {
      fontSize: 14,
      fontWeight: '500',
    },
    listContainer: {
      flex: 1,
    },
    listContent: {
      paddingHorizontal: Spacing['2xl'],
      paddingVertical: Spacing.lg,
      gap: Spacing.lg,
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: Spacing['5xl'],
    },
    emptyIcon: {
      marginBottom: Spacing.lg,
      opacity: 0.5,
    },
    emptyText: {
      fontSize: 16,
      marginBottom: Spacing.xs,
    },
    emptySubtext: {
      fontSize: 13,
    },
    reviewCard: {
      backgroundColor: 'rgba(255,255,255,0.06)',
      borderRadius: BorderRadius['2xl'],
      borderWidth: 1,
      borderColor: theme.borderLight,
      padding: Spacing.lg,
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 2,
    },
    reviewThumbnail: {
      width: '100%',
      height: 160,
      borderRadius: BorderRadius.md,
      marginBottom: Spacing.md,
      borderWidth: 1,
      borderColor: theme.borderLight,
    },
    reviewHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.md,
    },
    reviewDate: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
    },
    reviewType: {
      backgroundColor: 'rgba(123,110,246,0.1)',
      paddingHorizontal: Spacing.sm,
      paddingVertical: 4,
      borderRadius: 8,
    },
    reviewTypeText: {
      fontSize: 12,
      fontWeight: '600',
    },
    reviewTitle: {
      fontSize: 17,
      fontWeight: '600',
      marginBottom: Spacing.sm,
    },
    reviewSummary: {
      fontSize: 14,
      lineHeight: 22,
      marginBottom: Spacing.md,
    },
    keywordsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.xs,
      marginBottom: Spacing.sm,
    },
    keyword: {
      backgroundColor: 'rgba(251, 191, 36, 0.15)',
      paddingHorizontal: Spacing.sm,
      paddingVertical: 4,
      borderRadius: 12,
    },
    modulesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.sm,
      marginBottom: Spacing.sm,
    },
    module: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: 'rgba(123,110,246,0.1)',
      paddingHorizontal: Spacing.sm,
      paddingVertical: 4,
      borderRadius: 12,
    },
    moduleText: {
      fontSize: 12,
    },
    reviewFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: Spacing.md,
      paddingTop: Spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.borderLight,
    },
    reviewActions: {
      flexDirection: 'row',
      gap: Spacing.md,
    },
    actionButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: 'rgba(255,255,255,0.05)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    // 编辑模态框样式
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end',
    },
    keyboardContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    modalContainer: {
      paddingHorizontal: Spacing['2xl'],
      paddingBottom: Platform.OS === 'ios' ? 34 : Spacing['2xl'],
    },
    modalContent: {
      backgroundColor: theme.backgroundDefault,
      borderRadius: BorderRadius['2xl'],
      overflow: 'hidden',
      maxHeight: '90%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: Spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderLight,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
    },
    modalBody: {
      padding: Spacing.lg,
      maxHeight: '70%',
    },
    inputContainer: {
      marginBottom: Spacing.lg,
    },
    inputLabel: {
      marginBottom: Spacing.sm,
    },
    input: {
      backgroundColor: theme.backgroundTertiary,
      borderRadius: BorderRadius.lg,
      padding: Spacing.md,
      fontSize: 16,
      color: theme.textPrimary,
      minHeight: 48,
    },
    textArea: {
      minHeight: 100,
      textAlignVertical: 'top',
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.md,
    },
    addImageButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
      backgroundColor: 'rgba(78, 205, 196, 0.1)',
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.md,
    },
    addImageText: {
      fontSize: 12,
      fontWeight: '500',
    },
    imagePreviewContainer: {
      flexDirection: 'row',
      gap: Spacing.sm,
    },
    imagePreviewItem: {
      position: 'relative',
    },
    imagePreview: {
      width: 80,
      height: 80,
      borderRadius: BorderRadius.lg,
      borderWidth: 1,
      borderColor: theme.borderLight,
    },
    removeImageButton: {
      position: 'absolute',
      top: -6,
      right: -6,
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyImages: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Spacing['3xl'],
      borderWidth: 2,
      borderColor: theme.borderLight,
      borderRadius: BorderRadius.lg,
      borderStyle: 'dashed',
    },
    emptyImagesText: {
      marginTop: Spacing.sm,
    },
    modalFooter: {
      flexDirection: 'row',
      gap: Spacing.md,
      padding: Spacing.lg,
      borderTopWidth: 1,
      borderTopColor: theme.borderLight,
    },
    modalButton: {
      flex: 1,
      paddingVertical: Spacing.lg,
      borderRadius: BorderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancelButton: {
      backgroundColor: theme.backgroundTertiary,
    },
    submitButton: {
      backgroundColor: theme.primary,
    },
  });
};
