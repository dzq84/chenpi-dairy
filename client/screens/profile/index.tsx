import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeRouter } from '@/hooks/useSafeRouter';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/contexts/AuthContext';
import { Screen } from '@/components/Screen';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FontAwesome6 } from '@expo/vector-icons';
import { createStyles } from './styles';

export default function ProfileScreen() {
  const { theme, isDark } = useTheme();
  const router = useSafeRouter();
  const { isAuthenticated, user } = useAuth();
  const styles = createStyles(theme);

  return (
    <Screen
      backgroundColor={theme.backgroundRoot}
      statusBarStyle="dark"
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {/* 用户信息卡片 */}
        {isAuthenticated ? (
          <ThemedView level="root" style={styles.userCard}>
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={() => router.push('/profile-edit')}
            >
              <Image
                source={{ uri: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80' }}
                style={styles.avatar}
              />
              <View style={styles.editBadge}>
                <FontAwesome6 name="pen" size={12} color={theme.buttonPrimaryText} />
              </View>
            </TouchableOpacity>
            <View style={styles.userInfo}>
              <ThemedText variant="h2" color={theme.textPrimary} style={styles.userName}>
                {user?.nickname || '未设置昵称'}
              </ThemedText>
              <ThemedText variant="body" color={theme.textMuted} style={styles.userBio}>
                {user?.bio || '这个人很懒，还没有写简介'}
              </ThemedText>
            </View>
          </ThemedView>
        ) : (
          <ThemedView level="root" style={styles.userCard}>
            <TouchableOpacity
              style={styles.loginPrompt}
              onPress={() => router.push('/login')}
            >
              <View style={styles.avatarPlaceholder}>
                <FontAwesome6 name="user" size={48} color={theme.textMuted} />
              </View>
              <View style={styles.loginInfo}>
                <ThemedText variant="h3" color={theme.textPrimary} style={styles.loginText}>
                  登录 / 注册
                </ThemedText>
                <ThemedText variant="body" color={theme.textMuted}>
                  登录后体验完整功能
                </ThemedText>
              </View>
              <FontAwesome6 name="chevron-right" size={20} color={theme.textMuted} />
            </TouchableOpacity>
          </ThemedView>
        )}

        {/* 统计信息 */}
        {isAuthenticated && (
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <ThemedText variant="h2" color={theme.textPrimary} style={styles.statNumber}>
                {user?.journalCount || 0}
              </ThemedText>
              <ThemedText variant="body" color={theme.textMuted} style={styles.statLabel}>
                日记篇数
              </ThemedText>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <ThemedText variant="h2" color={theme.textPrimary} style={styles.statNumber}>
                {user?.chatCount || 0}
              </ThemedText>
              <ThemedText variant="body" color={theme.textMuted} style={styles.statLabel}>
                陪聊次数
              </ThemedText>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <ThemedText variant="h2" color={theme.textPrimary} style={styles.statNumber}>
                {user?.reviewCount || 0}
              </ThemedText>
              <ThemedText variant="body" color={theme.textMuted} style={styles.statLabel}>
                回顾次数
              </ThemedText>
            </View>
          </View>
        )}

        {/* 功能列表 */}
        <ThemedView level="root" style={styles.section}>
          <ThemedText variant="title" color={theme.textPrimary} style={styles.sectionTitle}>
            个人设置
          </ThemedText>

          {isAuthenticated && (
            <>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => router.push('/profile-edit')}
              >
                <View style={styles.menuItemLeft}>
                  <View style={styles.menuIcon}>
                    <FontAwesome6 name="user-pen" size={20} color={theme.primary} />
                  </View>
                  <ThemedText variant="body" color={theme.textPrimary}>
                    编辑个人信息
                  </ThemedText>
                </View>
                <FontAwesome6 name="chevron-right" size={16} color={theme.textMuted} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <View style={styles.menuIcon}>
                    <FontAwesome6 name="bell" size={20} color={theme.primary} />
                  </View>
                  <ThemedText variant="body" color={theme.textPrimary}>
                    通知设置
                  </ThemedText>
                </View>
                <FontAwesome6 name="chevron-right" size={16} color={theme.textMuted} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <View style={styles.menuIcon}>
                    <FontAwesome6 name="palette" size={20} color={theme.primary} />
                  </View>
                  <ThemedText variant="body" color={theme.textPrimary}>
                    主题设置
                  </ThemedText>
                </View>
                <FontAwesome6 name="chevron-right" size={16} color={theme.textMuted} />
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/privacy-policy')}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIcon}>
                <FontAwesome6 name="shield-halved" size={20} color={theme.primary} />
              </View>
              <ThemedText variant="body" color={theme.textPrimary}>
                隐私政策
              </ThemedText>
            </View>
            <FontAwesome6 name="chevron-right" size={16} color={theme.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIcon}>
                <FontAwesome6 name="circle-info" size={20} color={theme.primary} />
              </View>
              <ThemedText variant="body" color={theme.textPrimary}>
                关于我们
              </ThemedText>
            </View>
            <FontAwesome6 name="chevron-right" size={16} color={theme.textMuted} />
          </TouchableOpacity>
        </ThemedView>

        {/* 退出登录 */}
        {isAuthenticated && (
          <TouchableOpacity style={styles.logoutButton}>
            <ThemedText variant="body" color="#EF4444" style={styles.logoutText}>
              退出登录
            </ThemedText>
          </TouchableOpacity>
        )}

        {/* 版本信息 */}
        <ThemedText variant="caption" color={theme.textMuted} style={styles.versionText}>
          AI日记 v1.0.0
        </ThemedText>
      </ScrollView>
    </Screen>
  );
}
