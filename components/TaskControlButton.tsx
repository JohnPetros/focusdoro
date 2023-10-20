import { Icon } from "phosphor-react-native"
import { useTheme, View } from "tamagui"

import { RoundButton } from "./RoundButton"

interface TaskControlButtonProps {
  icon: Icon
  label: string
  onPress: () => void
  isDisabled?: boolean
}

export function TaskControlButton({
  icon: Icon,
  label,
  isDisabled,
  onPress,
}: TaskControlButtonProps) {
  const theme = useTheme()

  return (
    <View opacity={isDisabled ? 0.5 : 1}>
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
        disabled={isDisabled}
      />
    </View>
  )
}
