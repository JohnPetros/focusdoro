import { BookmarkMinus } from 'lucide-react-native'

import { H4, Square, XStack, YStack, useTheme } from 'tamagui'
import { SessionCounter } from './SessionCounter'
import { Icon } from 'phosphor-react-native'
import { RoundButton } from './RoundButton'
import Animated, { FadeInUp } from 'react-native-reanimated'

interface TaskCardProps {
  title: string
  isActive?: boolean
  totalSessions: number
  completedSessions: number
  index?: number
  icon: Icon
  onPress: VoidFunction | null
}

export function TaskCard({
  title,
  isActive = false,
  totalSessions,
  completedSessions,
  icon: Icon,
  onPress,
  index = 1,
}: TaskCardProps) {
  const theme = useTheme()

  const color = isActive ? 'yellow11' : 'blue10'

  return (
    <Animated.View entering={FadeInUp.delay(index * 100)}>
      <XStack
        borderWidth={2}
        borderColor="$blue6"
        ai="center"
        jc="space-between"
        px={24}
        py={12}
        br={12}
        w="100%"
        bc="$blue2"
        animation="bouncy"
        enterStyle={{ y: 20, opacity: 0, scale: 0.9 }}
        y={0}
        opacity={1}
        scale={1}
      >
        <Square bc="$blue4" ai="center" jc="center" p={8} br={12}>
          <BookmarkMinus color={theme[color].val} />
        </Square>
        <YStack ai="center" gap={8}>
          <H4 fontSize={20}>{title}</H4>
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
          onPress={onPress}
        />
      </XStack>
    </Animated.View>
  )
}
