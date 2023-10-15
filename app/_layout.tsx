import { Suspense, useEffect } from "react"
import { StatusBar } from "react-native"
import { PortalProvider } from "@gorhom/portal"
import { DarkTheme, ThemeProvider } from "@react-navigation/native"
import { ToastProvider, ToastViewport } from "@tamagui/toast"
import { useFonts } from "expo-font"
import { SplashScreen, Stack } from "expo-router"
import { TamaguiProvider, Text, Theme, YStack } from "tamagui"

import { StyledSafeAreaView } from "../components/StyledSafeAreaView"
import { Toast } from "../components/Toast"
// import { Toast } from "../components/Toast"
import config from "../tamagui.config"

SplashScreen.preventAutoHideAsync()

export default function Layout() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) return null

  return (
    <TamaguiProvider config={config}>
      <Suspense fallback={<Text>Loading...</Text>}>
        <ToastProvider>
          <Theme name="dark">
            <ThemeProvider value={DarkTheme}>
              <PortalProvider>
                <StyledSafeAreaView>
                  <Toast />
                  <ToastViewport
                    left="50%"
                    bottom={40}
                  />
                  <StatusBar
                    barStyle="light-content"
                    backgroundColor="transparent"
                    translucent
                  />
                  <YStack
                    flex={1}
                    bg="$blue2"
                    p={24}
                  >
                    <Stack
                      screenOptions={{
                        headerShown: false,
                      }}
                    />
                  </YStack>
                  {/* </ToastProvider> */}
                </StyledSafeAreaView>
              </PortalProvider>
            </ThemeProvider>
          </Theme>
        </ToastProvider>
      </Suspense>
    </TamaguiProvider>
  )
}
