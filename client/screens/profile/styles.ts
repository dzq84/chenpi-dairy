import { StyleSheet } from 'react-native';
import { Spacing, BorderRadius, Theme } from '@/constants/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      padding: Spacing.sm,
      paddingBottom: 32,
    },
    userCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: Spacing.sm,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: theme.border,
      marginBottom: Spacing.sm,
      backgroundColor: '#FFFFFF',
    },
    avatarContainer: {
      position: 'relative',
      marginRight: Spacing.sm,
    },
    avatar: {
      width: 72,
      height: 72,
      borderRadius: 999,
      borderWidth: 2,
      borderColor: theme.primary,
    },
    editBadge: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: theme.cardDark,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.backgroundRoot,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      marginBottom: 4,
      fontSize: 20,
      fontWeight: '500',
    },
    userBio: {
      fontSize: 14,
      color: theme.textSecondary,
    },
    loginPrompt: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    avatarPlaceholder: {
      width: 72,
      height: 72,
      borderRadius: 999,
      backgroundColor: theme.backgroundTertiary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.sm,
    },
    loginInfo: {
      flex: 1,
    },
    loginText: {
      marginBottom: 4,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: 'rgba(255, 158, 125, 0.1)',
      borderRadius: BorderRadius.md,
      padding: Spacing.sm,
      marginBottom: Spacing.md,
      borderWidth: 1,
      borderColor: theme.border,
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statNumber: {
      fontSize: 28,
      fontWeight: '400',
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      opacity: 0.6,
    },
    statDivider: {
      width: 1,
      backgroundColor: theme.border,
      marginHorizontal: Spacing.sm,
    },
    section: {
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: theme.border,
      padding: Spacing.xs,
      marginBottom: Spacing.sm,
      backgroundColor: '#FFFFFF',
    },
    sectionTitle: {
      paddingHorizontal: Spacing.sm,
      paddingTop: Spacing.sm,
      marginBottom: 8,
      fontSize: 12,
      fontWeight: '600',
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      opacity: 0.6,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.sm,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
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
      backgroundColor: 'rgba(255, 158, 125, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.sm,
    },
    logoutButton: {
      backgroundColor: 'rgba(231, 111, 81, 0.08)',
      borderRadius: 999,
      paddingVertical: 14,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'rgba(231, 111, 81, 0.2)',
      marginBottom: Spacing.sm,
    },
    logoutText: {
      fontWeight: '600',
    },
    versionText: {
      textAlign: 'center',
      opacity: 0.4,
    },
  });
};
