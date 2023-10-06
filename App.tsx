import { useEffect } from 'react'
import { useFonts } from '@expo-google-fonts/inter'
import { StatusBar } from 'react-native'
import { TamaguiProvider, YStack, Theme } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import config from './tamagui.config'

import { ToastProvider, ToastViewport } from '@tamagui/toast'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Pomodoro } from './src/screens/Pomodoro'
import { Toast } from './src/components/Toast'

export default function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  if (!loaded) return null

  // useEffect(() => {
  //   SplashScreen.hideAsync()
  // }, [])

  return (
    <TamaguiProvider config={config}>
      <ToastProvider native={false} swipeDirection="down" duration={100000}>
        <SafeAreaProvider>
          <Toast />
          <ToastViewport left="50%" bottom={40} />
          <Theme name="dark">
            <StatusBar
              barStyle="light-content"
              backgroundColor="transparent"
              translucent
            />
            <YStack f={1} bg="$blue2">
              <Pomodoro />
            </YStack>
          </Theme>
        </SafeAreaProvider>
      </ToastProvider>
    </TamaguiProvider>
  )
}
