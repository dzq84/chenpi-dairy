import { StyleSheet } from 'react-native';
import { Spacing, BorderRadius, Theme } from '@/constants/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: Spacing['2xl'],
      paddingTop: Spacing['5xl'],
      paddingBottom: Spacing['5xl'],
    },
    backButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: Spacing.lg,
      alignSelf: 'flex-start',
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: Spacing.xl,
    },
    logo: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: 'rgba(123,110,246,0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.primary,
    },
    title: {
      textAlign: 'center',
      marginBottom: Spacing.sm,
    },
    subtitle: {
      textAlign: 'center',
      marginBottom: Spacing.xl,
    },
    form: {
      backgroundColor: 'rgba(255,255,255,0.06)',
      borderRadius: BorderRadius['2xl'],
      borderWidth: 1,
      borderColor: theme.borderLight,
      padding: Spacing.xl,
      marginBottom: Spacing.xl,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.backgroundTertiary,
      borderRadius: BorderRadius.lg,
      paddingHorizontal: Spacing.lg,
      marginBottom: Spacing.md,
    },
    inputIcon: {
      marginRight: Spacing.md,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: theme.textPrimary,
      paddingVertical: Spacing.md,
    },
    eyeIcon: {
      padding: Spacing.sm,
    },
    submitButton: {
      backgroundColor: theme.primary,
      borderRadius: BorderRadius.lg,
      paddingVertical: Spacing.lg,
      alignItems: 'center',
      marginTop: Spacing.md,
      marginBottom: Spacing.md,
    },
    submitButtonDisabled: {
      opacity: 0.6,
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: Spacing.xs,
    },
    switchText: {
      fontWeight: '600',
    },
    footerText: {
      textAlign: 'center',
    },
  });
};
