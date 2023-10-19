import { Icon } from "phosphor-react-native"
import { useTheme } from "tamagui"

import { RoundButton } from "./RoundButton"

interface TaskControlButtonProps {
  icon: Icon
  label: string
  isLarge?: boolean
  onPress: () => void
}

export function TimerControlButton({
  icon: Icon,
  label,
  isLarge = false,
  onPress,
}: TaskControlButtonProps) {
  const theme = useTheme()

  const size = isLarge ? "$7" : "$4"
  const radius = isLarge ? 36 : 28
  const iconSize = isLarge ? 36 : 24

  return (
    <RoundButton
      shadowColor={theme.blue8.val}
      size={size}
      radius={radius}
      icon={
        <Icon
          color={theme.blue12.val}
          size={iconSize}
        />
      }
      bc="$blue10"
      onPress={onPress}
      aria-label={label}
    />
  )
}
