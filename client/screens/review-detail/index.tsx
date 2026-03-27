import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useSafeRouter, useSafeSearchParams } from '@/hooks/useSafeRouter';
import { useTheme } from '@/hooks/useTheme';
import { Screen } from '@/components/Screen';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FontAwesome6 } from '@expo/vector-icons';
import { createStyles } from './styles';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import Toast from 'react-native-toast-message';

// 回顾类型
type ReviewType = 'daily' | 'weekly' | 'monthly';

// 回顾数据接口
interface Review {
  id: string;
  type: ReviewType;
  date: string;
  title: string;
  summary: string;
  content: string;
  keywords?: string[];
  modules?: string[];
  images?: string[];
  createdAt: string;
}

export default function ReviewDetailScreen() {
  const { theme, isDark } = useTheme();
  const router = useSafeRouter();
  const params = useSafeSearchParams<{ id: string; type: ReviewType }>();
  const styles = createStyles(theme);
  
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);

  // 编辑相关状态
  const [modalVisible, setModalVisible] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editSummary, setEditSummary] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editImages, setEditImages] = useState<string[]>([]);

  // 权限状态
  const [libraryPermission, setLibraryPermission] = useState<'granted' | 'denied' | null>(null);

  // 加载回顾详情
  useEffect(() => {
    loadReviewDetail();
  }, [params.id, params.type]);

  // 申请相册权限
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setLibraryPermission(status === 'granted' ? 'granted' : 'denied');
    })();
  }, []);

  const loadReviewDetail = async () => {
    if (!params.id) {
      router.back();
      return;
    }

    setLoading(true);
    try {
      /**
       * 服务端文件：server/src/routes/reviews.ts
       * 接口：GET /api/v1/reviews/:id
       */
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BACKEND_BASE_URL}/api/v1/reviews/${params.id}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setReview(data.review);
      }
    } catch (error) {
      console.error('加载回顾详情失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeLabel = (type: ReviewType) => {
    switch (type) {
      case 'daily':
        return '每日回顾';
      case 'weekly':
        return '每周回顾';
      case 'monthly':
        return '每月回顾';
    }
  };

  // 打开编辑弹窗
  const handleEdit = () => {
    if (!review) return;
    setEditTitle(review.title);
    setEditSummary(review.summary);
    setEditContent(review.content);
    setEditImages(review.images || []);
    setModalVisible(true);
  };

  // 添加图片
  const handleAddImage = async () => {
    if (libraryPermission !== 'granted') {
      Toast.show({
        type: 'error',
        text1: '需要相册权限',
        text2: '请在设置中开启相册权限',
        position: 'bottom',
        visibilityTime: 3000,
      });
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.8,
        allowsMultipleSelection: true,
      });

      if (!result.canceled && result.assets) {
        const newImages = result.assets.map(asset => asset.uri);
        setEditImages([...editImages, ...newImages]);
      }
    } catch (error) {
      console.error('选择图片失败:', error);
      Toast.show({
        type: 'error',
        text1: '选择图片失败',
        position: 'bottom',
        visibilityTime: 3000,
      });
    }
  };

  // 删除图片
  const handleRemoveImage = (index: number) => {
    setEditImages(editImages.filter((_, i) => i !== index));
  };

  // 保存编辑
  const handleSaveEdit = async () => {
    if (!review) return;

    if (!editTitle.trim()) {
      Toast.show({
        type: 'error',
        text1: '标题不能为空',
        position: 'bottom',
        visibilityTime: 3000,
      });
      return;
    }

    try {
      /**
       * 服务端文件：server/src/routes/reviews.ts
       * 接口：PUT /api/v1/reviews/:id
       * Body 参数：title: string, summary: string, content: string
       */
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BACKEND_BASE_URL}/api/v1/reviews/${review.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: editTitle,
            summary: editSummary,
            content: editContent,
            images: editImages,
          }),
        }
      );

      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: '编辑成功',
          position: 'bottom',
          visibilityTime: 3000,
        });
        setModalVisible(false);
        loadReviewDetail();
      } else {
        throw new Error('编辑失败');
      }
    } catch (error) {
      console.error('编辑回顾失败:', error);
      Toast.show({
        type: 'error',
        text1: '编辑失败，请重试',
        position: 'bottom',
        visibilityTime: 3000,
      });
    }
  };

  // 删除回顾
  const handleDelete = () => {
    if (!review) return;

    Alert.alert(
      '确认删除',
      '确定要删除这条回顾吗？此操作不可恢复。',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '删除',
          style: 'destructive',
          onPress: async () => {
            try {
              /**
               * 服务端文件：server/src/routes/reviews.ts
               * 接口：DELETE /api/v1/reviews/:id
               */
              const response = await fetch(
                `${process.env.EXPO_PUBLIC_BACKEND_BASE_URL}/api/v1/reviews/${review.id}`,
                {
                  method: 'DELETE',
                }
              );

              if (response.ok) {
                Toast.show({
                  type: 'success',
                  text1: '删除成功',
                  position: 'bottom',
                  visibilityTime: 3000,
                });
                router.back();
              } else {
                throw new Error('删除失败');
              }
            } catch (error) {
              console.error('删除回顾失败:', error);
              Toast.show({
                type: 'error',
                text1: '删除失败，请重试',
                position: 'bottom',
                visibilityTime: 3000,
              });
            }
          },
        },
      ]
    );
  };

  return (
    <Screen
      backgroundColor={theme.backgroundRoot}
      statusBarStyle="dark"
    >
      {/* 头部导航栏 */}
      <ThemedView level="root" style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <FontAwesome6 name="arrow-left" size={20} color={theme.textPrimary} />
        </TouchableOpacity>
        <ThemedText variant="title" color={theme.textPrimary} style={styles.headerTitle}>
          回顾详情
        </ThemedText>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome6 name="ellipsis" size={20} color={theme.textPrimary} />
        </TouchableOpacity>
      </ThemedView>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : !review ? (
        <View style={styles.centerContainer}>
          <FontAwesome6 name="calendar-xmark" size={48} color={theme.textMuted} style={styles.emptyIcon} />
          <ThemedText variant="body" color={theme.textMuted}>
            回顾不存在
          </ThemedText>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          {/* 回顾类型标签 */}
          <View style={styles.typeBadge}>
            <ThemedText variant="smallMedium" color={theme.buttonPrimaryText}>
              {getTypeLabel(review.type)}
            </ThemedText>
          </View>

          {/* 标题 */}
          <ThemedText variant="h2" color={theme.textPrimary} style={styles.title}>
            {review.title}
          </ThemedText>

          {/* 日期信息 */}
          <View style={styles.dateInfo}>
            <FontAwesome6 name="calendar" size={14} color={theme.textMuted} />
            <ThemedText variant="body" color={theme.textMuted}>
              {dayjs(review.date).format('YYYY年M月D日 dddd')}
            </ThemedText>
          </View>

          {/* 图片展示 */}
          {review.images && review.images.length > 0 && (
            <View style={styles.imagesSection}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {review.images.map((imageUrl, index) => (
                  <Image
                    key={index}
                    source={{ uri: imageUrl }}
                    style={styles.reviewImage}
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {/* 每周回顾的情绪关键词 */}
          {review.keywords && review.keywords.length > 0 && (
            <ThemedView level="root" style={styles.section}>
              <ThemedText variant="title" color={theme.textPrimary} style={styles.sectionTitle}>
                情绪关键词
              </ThemedText>
              <View style={styles.keywordsContainer}>
                {review.keywords.map((keyword, index) => (
                  <View key={index} style={styles.keyword}>
                    <ThemedText variant="body" color={theme.textSecondary}>
                      {keyword}
                    </ThemedText>
                  </View>
                ))}
              </View>
            </ThemedView>
          )}

          {/* 每月回顾的模块 */}
          {review.modules && review.modules.length > 0 && (
            <ThemedView level="root" style={styles.section}>
              <ThemedText variant="title" color={theme.textPrimary} style={styles.sectionTitle}>
                涉及模块
              </ThemedText>
              <View style={styles.modulesContainer}>
                {review.modules.map((module, index) => (
                  <View key={index} style={styles.module}>
                    <FontAwesome6 name="tag" size={14} color={theme.primary} />
                    <ThemedText variant="body" color={theme.textSecondary} style={styles.moduleText}>
                      {module}
                    </ThemedText>
                  </View>
                ))}
              </View>
            </ThemedView>
          )}

          {/* 完整内容 */}
          <ThemedView level="root" style={styles.section}>
            <ThemedText variant="title" color={theme.textPrimary} style={styles.sectionTitle}>
              详细内容
            </ThemedText>
            <ThemedText variant="body" color={theme.textSecondary} style={styles.content}>
              {review.content}
            </ThemedText>
          </ThemedView>

          {/* 摘要 */}
          <ThemedView level="root" style={styles.section}>
            <ThemedText variant="title" color={theme.textPrimary} style={styles.sectionTitle}>
              内容摘要
            </ThemedText>
            <ThemedText variant="body" color={theme.textMuted} style={styles.summary}>
              {review.summary}
            </ThemedText>
          </ThemedView>

          {/* 生成时间 */}
          <View style={styles.footer}>
            <ThemedText variant="caption" color={theme.textMuted}>
              生成于 {dayjs(review.createdAt).format('YYYY年M月D日 HH:mm')}
            </ThemedText>
          </View>

          {/* 操作按钮 */}
          <ThemedView level="root" style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleEdit}>
              <FontAwesome6 name="pen" size={16} color={theme.textPrimary} />
              <ThemedText variant="smallMedium" color={theme.textPrimary} style={styles.actionButtonText}>
                编辑回顾
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
              <FontAwesome6 name="trash" size={16} color={theme.textPrimary} />
              <ThemedText variant="smallMedium" color={theme.textPrimary} style={styles.actionButtonText}>
                删除
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ScrollView>
      )}

      {/* 编辑弹窗 */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.keyboardContainer}
          >
            <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  {/* Header */}
                  <View style={styles.modalHeader}>
                    <ThemedText variant="h3" color={theme.textPrimary} style={styles.modalTitle}>
                      编辑回顾
                    </ThemedText>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <FontAwesome6 name="xmark" size={20} color={theme.textMuted} />
                    </TouchableOpacity>
                  </View>

                  {/* Body */}
                  <ScrollView style={styles.modalBody}>
                    {/* 标题输入 */}
                    <ThemedView level="root" style={styles.inputContainer}>
                      <ThemedText variant="smallMedium" color={theme.textSecondary} style={styles.inputLabel}>
                        标题
                      </ThemedText>
                      <TextInput
                        style={styles.input}
                        value={editTitle}
                        onChangeText={setEditTitle}
                        placeholder="输入回顾标题"
                        placeholderTextColor={theme.textMuted}
                        multiline
                      />
                    </ThemedView>

                    {/* 摘要输入 */}
                    <ThemedView level="root" style={styles.inputContainer}>
                      <ThemedText variant="smallMedium" color={theme.textSecondary} style={styles.inputLabel}>
                        摘要
                      </ThemedText>
                      <TextInput
                        style={[styles.input, styles.textArea]}
                        value={editSummary}
                        onChangeText={setEditSummary}
                        placeholder="输入回顾摘要"
                        placeholderTextColor={theme.textMuted}
                        multiline
                        numberOfLines={3}
                      />
                    </ThemedView>

                    {/* 内容输入 */}
                    <ThemedView level="root" style={styles.inputContainer}>
                      <ThemedText variant="smallMedium" color={theme.textSecondary} style={styles.inputLabel}>
                        内容
                      </ThemedText>
                      <TextInput
                        style={[styles.input, styles.textArea]}
                        value={editContent}
                        onChangeText={setEditContent}
                        placeholder="输入回顾内容"
                        placeholderTextColor={theme.textMuted}
                        multiline
                        numberOfLines={5}
                      />
                    </ThemedView>

                    {/* 图片编辑 */}
                    <ThemedView level="root" style={styles.inputContainer}>
                      <View style={styles.sectionHeader}>
                        <ThemedText variant="smallMedium" color={theme.textSecondary} style={styles.inputLabel}>
                          图片
                        </ThemedText>
                        <TouchableOpacity
                          style={styles.addImageButton}
                          onPress={handleAddImage}
                        >
                          <FontAwesome6 name="plus" size={14} color={theme.primary} />
                          <ThemedText variant="caption" color={theme.primary} style={styles.addImageText}>
                            添加图片
                          </ThemedText>
                        </TouchableOpacity>
                      </View>

                      {/* 图片预览 */}
                      {editImages.length > 0 && (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                          <View style={styles.imagePreviewContainer}>
                            {editImages.map((imageUrl, index) => (
                              <View key={index} style={styles.imagePreviewItem}>
                                <Image source={{ uri: imageUrl }} style={styles.imagePreview} />
                                <TouchableOpacity
                                  style={styles.removeImageButton}
                                  onPress={() => handleRemoveImage(index)}
                                >
                                  <FontAwesome6 name="xmark" size={14} color="#FFFFFF" />
                                </TouchableOpacity>
                              </View>
                            ))}
                          </View>
                        </ScrollView>
                      )}

                      {editImages.length === 0 && (
                        <View style={styles.emptyImages}>
                          <FontAwesome6 name="images" size={32} color={theme.textMuted} />
                          <ThemedText variant="caption" color={theme.textMuted} style={styles.emptyImagesText}>
                            暂无图片，点击上方按钮添加
                          </ThemedText>
                        </View>
                      )}
                    </ThemedView>
                  </ScrollView>

                  {/* Footer */}
                  <View style={styles.modalFooter}>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.cancelButton]}
                      onPress={() => setModalVisible(false)}
                    >
                      <ThemedText variant="smallMedium" color={theme.textSecondary}>
                        取消
                      </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.submitButton]}
                      onPress={handleSaveEdit}
                    >
                      <ThemedText variant="smallMedium" color={theme.buttonPrimaryText}>
                        保存
                      </ThemedText>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </Modal>
    </Screen>
  );
}
