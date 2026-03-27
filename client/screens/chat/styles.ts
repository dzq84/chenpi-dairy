import { StyleSheet, Platform } from 'react-native';
import { Spacing, BorderRadius, Theme } from '@/constants/theme';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    sceneBackground: {
      flex: 1,
      position: 'relative',
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
    },
    backgroundOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.85,
    },
    sceneHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: Spacing['2xl'],
      paddingTop: Spacing['5xl'],
      paddingBottom: Spacing.lg,
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    sceneInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
    },
    sceneIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: 'rgba(123,110,246,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'rgba(123,110,246,0.3)',
    },
    sceneName: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 2,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
    },
    iconButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255,255,255,0.1)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    messagesContainer: {
      flex: 1,
      paddingHorizontal: Spacing.xl,
    },
    messagesList: {
      flex: 1,
    },
    messagesContent: {
      paddingVertical: Spacing.lg,
      gap: Spacing.lg,
    },
    userMessage: {
      alignItems: 'flex-end',
    },
    assistantMessage: {
      alignItems: 'flex-start',
    },
    messageBubble: {
      maxWidth: '80%',
      borderRadius: BorderRadius['2xl'],
      padding: Spacing.lg,
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: Spacing.sm,
    },
    userBubble: {
      backgroundColor: theme.primary,
      borderBottomRightRadius: BorderRadius.sm,
    },
    assistantBubble: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderBottomLeftRadius: BorderRadius.sm,
    },
    messageAvatar: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: 'rgba(123,110,246,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 2,
    },
    messageText: {
      fontSize: 15,
      lineHeight: 22,
      flex: 1,
    },
    inputContainer: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.lg,
      paddingBottom: Platform.OS === 'ios' ? Spacing.xl : Spacing.lg,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: Spacing.md,
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderRadius: BorderRadius['2xl'],
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.sm,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.15)',
    },
    input: {
      flex: 1,
      color: '#FFFFFF',
      fontSize: 15,
      lineHeight: 22,
      maxHeight: 100,
      paddingVertical: Spacing.sm,
    },
    sendButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 2,
    },
    sendButtonDisabled: {
      opacity: 0.5,
    },
  });
};
