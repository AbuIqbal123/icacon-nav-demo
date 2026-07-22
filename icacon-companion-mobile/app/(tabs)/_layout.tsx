import { Tabs } from 'expo-router'
import { Calendar, Compass, Home, Info } from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '@/src/theme/colors'

export default function TabLayout() {
  const insets = useSafeAreaInsets()
  // Home-indicator devices need ~34pt; Android / older iPhones still get a little lift
  const bottomPad = Math.max(insets.bottom, 10)
  const tabBarHeight = 52 + bottomPad

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.brand,
        tabBarInactiveTintColor: colors.inkMuted,
        tabBarStyle: {
          backgroundColor: colors.surfaceElevated,
          borderTopColor: colors.border,
          height: tabBarHeight,
          paddingBottom: bottomPad,
          paddingTop: 8,
        },
        tabBarItemStyle: {
          paddingTop: 2,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          marginBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="navigate"
        options={{
          title: 'Navigate',
          tabBarIcon: ({ color, size }) => <Compass size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="programme"
        options={{
          title: 'Programme',
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          title: 'Info',
          tabBarIcon: ({ color, size }) => <Info size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}
