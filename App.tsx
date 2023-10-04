import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { TamaguiProvider, YStack, Theme } from 'tamagui';
import { StatusBar } from 'react-native';
import config from './tamagui.config';

import { Pomodoro } from './src/screens/Pomodoro';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_900Black,
  })

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
    <Theme name='dark'>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <YStack f={1} bg='$blue2'>
        <Pomodoro />
      </YStack>
    </Theme>
  </TamaguiProvider>
  );
}
