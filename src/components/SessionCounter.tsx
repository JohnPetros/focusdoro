import { XStack, useTheme } from 'tamagui'
import { Alarm } from 'phosphor-react-native'

interface SessionCounterProps {
  totalAmount?: number
  completedAmount?: number
  isActive?: boolean
}

export function SessionCounter({
  totalAmount,
  completedAmount,
  isActive,
}: SessionCounterProps) {
  const theme = useTheme()

  return (
    <XStack>
      <Alarm weight="fill" color={theme.blue8.val} />
      <Alarm weight="fill" color={theme.blue8.val} />
      <Alarm weight="fill" color={theme.blue8.val} />
    </XStack>
  )
}
