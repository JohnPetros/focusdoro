import { Button, useTheme, ButtonProps } from 'tamagui'

interface RoundButtonProps extends ButtonProps {
  shadowColor: string
}

export function RoundButton({ color, shadowColor, ...rest }: RoundButtonProps) {
  const theme = useTheme()

  return (
    <Button
      {...rest}
      circular
      pressStyle={{
        opacity: 0.8,
        backgroundColor: theme.blue4.val,
      }}
    ></Button>
  )
}
