import { useRef } from "react"
import { Check, Icon, X } from "phosphor-react-native"
import {
  Button,
  ButtonProps,
  Checkbox as C,
  Label,
  TamaguiComponent,
  useTheme,
  View,
  XStack,
  YStack,
} from "tamagui"

interface CheckboxProps {
  id: string
  label: string
  width: number
  isChecked: boolean
  icon: Icon
  onCheck: (value: string) => void
}

export function Checkbox({
  id,
  label,
  width,
  isChecked,
  icon: Icon,
  onCheck,
}: CheckboxProps) {
  const theme = useTheme()
  const checkboxRef = useRef<TamaguiComponent | null>(null)
  const color = isChecked ? "blue10" : "blue7"

  function handleCheck() {
    onCheck(id)
  }

  function handleCheckboxPress() {
    checkboxRef.current?.p
  }

  return (
    <C
      id={id}
      checked={isChecked}
      onCheckedChange={handleCheck}
      unstyled
      br={8}
      pt={12}
      w={width}
      h="auto"
      bg="$blue2"
      onPress={handleCheckboxPress}
    >
      <YStack
        alignItems="center"
        justifyContent="center"
      >
        <View
          w={32}
          h={32}
          br={16}
          alignItems="center"
          justifyContent="center"
          bg={theme[color].val}
        >
          {!isChecked && (
            <X
              color={theme.blue3.val}
              weight="bold"
              size={24}
            />
          )}
          <C.Indicator>
            <Check
              color={theme.blue3.val}
              weight="bold"
              size={24}
            />
          </C.Indicator>
        </View>

        <XStack
          alignItems="center"
          justifyContent="center"
          gap={8}
        >
          <Label
            size="$4"
            htmlFor={id}
            color={theme[color].val}
            textTransform="uppercase"
          >
            {label}
          </Label>
          <Icon color={theme[color].val} />
        </XStack>
      </YStack>
    </C>
  )
}
