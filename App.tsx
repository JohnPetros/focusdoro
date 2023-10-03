import { useFonts } from 'expo-font';
import { TamaguiProvider, YStack, Text } from 'tamagui';
import { StatusBar } from 'react-native';

import config from './tamagui.config';
import { Pomodoro } from './src/screens/Pomodoro';

export default function App() {
  const [isFontloading] = useFonts({
    regular: require('@tamagui/font-inter/otf/Inter-Refular.otf'),
    medium: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    semibold: require('@tamagui/font-inter/otf/Inter-Semibold.otf'),
    bold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  if (!isFontloading) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <YStack f={1} bg="$blue1">
        <Pomodoro />
      </YStack>
    </TamaguiProvider>
  );
}
