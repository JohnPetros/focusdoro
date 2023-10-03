import { Dimensions } from "react-native"
import { Svg, Circle } from "react-native-svg"
import { YStack, useTheme } from "tamagui"

const { width, height } = Dimensions.get('window')

const CIRCLE_LENGTH = 1000
const RADIUS = CIRCLE_LENGTH / (2 * Math.PI)

export function Pomodoro() {
  const theme = useTheme()

  return (
    <YStack f={1} bg="$blue1">
      <Svg>
        <Circle cx={width / 2} cy={height / 2} r={RADIUS} stroke={theme.blue3.toString()} strokeWidth={20} />
      </Svg>
    </YStack>
  )
}
