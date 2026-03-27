import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome6 } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';

export default function TabLayout() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  // Web 端用较小的底部间距
  const bottomPadding = Platform.OS === 'web' ? 8 : insets.bottom;

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: theme.navBg,
        borderTopWidth: 1,
        borderTopColor: 'rgba(26, 26, 26, 0.06)',
        height: 52 + bottomPadding,
        paddingBottom: bottomPadding,
        paddingTop: 4,
      },
      tabBarActiveTintColor: theme.textPrimary,
      tabBarInactiveTintColor: 'rgba(26, 26, 26, 0.3)',
      tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.3,
      },
      tabBarIconStyle: {
        marginBottom: -2,
      },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '记录',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="pen-to-square" size={16} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="review"
        options={{
          title: '回顾',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="clock-rotate-left" size={16} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '我的',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="user" size={16} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
