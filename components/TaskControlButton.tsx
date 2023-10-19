import { Icon } from "phosphor-react-native"
import { useTheme } from "tamagui"

import { RoundButton } from "./RoundButton"

interface TaskControlButtonProps {
  icon: Icon
  label: string
  onPress: () => void
}

export function TaskControlButton({
  icon: Icon,
  label,
  onPress,
}: TaskControlButtonProps) {
  const theme = useTheme()

  return (
    <RoundButton
      shadowColor={theme.blue12.val}
      size="$2"
      radius={18}
      icon={
        <Icon
          color={theme.blue12.val}
          size={16}
          weight="bold"
        />
      }
      bc="$blue2"
      onPress={onPress}
      aria-label={label}
    />
  )
}
