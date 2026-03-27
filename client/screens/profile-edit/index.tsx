import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useSafeRouter } from '@/hooks/useSafeRouter';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/contexts/AuthContext';
import { Screen } from '@/components/Screen';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FontAwesome6 } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { createStyles } from './styles';

export default function ProfileEditScreen() {
  const { theme, isDark } = useTheme();
  const router = useSafeRouter();
  const { user, updateUser } = useAuth();
  const styles = createStyles(theme);

  const [nickname, setNickname] = useState(user?.nickname || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [loading, setLoading] = useState(false);

  const handlePickAvatar = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setAvatar(result.assets[0].uri);
        Toast.show({
          type: 'success',
          text1: '成功',
          text2: '头像选择成功',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '错误',
        text2: '选择头像失败',
      });
    }
  };

  const handleSave = async () => {
    if (!nickname.trim()) {
      Toast.show({
        type: 'error',
        text1: '提示',
        text2: '请输入昵称',
      });
      return;
    }

    setLoading(true);
    try {
      // TODO: 调用后端 API 保存个人信息
      await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟网络请求

      // 更新用户信息到 AuthContext
      updateUser({
        nickname: nickname.trim(),
        bio: bio.trim(),
        avatar: avatar,
      });

      Toast.show({
        type: 'success',
        text1: '成功',
        text2: '个人信息已保存',
      });
      router.back();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '错误',
        text2: '保存失败，请重试',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen
      backgroundColor={theme.backgroundRoot}
      statusBarStyle="dark"
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <FontAwesome6 name="arrow-left" size={20} color={theme.textPrimary} />
          </TouchableOpacity>
          <ThemedText variant="title" color={theme.textPrimary} style={styles.headerTitle}>
            编辑个人信息
          </ThemedText>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            disabled={loading}
          >
            <ThemedText variant="body" color={theme.primary} style={styles.saveButtonText}>
              {loading ? '保存中' : '保存'}
            </ThemedText>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
        >
          {/* 头像选择 */}
          <View style={styles.avatarSection}>
            <TouchableOpacity style={styles.avatarContainer} onPress={handlePickAvatar}>
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <FontAwesome6 name="user" size={48} color={theme.textMuted} />
                </View>
              )}
              <View style={styles.avatarEditBadge}>
                <FontAwesome6 name="camera" size={16} color={theme.buttonPrimaryText} />
              </View>
            </TouchableOpacity>
            <ThemedText variant="body" color={theme.textMuted} style={styles.avatarHint}>
              点击更换头像
            </ThemedText>
          </View>

          {/* 表单 */}
          <ThemedView level="root" style={styles.form}>
            <ThemedText variant="title" color={theme.textPrimary} style={styles.formTitle}>
              基本信息
            </ThemedText>

            {/* 昵称 */}
            <View style={styles.formItem}>
              <ThemedText variant="body" color={theme.textSecondary} style={styles.label}>
                昵称
              </ThemedText>
              <TextInput
                style={styles.input}
                placeholder="请输入昵称"
                placeholderTextColor={theme.textMuted}
                value={nickname}
                onChangeText={setNickname}
                maxLength={20}
              />
              <ThemedText variant="caption" color={theme.textMuted} style={styles.inputCounter}>
                {nickname.length}/20
              </ThemedText>
            </View>

            {/* 个人简介 */}
            <View style={styles.formItem}>
              <ThemedText variant="body" color={theme.textSecondary} style={styles.label}>
                个人简介
              </ThemedText>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="介绍一下自己..."
                placeholderTextColor={theme.textMuted}
                value={bio}
                onChangeText={setBio}
                multiline
                numberOfLines={4}
                maxLength={100}
              />
              <ThemedText variant="caption" color={theme.textMuted} style={styles.inputCounter}>
                {bio.length}/100
              </ThemedText>
            </View>
          </ThemedView>

          {/* 提示信息 */}
          <ThemedText variant="caption" color={theme.textMuted} style={styles.hint}>
            个人信息将仅用于展示，不会向第三方公开
          </ThemedText>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
