import { StyleSheet, Platform } from 'react-native';
import { Spacing, BorderRadius, Theme } from '@/constants/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    header: {
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.xl,
      paddingBottom: Spacing.sm,
    },
    title: {
      fontSize: 36,
      fontWeight: '400',
      color: theme.textPrimary,
      marginBottom: 4,
      letterSpacing: -0.5,
    },
    subtitle: {
      fontSize: 15,
      color: theme.textSecondary,
      lineHeight: 22,
    },
    typeSelector: {
      flexDirection: 'row',
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      gap: 10,
    },
    typeButton: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 999,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: 'transparent',
    },
    typeButtonActive: {
      backgroundColor: theme.cardDark,
      borderColor: theme.cardDark,
    },
    typeButtonText: {
      fontSize: 12,
      fontWeight: '600',
      letterSpacing: 0.3,
      textTransform: 'uppercase',
    },
    listContainer: {
      flex: 1,
    },
    listContent: {
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      paddingBottom: 120,
      gap: Spacing.sm,
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: Spacing.xl,
    },
    emptyIcon: {
      marginBottom: Spacing.sm,
      opacity: 0.3,
    },
    emptyText: {
      fontSize: 16,
      marginBottom: 4,
    },
    emptySubtext: {
      fontSize: 13,
    },
    reviewCard: {
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: theme.border,
      padding: Spacing.md,
      backgroundColor: '#FFFFFF',
    },
    reviewThumbnail: {
      width: '100%',
      height: 160,
      borderRadius: BorderRadius.sm,
      marginBottom: Spacing.sm,
    },
    reviewHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    reviewDate: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    reviewType: {
      backgroundColor: 'rgba(255, 158, 125, 0.15)',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 999,
    },
    reviewTypeText: {
      fontSize: 11,
      fontWeight: '600',
      letterSpacing: 0.3,
    },
    reviewTitle: {
      fontSize: 17,
      fontWeight: '500',
      marginBottom: 6,
    },
    reviewSummary: {
      fontSize: 14,
      lineHeight: 20,
      marginBottom: Spacing.sm,
    },
    keywordsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      marginBottom: 8,
    },
    keyword: {
      backgroundColor: 'rgba(197, 222, 167, 0.3)',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 999,
    },
    modulesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 8,
    },
    module: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: 'rgba(211, 222, 234, 0.4)',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 999,
    },
    moduleText: {
      fontSize: 12,
    },
    reviewFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: Spacing.sm,
      paddingTop: Spacing.sm,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    reviewActions: {
      flexDirection: 'row',
      gap: 8,
    },
    actionButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.backgroundTertiary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    // Modal
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'flex-end',
    },
    keyboardContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    modalContainer: {
      paddingHorizontal: Spacing.md,
      paddingBottom: Platform.OS === 'ios' ? 34 : Spacing.md,
    },
    modalContent: {
      backgroundColor: theme.backgroundRoot,
      borderRadius: BorderRadius.md,
      overflow: 'hidden',
      maxHeight: '90%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: Spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '500',
    },
    modalBody: {
      padding: Spacing.sm,
      maxHeight: '70%',
    },
    inputContainer: {
      marginBottom: Spacing.sm,
    },
    inputLabel: {
      marginBottom: 6,
      fontSize: 12,
      fontWeight: '600',
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      opacity: 0.6,
    },
    input: {
      backgroundColor: theme.backgroundTertiary,
      borderRadius: BorderRadius.sm,
      padding: Spacing.sm,
      fontSize: 15,
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
      marginBottom: Spacing.sm,
    },
    addImageButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: 'rgba(255, 158, 125, 0.1)',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
    },
    addImageText: {
      fontSize: 12,
      fontWeight: '500',
    },
    imagePreviewContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    imagePreviewItem: {
      position: 'relative',
    },
    imagePreview: {
      width: 80,
      height: 80,
      borderRadius: BorderRadius.sm,
      borderWidth: 1,
      borderColor: theme.border,
    },
    removeImageButton: {
      position: 'absolute',
      top: -6,
      right: -6,
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: 'rgba(26, 26, 26, 0.6)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyImages: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Spacing.lg,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: BorderRadius.sm,
      borderStyle: 'dashed',
    },
    emptyImagesText: {
      marginTop: 8,
    },
    modalFooter: {
      flexDirection: 'row',
      gap: Spacing.sm,
      padding: Spacing.sm,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    modalButton: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 999,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancelButton: {
      backgroundColor: theme.backgroundTertiary,
    },
    submitButton: {
      backgroundColor: theme.cardDark,
    },
  });
};
