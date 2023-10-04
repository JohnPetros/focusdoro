import { Button, useTheme, ButtonProps } from 'tamagui'
import { Shadow } from 'react-native-shadow-2'

interface RoundButtonProps extends ButtonProps {}

export function RoundButton({ color, ...rest }: RoundButtonProps) {
  const theme = useTheme()

  return (
    <Shadow startColor={theme.blue8.val} style={{ borderRadius: 40 }}>
      <Button
        {...rest}
        circular
        pressStyle={{
          opacity: 0.8,
          backgroundColor: theme.blue4.val,
        }}
      ></Button>
    </Shadow>
  )
}
