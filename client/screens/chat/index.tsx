import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import { useSafeRouter } from '@/hooks/useSafeRouter';
import { useTheme } from '@/hooks/useTheme';
import { Screen } from '@/components/Screen';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FontAwesome6 } from '@expo/vector-icons';
import { createStyles } from './styles';
import RNSSE from 'react-native-sse';

// 场景定义
const SCENES = [
  {
    id: 'campfire',
    name: '篝火营地',
    icon: 'fire',
    gradient: ['#1a1a2e', '#16213e'],
    backgroundImage: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=1920&q=80', // 暖橙色篝火场景
    description: '温暖的火光',
  },
  {
    id: 'starry',
    name: '星空天台',
    icon: 'moon',
    gradient: ['#0f0c29', '#302b63'],
    backgroundImage: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80', // 深蓝色星空场景
    description: '宁静的夜空',
  },
  {
    id: 'library',
    name: '深夜书房',
    icon: 'book-open',
    gradient: ['#1e1e2e', '#2d2d44'],
    backgroundImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&q=80', // 米白色书房场景
    description: '静谧的时光',
  },
  {
    id: 'forest',
    name: '森林溪边',
    icon: 'tree',
    gradient: ['#134e5e', '#71b280'],
    backgroundImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80', // 暗绿色森林溪流场景
    description: '清新的自然',
  },
];

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export default function ChatScreen() {
  const { theme, isDark } = useTheme();
  const router = useSafeRouter();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const flatListRef = useRef<FlatList>(null);
  const [currentScene, setCurrentScene] = useState(SCENES[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好呀，我是你的心事陪聊伙伴。今天有什么想和我分享的吗？无论是开心的事，还是烦恼的事，我都在这里倾听。',
      timestamp: Date.now(),
    },
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // 随机选择场景
  useEffect(() => {
    const randomScene = SCENES[Math.floor(Math.random() * SCENES.length)];
    setCurrentScene(randomScene);
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputText || !inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // 调用后端 LLM API
      /**
       * 服务端文件：server/src/routes/chat.ts
       * 接口：POST /api/v1/chat
       * Body 参数：messages: Array<{role: string, content: string}>
       */
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_BASE_URL}/api/v1/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error('发送消息失败');
      }

      // 处理流式响应
      const sse = new RNSSE(
        `${process.env.EXPO_PUBLIC_BACKEND_BASE_URL}/api/v1/chat/stream`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: messages.map((m) => ({ role: m.role, content: m.content })),
          }),
        }
      );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      sse.addEventListener('message', (event) => {
        if (event.data === '[DONE]') {
          sse.close();
          setIsTyping(false);
          return;
        }

        try {
          const content = event.data || '';
          const data = JSON.parse(content) as { content: string };
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id
                ? { ...msg, content: msg.content + (data.content || '') }
                : msg
            )
          );
        } catch (e) {
          console.error('解析消息失败:', e);
        }
      });

      sse.addEventListener('error', (error) => {
        console.error('SSE 错误:', error);
        setIsTyping(false);
      });
    } catch (error) {
      console.error('发送消息失败:', error);
      setIsTyping(false);
      // 添加错误消息
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '抱歉，我现在无法回复。请稍后再试。',
          timestamp: Date.now(),
        },
      ]);
    }
  };

  return (
    <Screen
      backgroundColor={(currentScene.gradient && currentScene.gradient[0]) || '#0D1026'}
      statusBarStyle="dark"
    >
      {/* 场景背景 */}
      <View style={[styles.sceneBackground, { backgroundColor: (currentScene.gradient && currentScene.gradient[0]) || '#0D1026' }]}>
        {/* 背景图片 */}
        {currentScene.backgroundImage && (
          <Image
            source={{ uri: currentScene.backgroundImage }}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
        )}
        {/* 渐变遮罩层 */}
        <View style={[styles.backgroundOverlay, {
          backgroundColor: (currentScene.gradient && currentScene.gradient[0]) || '#0D1026',
        }]} />
        {/* 顶部场景信息 */}
        <View style={styles.sceneHeader}>
          <View style={styles.sceneInfo}>
            <View style={styles.sceneIcon}>
              <FontAwesome6
                name={currentScene.icon as any}
                size={24}
                color={theme.primary}
              />
            </View>
            <View>
              <ThemedText variant="title" color="#FFFFFF" style={styles.sceneName}>
                {currentScene.name}
              </ThemedText>
              <ThemedText variant="caption" color="rgba(255,255,255,0.6)">
                {currentScene.description}
              </ThemedText>
            </View>
          </View>
          <View style={styles.headerActions}>
            {/* 场景切换 */}
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                const currentIndex = SCENES.findIndex((s) => s.id === currentScene.id);
                const nextScene = SCENES[(currentIndex + 1) % SCENES.length];
                setCurrentScene(nextScene);
              }}
            >
              <FontAwesome6 name="shuffle" size={20} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
            {/* 音效开关 */}
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setSoundEnabled(!soundEnabled)}
            >
              <FontAwesome6
                name={soundEnabled ? 'volume-high' : 'volume-xmark'}
                size={20}
                color={soundEnabled ? theme.primary : 'rgba(255,255,255,0.7)'}
              />
            </TouchableOpacity>
            {/* 返回按钮 */}
            <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
              <FontAwesome6 name="xmark" size={24} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 消息列表 */}
        <View style={styles.messagesContainer}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            style={styles.messagesList}
            contentContainerStyle={styles.messagesContent}
            renderItem={({ item }) => (
              <View style={item.role === 'user' ? styles.userMessage : styles.assistantMessage}>
                <View
                  style={[
                    styles.messageBubble,
                    item.role === 'user' ? styles.userBubble : styles.assistantBubble,
                  ]}
                >
                  {item.role === 'assistant' && (
                    <View style={styles.messageAvatar}>
                      <FontAwesome6 name="heart" size={14} color={theme.primary} />
                    </View>
                  )}
                  <ThemedText
                    variant="body"
                    color={item.role === 'user' ? '#FFFFFF' : '#FFFFFF'}
                    style={styles.messageText}
                  >
                    {item.content}
                  </ThemedText>
                </View>
              </View>
            )}
          />
        </View>

        {/* 输入区域 */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.inputContainer}
        >
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="说点什么吧..."
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={inputText}
              onChangeText={(text) => setInputText(text || '')}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[styles.sendButton, (!inputText || !inputText.trim()) && styles.sendButtonDisabled]}
              onPress={handleSend}
              disabled={!inputText || !inputText.trim() || isTyping}
            >
              {isTyping ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <FontAwesome6
                  name="paper-plane"
                  size={20}
                  color={(!inputText || !inputText.trim()) ? 'rgba(255,255,255,0.3)' : '#FFFFFF'}
                />
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Screen>
  );
}
