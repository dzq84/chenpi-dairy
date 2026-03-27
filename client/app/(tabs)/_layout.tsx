import { Tabs } from 'expo-router';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome6 } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';

export default function TabLayout() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        position: 'absolute',
        bottom: Platform.OS === 'web' ? 24 : 24,
        left: 24,
        right: 24,
        backgroundColor: theme.navBg,
        borderRadius: 999,
        height: 56,
        paddingBottom: 0,
        paddingTop: 0,
        borderTopWidth: 0,
        elevation: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 40,
      },
      tabBarActiveTintColor: theme.textPrimary,
      tabBarInactiveTintColor: 'rgba(26, 26, 26, 0.3)',
      tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.3,
        textTransform: 'uppercase',
      },
      tabBarItemStyle: {
        paddingVertical: 6,
      },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '记录',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="pen-to-square" size={18} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="review"
        options={{
          title: '回顾',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="clock-rotate-left" size={18} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '我的',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="user" size={18} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
