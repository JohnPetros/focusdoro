import { Shadow } from "react-native-shadow-2"
import { Button, ButtonProps, useTheme } from "tamagui"

interface RoundButtonProps extends ButtonProps {
  shadowColor: string
  radius: number
}

export function RoundButton({
  shadowColor,
  radius,
  ...rest
}: RoundButtonProps) {
  const theme = useTheme()

  return (
    <Shadow
      startColor={shadowColor}
      style={{ borderRadius: radius }}
    >
      <Button
        {...rest}
        circular
        pressStyle={{
          opacity: 0.8,
          backgroundColor: theme.blue4.val,
        }}
        testID="roundButton"
      />
    </Shadow>
  )
}
