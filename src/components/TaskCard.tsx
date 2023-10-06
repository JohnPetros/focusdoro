import { BookmarkMinus } from 'lucide-react-native'

import { H4, Square, XStack, YStack, useTheme } from 'tamagui'
import { RoundButton } from './RoundButton'
import { SessionCounter } from './SessionCounter'
import { Icon } from 'phosphor-react-native'

interface TaskCardProps {
  isActive?: boolean
  totalSessions: number
  completedSessions: number
  icon: Icon
}

export function TaskCard({
  isActive = false,
  totalSessions,
  completedSessions,
  icon: Icon,
}: TaskCardProps) {
  const theme = useTheme()

  const color = isActive ? 'yellow11' : 'blue10'

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
        <BookmarkMinus color={theme[color].val} />
      </Square>
      <YStack ai="center" gap={8}>
        <H4 fontSize={20}>Learning UI</H4>
        <SessionCounter
          isActive={isActive}
          totalAmount={totalSessions}
          completedAmount={completedSessions}
        />
      </YStack>
      <RoundButton
        shadowColor={theme[color].val}
        color="$blue10"
        bc={theme[color].val}
        size="$3"
        icon={<Icon color={theme.blue12.val} size={24} />}
      />
    </XStack>
  )
}
