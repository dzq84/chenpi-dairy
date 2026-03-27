import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeRouter } from '@/hooks/useSafeRouter';
import { useTheme } from '@/hooks/useTheme';
import { Screen } from '@/components/Screen';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FontAwesome6 } from '@expo/vector-icons';
import { createStyles } from './styles';

export default function PrivacyPolicyScreen() {
  const { theme, isDark } = useTheme();
  const router = useSafeRouter();
  const styles = createStyles(theme);

  return (
    <Screen
      backgroundColor={theme.backgroundRoot}
      statusBarStyle="dark"
    >
      {/* 头部 */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <FontAwesome6 name="arrow-left" size={20} color={theme.textPrimary} />
        </TouchableOpacity>
        <ThemedText variant="title" color={theme.textPrimary} style={styles.headerTitle}>
          隐私政策
        </ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      {/* 内容 */}
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* 生效日期 */}
        <ThemedView level="root" style={styles.updateInfo}>
          <ThemedText variant="caption" color={theme.textMuted}>
            最后更新：2024年1月1日
          </ThemedText>
        </ThemedView>

        {/* 引言 */}
        <ThemedView level="root" style={styles.section}>
          <ThemedText variant="title" color={theme.textPrimary} style={styles.sectionTitle}>
            引言
          </ThemedText>
          <ThemedText variant="body" color={theme.textSecondary} style={styles.sectionContent}>
            感谢您使用 AI 日记（以下简称&quot;我们&quot;或&quot;本应用&quot;）。我们深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。我们致力于维持您对我们的信任，恪守以下原则，保护您的个人信息：权责一致原则、目的明确原则、选择同意原则、最少够用原则、确保安全原则、主体参与原则、公开透明原则等。
          </ThemedText>
        </ThemedView>

        {/* 信息收集 */}
        <ThemedView level="root" style={styles.section}>
          <ThemedText variant="title" color={theme.textPrimary} style={styles.sectionTitle}>
            我们收集的信息
          </ThemedText>
          <ThemedText variant="body" color={theme.textSecondary} style={styles.sectionContent}>
            为了提供优质的服务，我们可能会收集以下信息：
          </ThemedText>
          <View style={styles.listItem}>
            <FontAwesome6 name="check" size={14} color={theme.primary} />
            <ThemedText variant="body" color={theme.textSecondary} style={styles.listItemText}>
              账户信息：您注册时提供的昵称、头像等
            </ThemedText>
          </View>
          <View style={styles.listItem}>
            <FontAwesome6 name="check" size={14} color={theme.primary} />
            <ThemedText variant="body" color={theme.textSecondary} style={styles.listItemText}>
              日记内容：您记录的日记文字、图片、语音等
            </ThemedText>
          </View>
          <View style={styles.listItem}>
            <FontAwesome6 name="check" size={14} color={theme.primary} />
            <ThemedText variant="body" color={theme.textSecondary} style={styles.listItemText}>
              聊天记录：您与陪聊伙伴的对话内容
            </ThemedText>
          </View>
          <View style={styles.listItem}>
            <FontAwesome6 name="check" size={14} color={theme.primary} />
            <ThemedText variant="body" color={theme.textSecondary} style={styles.listItemText}>
              设备信息：设备型号、操作系统版本等
            </ThemedText>
          </View>
        </ThemedView>

        {/* 信息使用 */}
        <ThemedView level="root" style={styles.section}>
          <ThemedText variant="title" color={theme.textPrimary} style={styles.sectionTitle}>
            信息的使用
          </ThemedText>
          <ThemedText variant="body" color={theme.textSecondary} style={styles.sectionContent}>
            我们使用收集的信息来：
          </ThemedText>
          <View style={styles.listItem}>
            <FontAwesome6 name="check" size={14} color={theme.primary} />
            <ThemedText variant="body" color={theme.textSecondary} style={styles.listItemText}>
              提供和改进我们的服务
            </ThemedText>
          </View>
          <View style={styles.listItem}>
            <FontAwesome6 name="check" size={14} color={theme.primary} />
            <ThemedText variant="body" color={theme.textSecondary} style={styles.listItemText}>
              生成日记回顾和智能建议
            </ThemedText>
          </View>
          <View style={styles.listItem}>
            <FontAwesome6 name="check" size={14} color={theme.primary} />
            <ThemedText variant="body" color={theme.textSecondary} style={styles.listItemText}>
              提供个性化体验
            </ThemedText>
          </View>
          <View style={styles.listItem}>
            <FontAwesome6 name="check" size={14} color={theme.primary} />
            <ThemedText variant="body" color={theme.textSecondary} style={styles.listItemText}>
              分析应用使用情况，优化产品功能
            </ThemedText>
          </View>
        </ThemedView>

        {/* 信息保护 */}
        <ThemedView level="root" style={styles.section}>
          <ThemedText variant="title" color={theme.textPrimary} style={styles.sectionTitle}>
            信息的保护
          </ThemedText>
          <ThemedText variant="body" color={theme.textSecondary} style={styles.sectionContent}>
            我们采取符合业界标准的安全保护措施，包括但不限于：
          </ThemedText>
          <View style={styles.listItem}>
            <FontAwesome6 name="check" size={14} color={theme.primary} />
            <ThemedText variant="body" color={theme.textSecondary} style={styles.listItemText}>
              使用加密技术保护您的个人信息
            </ThemedText>
          </View>
          <View style={styles.listItem}>
            <FontAwesome6 name="check" size={14} color={theme.primary} />
            <ThemedText variant="body" color={theme.textSecondary} style={styles.listItemText}>
              严格的访问控制和权限管理
            </ThemedText>
          </View>
          <View style={styles.listItem}>
            <FontAwesome6 name="check" size={14} color={theme.primary} />
            <ThemedText variant="body" color={theme.textSecondary} style={styles.listItemText}>
            定期进行安全审计和漏洞修复
            </ThemedText>
          </View>
        </ThemedView>

        {/* 信息共享 */}
        <ThemedView level="root" style={styles.section}>
          <ThemedText variant="title" color={theme.textPrimary} style={styles.sectionTitle}>
            信息的共享
          </ThemedText>
          <ThemedText variant="body" color={theme.textSecondary} style={styles.sectionContent}>
            我们不会向第三方出售或共享您的个人信息，除非：
          </ThemedText>
          <View style={styles.listItem}>
            <FontAwesome6 name="check" size={14} color={theme.primary} />
            <ThemedText variant="body" color={theme.textSecondary} style={styles.listItemText}>
              获得您的明确同意
            </ThemedText>
          </View>
          <View style={styles.listItem}>
            <FontAwesome6 name="check" size={14} color={theme.primary} />
            <ThemedText variant="body" color={theme.textSecondary} style={styles.listItemText}>
              根据法律法规要求
            </ThemedText>
          </View>
          <View style={styles.listItem}>
            <FontAwesome6 name="check" size={14} color={theme.primary} />
            <ThemedText variant="body" color={theme.textSecondary} style={styles.listItemText}>
              保护用户或公众安全
            </ThemedText>
          </View>
        </ThemedView>

        {/* 您的权利 */}
        <ThemedView level="root" style={styles.section}>
          <ThemedText variant="title" color={theme.textPrimary} style={styles.sectionTitle}>
            您的权利
          </ThemedText>
          <ThemedText variant="body" color={theme.textSecondary} style={styles.sectionContent}>
            您对自己的个人信息享有以下权利：
          </ThemedText>
          <View style={styles.listItem}>
            <FontAwesome6 name="check" size={14} color={theme.primary} />
            <ThemedText variant="body" color={theme.textSecondary} style={styles.listItemText}>
              访问和获取您的个人信息
            </ThemedText>
          </View>
          <View style={styles.listItem}>
            <FontAwesome6 name="check" size={14} color={theme.primary} />
            <ThemedText variant="body" color={theme.textSecondary} style={styles.listItemText}>
              更正或补充您的个人信息
            </ThemedText>
          </View>
          <View style={styles.listItem}>
            <FontAwesome6 name="check" size={14} color={theme.primary} />
            <ThemedText variant="body" color={theme.textSecondary} style={styles.listItemText}>
              删除您的个人信息
            </ThemedText>
          </View>
          <View style={styles.listItem}>
            <FontAwesome6 name="check" size={14} color={theme.primary} />
            <ThemedText variant="body" color={theme.textSecondary} style={styles.listItemText}>
              撤回同意
            </ThemedText>
          </View>
        </ThemedView>

        {/* 联系我们 */}
        <ThemedView level="root" style={styles.section}>
          <ThemedText variant="title" color={theme.textPrimary} style={styles.sectionTitle}>
            联系我们
          </ThemedText>
          <ThemedText variant="body" color={theme.textSecondary} style={styles.sectionContent}>
            如果您对本隐私政策有任何疑问、意见或建议，请通过以下方式联系我们：
          </ThemedText>
          <ThemedText variant="body" color={theme.textPrimary} style={styles.contactInfo}>
            邮箱：support@aidiary.com
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </Screen>
  );
}
