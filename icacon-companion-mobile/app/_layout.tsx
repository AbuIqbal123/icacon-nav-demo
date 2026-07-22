import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { colors } from '@/src/theme/colors'

// Vexo needs AsyncStorage native module (installed via @react-native-async-storage/async-storage).
// Guard so a missing native module never crashes the app shell.
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { vexo } = require('vexo-analytics') as typeof import('vexo-analytics')
  vexo('56dbf82b-5310-4e11-96fa-2a5d9f4fb596')
} catch (e) {
  console.warn('Vexo analytics failed to start:', e)
}

export { ErrorBoundary } from 'expo-router'

export const unstable_settings = {
  initialRouteName: '(tabs)',
}

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.brand },
          headerTintColor: colors.white,
          contentStyle: { backgroundColor: colors.surface },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="pdf/[id]"
          options={{
            presentation: 'modal',
            title: 'PDF',
            headerShown: true,
          }}
        />
      </Stack>
    </>
  )
}
