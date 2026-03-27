import { StyleSheet } from 'react-native';
import { Spacing, BorderRadius, Theme } from '@/constants/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
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
    saveButton: {
      paddingHorizontal: Spacing.md,
    },
    saveButtonText: {
      fontWeight: '600',
    },
    content: {
      flex: 1,
    },
    scrollContent: {
      padding: Spacing.lg,
      paddingBottom: Spacing['5xl'],
    },
    avatarSection: {
      alignItems: 'center',
      marginBottom: Spacing.xl,
    },
    avatarContainer: {
      position: 'relative',
      marginBottom: Spacing.md,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 3,
      borderColor: theme.primary,
    },
    avatarPlaceholder: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.backgroundTertiary,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.borderLight,
    },
    avatarEditBadge: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: theme.backgroundRoot,
    },
    avatarHint: {
      fontSize: 13,
    },
    form: {
      borderRadius: BorderRadius['2xl'],
      borderWidth: 1,
      borderColor: theme.borderLight,
      padding: Spacing.lg,
      marginBottom: Spacing.md,
    },
    formTitle: {
      marginBottom: Spacing.lg,
    },
    formItem: {
      marginBottom: Spacing.lg,
    },
    label: {
      marginBottom: Spacing.sm,
    },
    input: {
      backgroundColor: theme.backgroundTertiary,
      borderRadius: BorderRadius.md,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.md,
      fontSize: 16,
      color: theme.textPrimary,
    },
    textArea: {
      minHeight: 100,
      textAlignVertical: 'top',
    },
    inputCounter: {
      textAlign: 'right',
      marginTop: Spacing.xs,
      fontSize: 12,
    },
    hint: {
      textAlign: 'center',
      marginTop: Spacing.md,
    },
  });
};
