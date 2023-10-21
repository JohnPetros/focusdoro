import { Ref } from "react"
import { TextInput as TextInputRef } from "react-native"
import { Input, InputProps } from "tamagui"

interface TextInputProps extends InputProps {
  inputRef: Ref<TextInputRef>
}

export function TextInput({ inputRef, ...rest }: TextInputProps) {
  return (
    <Input
      {...rest}
      ref={inputRef}
      bg="$colorTransparent"
      borderWidth={2}
      borderColor="$blue6"
      focusStyle={{ borderColor: "$blue10", color: "$blue12" }}
      h={56}
      p={12}
      fontSize={16}
      color="$blue12"
      placeholderTextColor="$blue12"
    />
  )
}
