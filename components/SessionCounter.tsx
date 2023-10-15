import { Alarm } from "phosphor-react-native"
import { useTheme, View, XStack } from "tamagui"

interface SessionCounterProps {
  totalAmount: number
  completedAmount: number
  isActive: boolean
}

export function SessionCounter({
  totalAmount,
  completedAmount,
  isActive,
}: SessionCounterProps) {
  const theme = useTheme()

  const color = isActive ? "yellow11" : "blue10"

  return (
    <XStack
      testID={isActive ? "active" : "default"}
      aria-label={`${completedAmount} out of ${totalAmount} tasks are completed`}
    >
      {Array.from({ length: totalAmount }).map((_, index) => {
        const isFilled = index <= completedAmount - 1
        return (
          <View
            key={String(index)}
            testID={isFilled ? "filled" : "not-filled"}
          >
            <Alarm
              weight={isFilled ? "fill" : "regular"}
              color={theme[color].val}
            />
          </View>
        )
      })}
    </XStack>
  )
}
