import { StatusBar } from 'react-native'

import { SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import config from '../../tamagui.config'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ToastProvider, ToastViewport } from '@tamagui/toast'
import { PortalProvider } from '@gorhom/portal'
import { TamaguiProvider, YStack, Theme } from 'tamagui'
import { Toast } from '../components/Toast'

export { ErrorBoundary } from 'expo-router'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  if (!fontsLoaded) return null

  async function handleLayoutRootView() {
    if (fontsLoaded) SplashScreen.hideAsync()
  }

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
              <GestureHandlerRootView onLayout={handleLayoutRootView}>
                <YStack f={1} bg="$blue2">
                  <Stack
                    screenOptions={{
                      headerShown: false,
                    }}
                  />
                </YStack>
              </GestureHandlerRootView>
            </Theme>
          </SafeAreaProvider>
        </PortalProvider>
      </ToastProvider>
    </TamaguiProvider>
  )
}
