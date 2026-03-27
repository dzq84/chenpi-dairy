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
      top: 0, left: 0, right: 0, bottom: 0,
      width: '100%',
      height: '100%',
    },
    backgroundOverlay: {
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      opacity: 0.75,
    },
    sceneHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.xl,
      paddingBottom: Spacing.sm,
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
    sceneInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
    },
    sceneIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: 'rgba(255, 158, 125, 0.25)',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'rgba(255, 158, 125, 0.4)',
    },
    sceneName: {
      fontSize: 18,
      fontWeight: '500',
      marginBottom: 2,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    iconButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255,255,255,0.12)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    messagesContainer: {
      flex: 1,
      paddingHorizontal: Spacing.md,
    },
    messagesList: {
      flex: 1,
    },
    messagesContent: {
      paddingVertical: Spacing.sm,
      gap: Spacing.sm,
    },
    userMessage: {
      alignItems: 'flex-end',
    },
    assistantMessage: {
      alignItems: 'flex-start',
    },
    messageBubble: {
      maxWidth: '80%',
      borderRadius: BorderRadius.md,
      padding: Spacing.sm,
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 8,
    },
    userBubble: {
      backgroundColor: theme.primary,
      borderBottomRightRadius: 4,
    },
    assistantBubble: {
      backgroundColor: 'rgba(0,0,0,0.45)',
      borderBottomLeftRadius: 4,
    },
    messageAvatar: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: 'rgba(255, 158, 125, 0.3)',
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
      backgroundColor: 'rgba(0,0,0,0.4)',
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.sm,
      paddingBottom: Platform.OS === 'ios' ? Spacing.md : Spacing.sm,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: 12,
      backgroundColor: 'rgba(255,255,255,0.12)',
      borderRadius: 999,
      paddingHorizontal: Spacing.sm,
      paddingVertical: 6,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.15)',
    },
    input: {
      flex: 1,
      color: '#FFFFFF',
      fontSize: 15,
      lineHeight: 22,
      maxHeight: 100,
      paddingVertical: 8,
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
      opacity: 0.4,
    },
  });
};
