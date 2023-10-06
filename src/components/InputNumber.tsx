import { useState } from 'react'
import { Button, Label, Square, Text, XStack, YStack, useTheme } from 'tamagui'
import { RoundButton } from './RoundButton'
import { ArrowDown, ArrowUp, Check } from 'phosphor-react-native'
import { Portal } from '@gorhom/portal'

interface InputNumberProps {
  label: string
  value: number
  maxValue: number
  minValue: number
  unit?: string
  width: number
}

export function InputNumber({
  label,
  value,
  unit = 'minutes',
  width,
}: InputNumberProps) {
  const [inputValue, setInputValue] = useState()
  const [isNumberPickerVisible, setIsNumberPickerVisible] = useState(false)
  const theme = useTheme()

  function handleShowNumberPickerButton() {
    
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
            <XStack gap={64}>
              <RoundButton
                shadowColor={theme.blue8.val}
                size="$5"
                bg="$blue10"
                icon={
                  <ArrowUp color={theme.blue12.val} size={24} weight="bold" />
                }
              />
              <Text color="$blue12" fontSize={40}>
                {value}
              </Text>
              <RoundButton
                shadowColor={theme.blue8.val}
                size="$5"
                bg="$blue10"
                icon={
                  <ArrowDown color={theme.blue12.val} size={24} weight="bold" />
                }
              />
            </XStack>
            <RoundButton
              shadowColor={theme.blue8.val}
              size="$5"
              bg="$blue10"
              icon={<Check color={theme.blue12.val} size={24} weight="bold" />}
            />
          </YStack>
        </Portal>
      )}
    </>
  )
}
