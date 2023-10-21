import { Dimensions } from "react-native"
import { Toast as T, useToastState } from "@tamagui/toast"
import { Square, useTheme, XStack } from "tamagui"

const { width: SCREEN_WIDTH } = Dimensions.get("window")

const WIDTH = SCREEN_WIDTH - 96
const X_PADDING = 2
const Y_PADDING = 12

export function Toast() {
  const toast = useToastState()
  const theme = useTheme()

  const Icon = toast?.icon

  if (!toast || toast.isHandledNatively) return null

  return (
    <T
      key={toast.id}
      type="background"
      duration={toast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={24}
      x={-(SCREEN_WIDTH / 2 - 24)}
      opacity={1}
      scale={1}
      animation="bouncy"
      zIndex={150}
      backgroundColor="$blue5"
      testID="toast"
    >
      <XStack
        ai="center"
        flex={1}
        br={12}
        w={WIDTH}
        px={X_PADDING}
        py={Y_PADDING}
      >
        <Square
          ai="center"
          jc="center"
        >
          {Icon && (
            <Icon
              color={theme.blue12.val}
              size={28}
            />
          )}
        </Square>
        <T.Title
          color="$blue12"
          fontSize={16}
          textAlign="center"
          mx="auto"
        >
          {toast.title}
        </T.Title>
      </XStack>
    </T>
  )
}
