import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import { FontAwesome6 } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { useTheme } from '@/hooks/useTheme';
import { Screen } from '@/components/Screen';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { createStyles } from './styles';
import { createFormDataFile } from '@/utils';
import { Spacing, BorderRadius } from '@/constants/theme';
import { useSafeRouter } from '@/hooks/useSafeRouter';

export default function JournalScreen() {
  const { theme, isDark } = useTheme();
  const router = useSafeRouter();
  const styles = createStyles(theme);

  const [text, setText] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  // 录音相关状态
  const [isRecording, setIsRecording] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const recordingRef = useRef<Audio.Recording | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 图片权限
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | null>(null);
  const [libraryPermission, setLibraryPermission] = useState<'granted' | 'denied' | null>(null);

  // 日期和天气
  const currentDate = dayjs().locale('zh-cn').format('YYYY年M月D日 dddd');
  const weather = {
    temp: '10°C',
    condition: '晴',
    icon: 'sun',
    location: '上海',
  };

  // 不再自动请求权限，改为用户操作时按需请求

  // 选择照片
  const handlePickImage = async () => {
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
        setImages([...images, result.assets[0].uri]);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '错误',
        text2: '选择照片失败',
      });
    }
  };

  // 拍照
  const handleTakePhoto = async () => {
    if (cameraPermission !== 'granted') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({
          type: 'error',
          text1: '需要权限',
          text2: '请授予相机权限',
        });
        return;
      }
      setCameraPermission('granted');
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setImages([...images, result.assets[0].uri]);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '错误',
        text2: '拍照失败',
      });
    }
  };

  // 删除图片
  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // 开始录音
  const startRecording = async () => {
    if (!hasPermission) {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({
          type: 'error',
          text1: '需要权限',
          text2: '请授予录音权限',
        });
        return;
      }
      setHasPermission(true);
    }

    if (recordingRef.current) {
      await recordingRef.current.stopAndUnloadAsync();
      recordingRef.current = null;
    }

    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recording.startAsync();
      recordingRef.current = recording;
      setIsRecording(true);
      setRecordingTime(0);

      // 开始计时
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('录音失败:', error);
      Toast.show({
        type: 'error',
        text1: '错误',
        text2: '录音失败',
      });
    }
  };

  // 停止录音
  const stopRecording = async () => {
    if (!recordingRef.current) return;

    try {
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      recordingRef.current = null;
      setIsRecording(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      if (uri) {
        setAudioUri(uri);
        setAudioDuration(recordingTime);
      }
    } catch (error) {
      console.error('停止录音失败:', error);
    }
  };

  // 删除音频
  const handleRemoveAudio = () => {
    setAudioUri(null);
    setAudioDuration(0);
  };

  // 提交日记
  const handleSubmit = async () => {
    if (!text.trim() && images.length === 0 && !audioUri) {
      Toast.show({
        type: 'error',
        text1: '提示',
        text2: '请至少输入文字、上传照片或录制语音',
      });
      return;
    }

    try {
      // 调用后端 API 保存日记
      /**
       * 服务端文件：server/src/routes/journals.ts
       * 接口：POST /api/v1/journals
       * Body 参数：text: string, mood: string, images: string[], audio_uri: string, audio_duration: number
       */
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_BASE_URL}/api/v1/journals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.trim(),
          mood: selectedMood,
          images: images, // 暂时直接使用本地 URI，实际应该上传到对象存储后获取 URL
          audio_uri: audioUri, // 暂时直接使用本地 URI，实际应该上传到对象存储后获取 URL
          audio_duration: audioDuration,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '保存失败');
      }

      const { data } = await response.json();

      // 清空表单
      setText('');
      setImages([]);
      setAudioUri(null);
      setAudioDuration(0);
      setSelectedMood(null);

      // 显示成功提示
      Toast.show({
        type: 'success',
        text1: '✨ 已经记录下来啦～',
        text2: '请继续输入',
        position: 'bottom',
        visibilityTime: 3000,
      });
    } catch (error) {
      console.error('提交失败:', error);
      Toast.show({
        type: 'error',
        text1: '错误',
        text2: '保存失败，请重试',
      });
    }
  };

  // 格式化录音时长
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* 头部 */}
          <ThemedView level="root" style={styles.header}>
            <ThemedText variant="h1" color={theme.textPrimary} style={styles.title}>
              心情记录
            </ThemedText>
            <ThemedText variant="body" color={theme.textMuted} style={styles.subtitle}>
              记录你的每一处自我觉察
            </ThemedText>
          </ThemedView>

          {/* 日期和天气 */}
          <ThemedView level="root" style={styles.dateTimeSection}>
            <View style={styles.dateWeatherRow}>
              <ThemedText variant="small" color={theme.textMuted}>
                写于
              </ThemedText>
              <ThemedText variant="small" color={theme.textSecondary} style={styles.dateWeatherText}>
                {currentDate}
              </ThemedText>
              <FontAwesome6 name={weather.icon as any} size={12} color={theme.primary} />
              <ThemedText variant="small" color={theme.textSecondary}>
                {weather.condition}
              </ThemedText>
              <FontAwesome6 name="location-dot" size={12} color={theme.textMuted} />
              <ThemedText variant="small" color={theme.textSecondary}>
                {weather.location}
              </ThemedText>
            </View>
          </ThemedView>

          {/* 文字输入 */}
          <ThemedView level="root" style={styles.writingSection}>
            <View style={styles.sectionHeader}>
              <ThemedText variant="title" color={theme.textPrimary} style={styles.sectionTitle}>
                写下你的想法
              </ThemedText>
              <TouchableOpacity onPress={() => router.push('/daily-entries')}>
                <ThemedText variant="smallMedium" color={theme.primary} style={styles.dailyEntriesLink}>
                  本日已写
                </ThemedText>
              </TouchableOpacity>
            </View>
            <View style={styles.inputCard}>
              <TextInput
                style={styles.textInput}
                placeholder="在这里写下你的心情、想法或者今天发生的事情..."
                placeholderTextColor={theme.textMuted}
                multiline
                value={text}
                onChangeText={setText}
                maxLength={2000}
              />

              {/* 心情选择 */}
              <View style={styles.moodSection}>
                <ThemedText variant="caption" color={theme.textMuted} style={styles.moodLabel}>
                  此刻的心情
                </ThemedText>
                <View style={styles.moodButtons}>
                  {[
                    { id: 'happy', icon: 'face-laugh-beam', label: '开心', color: '#FFD93D' },
                    { id: 'calm', icon: 'face-smile', label: '平静', color: '#4ECDC4' },
                    { id: 'sad', icon: 'face-sad-tear', label: '难过', color: '#95A5A6' },
                  ].map((mood) => (
                    <TouchableOpacity
                      key={mood.id}
                      style={[
                        styles.moodButton,
                        selectedMood === mood.id && styles.moodButtonSelected,
                        { borderColor: mood.color },
                      ]}
                      onPress={() => setSelectedMood(mood.id === selectedMood ? null : mood.id)}
                    >
                      <FontAwesome6
                        name={mood.icon as any}
                        size={24}
                        color={selectedMood === mood.id ? mood.color : theme.textMuted}
                      />
                      <ThemedText
                        variant="caption"
                        color={selectedMood === mood.id ? mood.color : theme.textMuted}
                        style={[
                          styles.moodButtonText,
                          selectedMood === mood.id && { color: mood.color },
                        ]}
                      >
                        {mood.label}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </ThemedView>

          {/* 多媒体输入 */}
          <ThemedView level="root" style={styles.mediaSection}>
            <ThemedText variant="title" color={theme.textPrimary} style={styles.sectionTitle}>
              添加照片或语音
            </ThemedText>
            <View style={styles.mediaButtons}>
              <TouchableOpacity
                style={styles.mediaButton}
                onPress={handleTakePhoto}
              >
                <FontAwesome6 name="camera" size={18} color={theme.textPrimary} />
                <ThemedText variant="smallMedium" color={theme.textPrimary} style={styles.mediaButtonText}>
                  拍照
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mediaButton}
                onPress={handlePickImage}
              >
                <FontAwesome6 name="image" size={18} color={theme.textPrimary} />
                <ThemedText variant="smallMedium" color={theme.textPrimary} style={styles.mediaButtonText}>
                  相册
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.mediaButton,
                  isRecording && styles.mediaButtonActive,
                ]}
                onPress={isRecording ? stopRecording : startRecording}
              >
                <FontAwesome6
                  name={isRecording ? "stop" : "microphone"}
                  size={18}
                  color={isRecording ? theme.primary : theme.textPrimary}
                />
                {isRecording ? (
                  <View style={styles.recordingIndicator}>
                    <View style={styles.recordingDot} />
                    <ThemedText
                      variant="smallMedium"
                      color={theme.primary}
                      style={styles.mediaButtonActiveText}
                    >
                      {formatTime(recordingTime)}
                    </ThemedText>
                  </View>
                ) : (
                  <ThemedText
                    variant="smallMedium"
                    color={theme.textPrimary}
                    style={styles.mediaButtonText}
                  >
                    录音
                  </ThemedText>
                )}
              </TouchableOpacity>
            </View>

            {/* 已上传的图片 */}
            {images.length > 0 && (
              <View style={styles.uploadedMediaContainer}>
                {images.map((uri, index) => (
                  <View key={index} style={styles.imageItem}>
                    <Image source={{ uri }} style={styles.imageItemThumbnail} />
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemoveImage(index)}
                    >
                      <FontAwesome6 name="xmark" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* 已录制的音频 */}
            {audioUri && (
              <View style={styles.uploadedMediaContainer}>
                <View style={styles.audioItem}>
                  <View style={styles.audioIcon}>
                    <FontAwesome6 name="music" size={20} color="#5CE0D8" />
                  </View>
                  <View style={styles.audioInfo}>
                    <ThemedText variant="bodyMedium" color={theme.textPrimary} style={styles.audioDuration}>
                      {formatTime(audioDuration)}
                    </ThemedText>
                    <ThemedText variant="small" color={theme.textMuted} style={styles.audioStatus}>
                      已录制
                    </ThemedText>
                  </View>
                  <TouchableOpacity onPress={handleRemoveAudio}>
                    <FontAwesome6 name="trash" size={18} color={theme.textMuted} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ThemedView>

          {/* 按钮组 */}
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.chatButton}
              onPress={() => router.push('/chat')}
            >
              <FontAwesome6 name="heart" size={16} color={theme.backgroundRoot} />
              <ThemedText variant="smallMedium" color={theme.backgroundRoot} style={styles.buttonText}>
                心事陪聊
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <ThemedText variant="smallMedium" color={theme.primary} style={styles.submitButtonText}>
                记录下来
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
