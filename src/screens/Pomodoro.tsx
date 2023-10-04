import { useEffect, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'

import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { Svg, Circle } from 'react-native-svg'
import { ReText } from 'react-native-redash'
import { Square, Text, View, YStack, useTheme } from 'tamagui'
import { XStack } from 'tamagui'
import { RoundButton } from '../components/RoundButton'
import { TaskCard } from '../components/TaskCard'

import { Pause } from 'phosphor-react-native'

import { calculateRadius } from '../utils/functions/calculateRadius'

const { width, height } = Dimensions.get('window')

const CIRCLE_LENGTH = 1000
const OUTER_CIRCLE_LENGTH = 1000
const INNER_CIRCLE_LENGTH = 900

const RADIUS = calculateRadius(CIRCLE_LENGTH)
const OUTER_CIRCLE_RADIUS = calculateRadius(OUTER_CIRCLE_LENGTH)
const INNER_CIRCLE_RADIUS = calculateRadius(INNER_CIRCLE_LENGTH)

const SESSION_TOTAL_SECONDS = 900

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export function Pomodoro() {
  const [totalSeconds, setTotalSeconds] = useState(SESSION_TOTAL_SECONDS)
  const theme = useTheme()

  const progress = useSharedValue(1)
  const minutes = useSharedValue(totalSeconds / 60)
  const seconds = useSharedValue(totalSeconds % 60)

  const innerCircleAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: INNER_CIRCLE_LENGTH * (1 - progress.value),
  }))

  const outerCircleAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: OUTER_CIRCLE_LENGTH * (1 - progress.value),
  }))

  const animatedMinutesText = useDerivedValue(() => {
    return `${minutes.value}`.padStart(2, '0')
  })

  const animatedSecondsText = useDerivedValue(() => {
    return `${seconds.value}`.padStart(2, '0')
  })

  const reTextStyle = StyleSheet.create({
    style: {
      fontSize: 64,
      color: theme.blue11.val,
      textAlign: 'center',
    },
  })

  useEffect(() => {
    progress.value = withTiming(1, { duration: 2000 })
  }, [])

  useEffect(() => {
    if (totalSeconds === 0) return

    setTimeout(() => {
      minutes.value = Math.floor(totalSeconds / 60)
      seconds.value = totalSeconds % 60

      setTotalSeconds(totalSeconds - 1)

      progress.value = withTiming(totalSeconds / SESSION_TOTAL_SECONDS)
    }, 1000)
  }, [totalSeconds])

  return (
    <YStack f={1} pt={40}>
      <Square pt={40} px={24} w="100%" position="absolute" ai="center">
        <TaskCard />
      </Square>
      <YStack f={1} ai="center" jc="center" position="relative">
        <XStack ai="center" gap={4} zIndex={50}>
          <ReText style={reTextStyle.style} text={animatedMinutesText} />
          <Text color="$blue11" fontSize={48}>
            :
          </Text>
          <ReText style={reTextStyle.style} text={animatedSecondsText} />

          {/* <Text color="$blue11" fontSize={48}>
          {seconds.toString().padStart(2, '0')}
        </Text> */}
        </XStack>
        <Svg style={{ position: 'absolute' }}>
          <Circle
            cx={width / 2}
            cy={height / 2}
            r={RADIUS}
            stroke={theme.blue4.val}
            strokeWidth={32}
          />
          <AnimatedCircle
            cx={width / 2}
            cy={height / 2}
            r={OUTER_CIRCLE_RADIUS}
            stroke={theme.blue6.val}
            fill={theme.blue2.val}
            strokeWidth={24}
            strokeDasharray={OUTER_CIRCLE_LENGTH}
            animatedProps={outerCircleAnimatedProps}
          />
          <View position="relative">
            {/* <View w={24} h={24}  top={0} left={0} position="absolute" zIndex={150} bg="$red11" /> */}
            <AnimatedCircle
              cx={width / 2}
              cy={height / 2}
              r={INNER_CIRCLE_RADIUS}
              stroke={theme.blue11.val}
              fill={theme.blue2.val}
              strokeWidth={8}
              strokeDasharray={INNER_CIRCLE_LENGTH}
              animatedProps={innerCircleAnimatedProps}
            />
          </View>
        </Svg>

        <YStack position="absolute" bottom={124}>
          <RoundButton
            size="$6"
            icon={<Pause color={theme.blue12.val} size={32} />}
            bc="$blue10"
          />
        </YStack>
      </YStack>
    </YStack>
  )
}
