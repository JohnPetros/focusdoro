import { useEffect, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { calculateRadius } from '../utils/functions/calculateRadius'

import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { Svg, Circle } from 'react-native-svg'
import { ReText } from 'react-native-redash'
import { Square, Text, YStack, useTheme } from 'tamagui'
import { XStack } from 'tamagui'
import { useToastController } from '@tamagui/toast'

import { HourglassHigh, Pause } from 'phosphor-react-native'
import { useTimerStore } from '../hooks/useTimerStore'

const { width, height } = Dimensions.get('window')

const CIRCLE_LENGTH = 1000
const OUTER_CIRCLE_LENGTH = 1000
const INNER_CIRCLE_LENGTH = 900

const RADIUS = calculateRadius(CIRCLE_LENGTH)
const OUTER_CIRCLE_RADIUS = calculateRadius(OUTER_CIRCLE_LENGTH)
const INNER_CIRCLE_RADIUS = calculateRadius(INNER_CIRCLE_LENGTH)

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedXStack = Animated.createAnimatedComponent(XStack)
const AnimatedText = Animated.createAnimatedComponent(Text)
const AnimatedSquare = Animated.createAnimatedComponent(Square)

export function Timer() {
  const {
    state: {
      isPaused,
      sessionSeconds,
      breakSeconds,
      totalSessionSeconds,
      totalSessions,
      completedSessions,
    },
    action: { setSessionSeconds, setIsBreak, setBreakSeconds },
  } = useTimerStore()

  // const [totalSeconds, setTotalSeconds] = useState(SESSION_SECONDS)
  const progress = useSharedValue(1)
  const minutes = useSharedValue(sessionSeconds / 60)
  const seconds = useSharedValue(sessionSeconds % 60)
  const theme = useTheme()
  const toast = useToastController()

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

  const opacityAnimatedProp = useAnimatedProps(() => ({
    opacity: withTiming(isPaused ? 0.4 : 1, { duration: 400 }),
  }))

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
    if (sessionSeconds === 0) {
      setIsBreak(true)
      setSessionSeconds(breakSeconds)
      toast.show(`Take a break for ${breakSeconds / 60} minutes`, {
        icon: HourglassHigh,
      })
      return
    }

    if (isPaused) return

    setTimeout(() => {
      minutes.value = Math.floor(sessionSeconds / 60)
      seconds.value = sessionSeconds % 60

      setSessionSeconds(sessionSeconds - 1)

      progress.value = withTiming(sessionSeconds / totalSessionSeconds)
    }, 1000)
  }, [sessionSeconds, isPaused])

  return (
    <>
      <YStack>
        <AnimatedXStack
          ai="center"
          gap={4}
          zIndex={50}
          animatedProps={opacityAnimatedProp}
        >
          <ReText style={reTextStyle.style} text={animatedMinutesText} />
          <Text color="$blue11" fontSize={48}>
            :
          </Text>
          <ReText style={reTextStyle.style} text={animatedSecondsText} />
        </AnimatedXStack>
        <AnimatedText
          color="$yellow11"
          textAlign="center"
          mt={12}
          opacity={isPaused ? 0.4 : 1}
          zIndex={50}
          animatedProps={opacityAnimatedProp}
        >
          {completedSessions} of {totalSessions} sessions
        </AnimatedText>
        {isPaused && (
          <Square
            enterStyle={{
              scale: 1.5,
              y: -10,
              opacity: 0,
            }}
            animation="bouncy"
            zIndex={100}
            position="absolute"
            x={40}
          >
            <Pause color={theme.blue12.val} size={80} />
          </Square>
        )}
      </YStack>
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
      </Svg>
    </>
  )
}
