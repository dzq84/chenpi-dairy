import { StyleSheet } from 'react-native';
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
    headerSpacer: {
      width: 40,
    },
    content: {
      flex: 1,
    },
    scrollContent: {
      padding: Spacing.lg,
      paddingBottom: Spacing['5xl'],
    },
    updateInfo: {
      padding: Spacing.md,
      borderRadius: BorderRadius.lg,
      marginBottom: Spacing.lg,
      alignItems: 'center',
    },
    section: {
      padding: Spacing.lg,
      borderRadius: BorderRadius.lg,
      marginBottom: Spacing.lg,
    },
    sectionTitle: {
      marginBottom: Spacing.md,
      fontWeight: '600',
    },
    sectionContent: {
      lineHeight: 24,
      marginBottom: Spacing.md,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: Spacing.sm,
    },
    listItemText: {
      flex: 1,
      marginLeft: Spacing.sm,
      lineHeight: 22,
    },
    contactInfo: {
      marginTop: Spacing.md,
      fontWeight: '600',
    },
  });
};
