import { useState } from 'react'
import { Button, Square, Text, YStack } from 'tamagui'
import NumberPicker from './NumberPicker'

interface NumberInputProps {
  label: string
  value: number
  maxValue: number
  minValue: number
  unit?: string
  width: number
}

export function NumberInput({
  label,
  value,
  maxValue,
  minValue,
  unit = 'minutes',
  width,
}: NumberInputProps) {
  const [isNumberPickerVisible, setIsNumberPickerVisible] = useState(false)

  function handleShowNumberPickerButton() {
    setIsNumberPickerVisible(true)
  }

  function handleNumberPickerConfirm(value: number) {
    setIsNumberPickerVisible(false)
    console.log(value)
  }

  return (
    <>
      <Button unstyled onPress={handleShowNumberPickerButton}>
        <Square
          bc="$blue4"
          w={width}
          borderWidth={1}
          borderColor="$blue8"
          br={8}
          py={8}
        >
          <YStack ai="center" jc="center" gap={4}>
            <Text fontSize={16} color="$blue10">
              {label}
            </Text>
            <Text fontSize={32} color="$blue12">
              {value}
            </Text>
          </YStack>
        </Square>
        <Text
          textAlign="center"
          textTransform="uppercase"
          color="$blue12"
          fontSize={14}
          mt={4}
        >
          {unit}
        </Text>
      </Button>

      {isNumberPickerVisible && (
        <NumberPicker
          label={label}
          maxValue={maxValue}
          minValue={minValue}
          value={value}
          onConfirm={handleNumberPickerConfirm}
        />
      )}
    </>
  )
}
