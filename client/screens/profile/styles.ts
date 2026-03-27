import { StyleSheet } from 'react-native';
import { Spacing, BorderRadius, Theme } from '@/constants/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      padding: Spacing.lg,
      paddingBottom: Spacing['5xl'],
    },
    userCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: Spacing.lg,
      borderRadius: BorderRadius['2xl'],
      borderWidth: 1,
      borderColor: theme.borderLight,
      marginBottom: Spacing.lg,
    },
    avatarContainer: {
      position: 'relative',
      marginRight: Spacing.lg,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 3,
      borderColor: theme.primary,
    },
    editBadge: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.backgroundRoot,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      marginBottom: Spacing.xs,
    },
    userBio: {
      fontSize: 14,
    },
    loginPrompt: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    avatarPlaceholder: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.backgroundTertiary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.lg,
    },
    loginInfo: {
      flex: 1,
    },
    loginText: {
      marginBottom: Spacing.xs,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: 'rgba(123,110,246,0.1)',
      borderRadius: BorderRadius['2xl'],
      padding: Spacing.lg,
      marginBottom: Spacing.xl,
      borderWidth: 1,
      borderColor: theme.borderLight,
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statNumber: {
      fontSize: 28,
      fontWeight: '700',
      marginBottom: Spacing.xs,
    },
    statLabel: {
      fontSize: 13,
    },
    statDivider: {
      width: 1,
      backgroundColor: theme.borderLight,
      marginHorizontal: Spacing.lg,
    },
    section: {
      borderRadius: BorderRadius['2xl'],
      borderWidth: 1,
      borderColor: theme.borderLight,
      padding: Spacing.sm,
      marginBottom: Spacing.lg,
    },
    sectionTitle: {
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.md,
      marginBottom: Spacing.sm,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderLight,
    },
    menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    menuIcon: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: 'rgba(123,110,246,0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    logoutButton: {
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderRadius: BorderRadius['2xl'],
      paddingVertical: Spacing.lg,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'rgba(239, 68, 68, 0.3)',
      marginBottom: Spacing.md,
    },
    logoutText: {
      fontWeight: '600',
    },
    versionText: {
      textAlign: 'center',
    },
  });
};
