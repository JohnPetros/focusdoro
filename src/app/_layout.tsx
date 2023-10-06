import { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { SplashScreen, Stack } from 'expo-router'
import { useFonts } from '@expo-google-fonts/inter'
import { TamaguiProvider, YStack, Theme } from 'tamagui'
import config from '../../tamagui.config'
import { PortalProvider } from '@gorhom/portal';
import { ToastProvider, ToastViewport } from '@tamagui/toast'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Toast } from '../components/Toast'

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
      <ToastProvider native={false} swipeDirection="down" duration={5000}>
        <PortalProvider>
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
                <Stack
                  screenOptions={{
                    headerShown: false,
                  }}
                />
              </YStack>
            </Theme>
          </SafeAreaProvider>
        </PortalProvider>
      </ToastProvider>
    </TamaguiProvider>
  )
}
