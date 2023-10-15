import { Button as TamaguiButton, styled } from "tamagui"

export const Button = styled(TamaguiButton, {
  width: "100%",
  height: "$5",
  color: "$blue12",
  fontSize: 16,
  borderRadius: 24,

  variants: {
    background: {
      normal: {
        bg: "$blue8",
      },
      outline: {
        borderWidth: 2,
        borderColor: "$blue10",
      },
    },
  } as const,

  defaultVariants: {
    background: "normal",
  },
})
