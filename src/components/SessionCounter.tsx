import { XStack, useTheme } from 'tamagui'
import { Alarm } from 'phosphor-react-native'

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

  const color = isActive ? 'yellow11' : 'blue10'

  return (
    <XStack>
      {Array.from({ length: totalAmount }).map((_, index) => {
        const isFilled = index <= completedAmount - 1
        return (
          <Alarm
            key={String(index)}
            weight={isFilled ? 'fill' : 'regular'}
            color={theme[color].val}
          />
        )
      })}
    </XStack>
  )
}
