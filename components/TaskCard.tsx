import { BookmarkSimple, Icon } from "phosphor-react-native"
import { H4, Square, useTheme, XStack, YStack } from "tamagui"

import { RoundButton } from "./RoundButton"
import { SessionCounter } from "./SessionCounter"

interface TaskCardProps {
  title: string
  isActive?: boolean
  totalSessions: number
  completedSessions: number
  icon: Icon
  label?: string
  onPress: VoidFunction | null
}

export function TaskCard({
  title,
  isActive = false,
  totalSessions,
  completedSessions,
  icon: Icon,
  onPress,
  label,
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
      bc="$blue2"
    >
      <Square
        bc="$blue4"
        ai="center"
        jc="center"
        p={8}
        br={12}
      >
        <BookmarkSimple color={theme[color].val} />
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
