import { StyleSheet, Platform } from 'react-native';
import { Spacing, BorderRadius, Theme } from '@/constants/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.lg,
      paddingTop: Spacing['2xl'],
      paddingBottom: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderLight,
    },
    backButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitle: {
      flex: 1,
      textAlign: 'center',
    },
    actionButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      paddingHorizontal: Spacing.lg,
      paddingTop: Spacing.xl,
      paddingBottom: Spacing['5xl'],
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: Spacing.md,
    },
    emptyIcon: {
      opacity: 0.5,
    },
    typeBadge: {
      alignSelf: 'flex-start',
      backgroundColor: theme.primary,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      borderRadius: BorderRadius.sm,
      marginBottom: Spacing.md,
    },
    title: {
      marginBottom: Spacing.sm,
    },
    dateInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
      marginBottom: Spacing.md,
    },
    imagesSection: {
      marginBottom: Spacing.lg,
    },
    reviewImage: {
      width: 280,
      height: 200,
      borderRadius: BorderRadius.lg,
      marginRight: Spacing.md,
      borderWidth: 1,
      borderColor: theme.borderLight,
    },
    section: {
      padding: Spacing.lg,
      borderRadius: BorderRadius.lg,
      marginBottom: Spacing.lg,
    },
    sectionTitle: {
      marginBottom: Spacing.md,
    },
    keywordsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.sm,
    },
    keyword: {
      backgroundColor: theme.backgroundTertiary,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      borderRadius: BorderRadius.md,
    },
    modulesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: Spacing.sm,
    },
    module: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
      backgroundColor: theme.backgroundTertiary,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      borderRadius: BorderRadius.md,
    },
    moduleText: {
      fontSize: 14,
    },
    content: {
      lineHeight: 24,
      letterSpacing: 0.5,
    },
    summary: {
      lineHeight: 22,
      fontStyle: 'italic',
    },
    footer: {
      alignItems: 'center',
      paddingTop: Spacing.md,
      paddingBottom: Spacing.lg,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: Spacing.lg,
      borderRadius: BorderRadius.lg,
    },
    actionButtonText: {
      marginLeft: Spacing.xs,
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
