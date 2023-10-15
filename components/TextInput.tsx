import { Input, InputProps } from "tamagui"

interface TextInputProps extends InputProps {}

export function TextInput({ ...rest }: TextInputProps) {
  return (
    <Input
      {...rest}
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
