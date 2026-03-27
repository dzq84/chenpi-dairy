import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Image,
  Platform,
} from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import dayjs from 'dayjs';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '@/hooks/useTheme';
import { useSafeRouter } from '@/hooks/useSafeRouter';
import { Screen } from '@/components/Screen';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { createStyles } from './styles';
import { Spacing } from '@/constants/theme';

// 数据类型定义（匹配后端返回的格式）
type Entry = {
  id: string;
  text: string;
  mood?: 'happy' | 'calm' | 'sad';
  images: string[];
  audio_uri: string | null;
  created_at: string;
};

export default function DailyEntriesScreen() {
  const { theme, isDark } = useTheme();
  const router = useSafeRouter();
  const styles = createStyles(theme);

  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEntry, setEditingEntry] = useState<any>(null);
  const [editText, setEditText] = useState('');
  const [editImages, setEditImages] = useState<string[]>([]);
  const [editAudioUri, setEditAudioUri] = useState<string | null>(null);

  // 权限状态
  const [libraryPermission, setLibraryPermission] = useState<'granted' | 'denied' | null>(null);

  // 获取今日日记列表
  const fetchEntries = async () => {
    try {
      setLoading(true);
      /**
       * 服务端文件：server/src/routes/journals.ts
       * 接口：GET /api/v1/journals/today
       */
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_BASE_URL}/api/v1/journals/today`);
      const { data } = await response.json();
      setEntries(data || []);
    } catch (err: any) {
      console.error('获取日记列表失败:', err);
      Toast.show({
        type: 'error',
        text1: '错误',
        text2: '获取日记列表失败',
      });
    } finally {
      setLoading(false);
    }
  };

  // 页面加载时获取数据
  useEffect(() => {
    fetchEntries();
  }, []);

  // 打开编辑弹窗
  const handleEdit = (entry: any) => {
    setEditingEntry(entry);
    setEditText(entry.text);
    setEditImages(entry.images || []);
    setEditAudioUri(entry.audio_uri || null);
    setModalVisible(true);
  };

  // 删除图片
  const handleRemoveImage = (index: number) => {
    setEditImages(editImages.filter((_, i) => i !== index));
  };

  // 删除音频
  const handleRemoveAudio = () => {
    setEditAudioUri(null);
  };

  // 获取心情图标
  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy':
        return 'face-laugh-beam';
      case 'calm':
        return 'face-smile';
      case 'sad':
        return 'face-sad-tear';
      default:
        return 'face-smile';
    }
  };

  // 获取心情颜色
  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'happy':
        return '#FFD93D';
      case 'calm':
        return '#4ECDC4';
      case 'sad':
        return '#95A5A6';
      default:
        return '#4ECDC4';
    }
  };

  // 添加图片
  const handleAddImage = async () => {
    if (libraryPermission !== 'granted') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({
          type: 'error',
          text1: '需要权限',
          text2: '请授予相册权限',
        });
        return;
      }
      setLibraryPermission('granted');
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setEditImages([...editImages, result.assets[0].uri]);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '错误',
        text2: '选择照片失败',
      });
    }
  };

  // 保存修改
  const handleSave = async () => {
    if (!editText.trim() && editImages.length === 0 && !editAudioUri) {
      Toast.show({
        type: 'error',
        text1: '提示',
        text2: '内容不能为空',
      });
      return;
    }

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BACKEND_BASE_URL}/api/v1/journals/${editingEntry.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: editText.trim(),
            images: editImages,
            audio_uri: editAudioUri,
          }),
        }
      );

      if (!response.ok) throw new Error('保存失败');

      // 更新本地状态
      const { data } = await response.json();
      setEntries(
        entries.map((entry) =>
          entry.id === editingEntry.id ? data : entry
        )
      );

      setModalVisible(false);
      setEditingEntry(null);
      setEditText('');
      setEditImages([]);
      setEditAudioUri(null);

      Toast.show({
        type: 'success',
        text1: '✨ 修改成功',
        text2: '已保存您的修改',
        position: 'bottom',
        visibilityTime: 2000,
      });
    } catch (error) {
      console.error('保存失败:', error);
      Toast.show({
        type: 'error',
        text1: '保存失败',
        text2: '请重试',
      });
    }
  };

  // 删除记录
  const handleDelete = (entryId: string) => {
    Alert.alert(
      '确认删除',
      '确定要删除这条记录吗？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '删除',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(
                `${process.env.EXPO_PUBLIC_BACKEND_BASE_URL}/api/v1/journals/${entryId}`,
                { method: 'DELETE' }
              );
              if (!response.ok && response.status !== 204) throw new Error('删除失败');

              setEntries(entries.filter((entry) => entry.id !== entryId));
              Toast.show({
                type: 'success',
                text1: '已删除',
                text2: '记录已删除',
                position: 'bottom',
                visibilityTime: 2000,
              });
            } catch (error) {
              console.error('删除失败:', error);
              Toast.show({
                type: 'error',
                text1: '删除失败',
                text2: '请重试',
              });
            }
          },
        },
      ]
    );
  };

  // 格式化时间
  const formatTime = (timestamp: string) => {
    return dayjs(timestamp).format('HH:mm');
  };

  // 按时间排序（最新的在前）
  const sortedEntries = [...entries].sort(
    (a, b) =>
      dayjs(b.created_at).valueOf() - dayjs(a.created_at).valueOf()
  );

  return (
    <Screen
      backgroundColor={theme.backgroundRoot}
      statusBarStyle="dark"
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 头部 */}
        <ThemedView level="root" style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <FontAwesome6 name="arrow-left" size={20} color={theme.textPrimary} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <ThemedText variant="h1" color={theme.textPrimary} style={styles.title}>
              本日已写
            </ThemedText>
            <ThemedText variant="body" color={theme.textMuted} style={styles.subtitle}>
              {dayjs().format('YYYY年M月D日 dddd')}
            </ThemedText>
          </View>
        </ThemedView>

        {/* 统计信息 */}
        <ThemedView level="root" style={styles.statsSection}>
          <View style={styles.statCard}>
            <FontAwesome6 name="pencil" size={20} color={theme.primary} />
            <View style={styles.statInfo}>
              <ThemedText variant="h2" color={theme.textPrimary} style={styles.statNumber}>
                {entries.length}
              </ThemedText>
              <ThemedText variant="caption" color={theme.textMuted} style={styles.statLabel}>
                条记录
              </ThemedText>
            </View>
          </View>
        </ThemedView>

        {/* 记录列表 */}
        {sortedEntries.length === 0 ? (
          <View style={styles.emptyContainer}>
            <FontAwesome6 name="feather" size={48} color={theme.textMuted} opacity={0.5} />
            <ThemedText variant="body" color={theme.textMuted} style={styles.emptyText}>
              今天还没有记录哦
            </ThemedText>
            <ThemedText variant="caption" color={theme.textMuted} style={styles.emptyHint}>
              去写点什么吧～
            </ThemedText>
          </View>
        ) : (
          sortedEntries.map((entry) => (
            <ThemedView
              key={entry.id}
              level="root"
              style={styles.entryCard}
            >
              <View style={styles.entryHeader}>
                <View style={styles.entryMeta}>
                  <View style={styles.entryTimeContainer}>
                    <FontAwesome6
                      name="clock"
                      size={12}
                      color={theme.textMuted}
                    />
                    <ThemedText
                      variant="caption"
                      color={theme.textMuted}
                      style={styles.entryTime}
                    >
                      {formatTime(entry.created_at)}
                    </ThemedText>
                  </View>
                  
                  {/* 心情显示 */}
                  {entry.mood && (
                    <View style={[styles.moodBadge, { borderColor: getMoodColor(entry.mood) }]}>
                      <FontAwesome6
                        name={getMoodIcon(entry.mood)}
                        size={12}
                        color={getMoodColor(entry.mood)}
                      />
                    </View>
                  )}
                </View>
                <View style={styles.entryActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleEdit(entry)}
                  >
                    <FontAwesome6
                      name="pen-to-square"
                      size={16}
                      color={theme.textMuted}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDelete(entry.id)}
                  >
                    <FontAwesome6
                      name="trash"
                      size={16}
                      color={theme.textMuted}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <ThemedText
                variant="body"
                color={theme.textPrimary}
                style={styles.entryText}
              >
                {entry.text}
              </ThemedText>

              {/* 图片展示 */}
              {entry.images && entry.images.length > 0 && (
                <View style={styles.entryImages}>
                  {entry.images.map((uri: string, index: number) => (
                    <Image key={index} source={{ uri }} style={styles.entryImageThumbnail} />
                  ))}
                </View>
              )}

              {/* 音频展示 */}
              {entry.audio_uri && (
                <View style={styles.entryAudio}>
                  <FontAwesome6 name="microphone" size={16} color={theme.primary} />
                  <ThemedText variant="caption" color={theme.textSecondary} style={styles.entryAudioText}>
                    语音记录
                  </ThemedText>
                </View>
              )}
            </ThemedView>
          ))
        )}
      </ScrollView>

      {/* 编辑弹窗 */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <ThemedText
                variant="title"
                color={theme.textPrimary}
                style={styles.modalTitle}
              >
                编辑记录
              </ThemedText>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <FontAwesome6 name="xmark" size={20} color={theme.textMuted} />
              </TouchableOpacity>
            </View>

            {/* Body */}
            <ScrollView style={styles.modalBody}>
              <TextInput
                style={styles.editInput}
                placeholder="编辑你的想法..."
                placeholderTextColor={theme.textMuted}
                multiline
                value={editText}
                onChangeText={setEditText}
                maxLength={2000}
                autoFocus
              />
              <ThemedText
                variant="caption"
                color={theme.textMuted}
                style={styles.charCount}
              >
                {editText.length} / 2000
              </ThemedText>

              {/* 图片编辑 */}
              <View style={styles.mediaSection}>
                <View style={styles.mediaHeader}>
                  <ThemedText variant="body" color={theme.textPrimary} style={styles.mediaTitle}>
                    图片
                  </ThemedText>
                  <TouchableOpacity style={styles.addMediaButton} onPress={handleAddImage}>
                    <FontAwesome6 name="plus" size={14} color={theme.primary} />
                    <ThemedText variant="small" color={theme.primary} style={styles.addMediaText}>
                      添加
                    </ThemedText>
                  </TouchableOpacity>
                </View>
                {editImages.length > 0 && (
                  <View style={styles.imagesGrid}>
                    {editImages.map((uri, index) => (
                      <View key={index} style={styles.imageItem}>
                        <Image source={{ uri }} style={styles.imageThumbnail} />
                        <TouchableOpacity
                          style={styles.imageRemoveButton}
                          onPress={() => handleRemoveImage(index)}
                        >
                          <FontAwesome6 name="xmark" size={14} color="#FFFFFF" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
              </View>

              {/* 音频编辑 */}
              {editAudioUri && (
                <View style={styles.mediaSection}>
                  <View style={styles.mediaHeader}>
                    <ThemedText variant="body" color={theme.textPrimary} style={styles.mediaTitle}>
                      语音
                    </ThemedText>
                    <TouchableOpacity onPress={handleRemoveAudio}>
                      <ThemedText variant="small" color={theme.error} style={styles.removeText}>
                        删除
                      </ThemedText>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.audioItem}>
                    <View style={styles.audioIcon}>
                      <FontAwesome6 name="microphone" size={20} color={theme.primary} />
                    </View>
                    <ThemedText variant="body" color={theme.textPrimary}>
                      已录音
                    </ThemedText>
                  </View>
                </View>
              )}
            </ScrollView>

            {/* Footer */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <ThemedText variant="smallMedium" color={theme.textMuted}>
                  取消
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSave}
              >
                <ThemedText variant="smallMedium" color={theme.backgroundRoot}>
                  保存
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}
