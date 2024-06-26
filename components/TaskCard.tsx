import { Icon } from "phosphor-react-native"
import { H4, Square, useTheme, XStack, YStack } from "tamagui"
import { Text } from "tamagui"

import { RoundButton } from "./RoundButton"
import { SessionCounter } from "./SessionCounter"

interface TaskCardProps {
  title: string
  isActive?: boolean
  totalSessions: number
  completedSessions: number
  completedPomodoros: number
  icon: Icon
  label?: string
  hasAnimation?: boolean
  onPress: VoidFunction | null
}

export function TaskCard({
  title,
  isActive = false,
  totalSessions,
  completedSessions,
  completedPomodoros,
  icon: Icon,
  onPress,
  label,
  hasAnimation = true,
}: TaskCardProps) {
  const theme = useTheme()

  const color = isActive ? "yellow11" : "blue10"

  return (
    <XStack
      borderWidth={2}
      borderColor="$blue6"
      ai="center"
      jc="space-between"
      px={24}
      py={12}
      br={12}
      w="100%"
      bg="$blue2"
      enterStyle={{ opacity: 0 }}
      exitStyle={{ opacity: 0 }}
      opacity={1}
      animation={hasAnimation ? "lazy" : undefined}
    >
      <Square
        bc="$blue4"
        ai="center"
        jc="center"
        br={12}
        w={32}
        h={32}
      >
        {completedPomodoros > 0 ? (
          <Text
            fontWeight="bold"
            color={theme[color].val}
          >
            + {completedPomodoros}
          </Text>
        ) : (
          <Text
            fontWeight="bold"
            color={theme[color].val}
          >
            0
          </Text>
        )}
      </Square>
      <YStack
        ai="center"
        gap={8}
      >
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
        radius={18}
        bc={theme[color].val}
        size="$3"
        icon={
          <Icon
            color={theme.blue12.val}
            size={24}
          />
        }
        onPress={onPress}
        aria-label={label ? label : "no action"}
      />
    </XStack>
  )
}
