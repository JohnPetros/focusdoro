import { useState } from 'react'
import { Label, Square, Text, XStack, YStack, useTheme } from 'tamagui'
import { RoundButton } from './RoundButton'
import { ArrowDown, ArrowUp, Check } from 'phosphor-react-native'
import { Portal } from '@gorhom/portal'

interface NumberPickerProps {
  label: string
  value: number
  maxValue: number
  minValue: number
  onConfirm: (value: number) => void
}

export default function NumberPicker({
  label,
  value,
  maxValue,
  minValue,
  onConfirm,
}: NumberPickerProps) {
  const [inputValue, setInputValue] = useState(value)
  const theme = useTheme()

  function handleIncreaseValueButton() {
    const updatedValue = inputValue + 1

    if (updatedValue > maxValue) return

    setInputValue(updatedValue)
  }

  function handleDecreaseValueButton() {
    const updatedValue = inputValue - 1

    if (updatedValue < minValue) return

    setInputValue(updatedValue)
  }

  function handleConfirmButton() {
    onConfirm(inputValue)
  }

  return (
    <Portal>
      <Square
        opacity={0.4}
        bc="$blue1"
        position="absolute"
        ai="center"
        jc="center"
        height="100%"
        width="100%"
        gap={24}
        zIndex={50}
      ></Square>
      <YStack
        position="absolute"
        width="100%"
        height="100%"
        ai="center"
        jc="center"
        gap={64}
        zIndex={100}
      >
        <Label fontSize={16} fontWeight="bold" color="$blue12">
          {label}
        </Label>
        <XStack gap={64} ai="center">
          <RoundButton
            shadowColor={theme.blue8.val}
            size="$5"
            bg="$blue10"
            icon={<ArrowUp color={theme.blue12.val} size={24} weight="bold" />}
            onPress={handleIncreaseValueButton}
          />
          <Text color="$blue12" fontSize={64}>
            {inputValue}
          </Text>
          <RoundButton
            shadowColor={theme.blue8.val}
            size="$5"
            bg="$blue10"
            icon={
              <ArrowDown color={theme.blue12.val} size={24} weight="bold" />
            }
            onPress={handleDecreaseValueButton}
          />
        </XStack>
        <RoundButton
          shadowColor={theme.blue8.val}
          size="$5"
          bg="$blue10"
          icon={<Check color={theme.blue12.val} size={24} weight="bold" />}
          onPress={handleConfirmButton}
        />
      </YStack>
    </Portal>
  )
}
