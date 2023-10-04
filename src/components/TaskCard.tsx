import { BookmarkMinus } from 'lucide-react-native'
import { H4, Square, XStack, YStack, useTheme } from 'tamagui'
import { RoundButton } from './RoundButton'
import { ClockClockwise } from 'phosphor-react-native'
import { SessionCounter } from './SessionCounter'

export function TaskCard() {
  const theme = useTheme()

  return (
    <XStack
      borderWidth={1}
      borderColor="$blue4"
      ai="center"
      jc="space-between"
      px={24}
      py={12}
      br={12}
      w="100%"
      bc="$blue2"
    >
      <Square bc="$blue4" ai="center" jc="center" p={8} br={12}>
        <BookmarkMinus color={theme.blue11.val} />
      </Square>
      <YStack ai="center" gap={4}>
        <H4>Learning UI</H4>
        <SessionCounter />
      </YStack>
      <RoundButton
        color="$blue10"
        bc="$blue10"
        size="$3"
        icon={<ClockClockwise color={theme.blue12.val} />}
      />
    </XStack>
  )
}
