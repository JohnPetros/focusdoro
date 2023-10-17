import { Suspense, useEffect } from "react"
import { StatusBar } from "react-native"
import { PortalProvider } from "@gorhom/portal"
import { DarkTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { SplashScreen, Stack } from "expo-router"
import { Text, Theme, YStack } from "tamagui"

import { StyledSafeAreaView } from "../components/StyledSafeAreaView"
import { BackgroundAudioProvider } from "../contexts/BackgroundAudioContext"
import { TamaguiProvider } from "../providers/TamaguiProvider"
import { ToastProvider } from "../providers/ToastProvider"

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
    <TamaguiProvider>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Theme name="dark">
          <ThemeProvider value={DarkTheme}>
            <PortalProvider>
              <StyledSafeAreaView>
                <ToastProvider>
                  <BackgroundAudioProvider>
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
                  </BackgroundAudioProvider>
                </ToastProvider>
              </StyledSafeAreaView>
            </PortalProvider>
          </ThemeProvider>
        </Theme>
      </Suspense>
    </TamaguiProvider>
  )
}
