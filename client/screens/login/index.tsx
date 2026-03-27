import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeRouter } from '@/hooks/useSafeRouter';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/contexts/AuthContext';
import { Screen } from '@/components/Screen';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FontAwesome6 } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { createStyles } from './styles';

export default function LoginScreen() {
  const { theme, isDark } = useTheme();
  const router = useSafeRouter();
  const { login } = useAuth();
  const styles = createStyles(theme);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: '提示',
        text2: '请填写所有字段',
      });
      return;
    }

    setLoading(true);
    try {
      await login({ email, password });
      Toast.show({
        type: 'success',
        text1: '成功',
        text2: isLogin ? '登录成功' : '注册成功',
      });
      router.back();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '错误',
        text2: isLogin ? '登录失败，请检查邮箱和密码' : '注册失败，请重试',
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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* 返回按钮 */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <FontAwesome6 name="arrow-left" size={20} color={theme.textPrimary} />
          </TouchableOpacity>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <FontAwesome6 name="book-journal-whills" size={48} color={theme.primary} />
            </View>
          </View>

          {/* 标题 */}
          <ThemedText variant="h1" color={theme.textPrimary} style={styles.title}>
            {isLogin ? '欢迎回来' : '创建账号'}
          </ThemedText>
          <ThemedText variant="body" color={theme.textMuted} style={styles.subtitle}>
            {isLogin ? '登录你的 AI 日记账户' : '开始你的自我觉察之旅'}
          </ThemedText>

          {/* 表单 */}
          <ThemedView level="root" style={styles.form}>
            {/* 邮箱输入 */}
            <View style={styles.inputContainer}>
              <FontAwesome6 name="envelope" size={18} color={theme.textMuted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="邮箱地址"
                placeholderTextColor={theme.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* 密码输入 */}
            <View style={styles.inputContainer}>
              <FontAwesome6 name="lock" size={18} color={theme.textMuted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="密码"
                placeholderTextColor={theme.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <FontAwesome6
                  name={showPassword ? 'eye' : 'eye-slash'}
                  size={18}
                  color={theme.textMuted}
                />
              </TouchableOpacity>
            </View>

            {/* 登录按钮 */}
            <TouchableOpacity
              style={[styles.submitButton, loading && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={loading}
            >
              <ThemedText variant="title" color={theme.buttonPrimaryText}>
                {loading ? '处理中...' : isLogin ? '登录' : '注册'}
              </ThemedText>
            </TouchableOpacity>

            {/* 切换登录/注册 */}
            <TouchableOpacity
              style={styles.switchContainer}
              onPress={() => setIsLogin(!isLogin)}
            >
              <ThemedText variant="body" color={theme.textMuted}>
                {isLogin ? '还没有账号？' : '已有账号？'}
              </ThemedText>
              <ThemedText variant="body" color={theme.primary} style={styles.switchText}>
                {isLogin ? '立即注册' : '立即登录'}
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>

          {/* 底部提示 */}
          <ThemedText variant="caption" color={theme.textMuted} style={styles.footerText}>
            登录即表示同意《隐私政策》和《用户协议》
          </ThemedText>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
