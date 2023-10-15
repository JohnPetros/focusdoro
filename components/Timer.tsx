import { useEffect } from "react"
import { StyleSheet } from "react-native"
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { ReText } from "react-native-redash"
import {
  BlurMask,
  Canvas,
  Path,
  runTiming,
  Shadow,
  Skia,
  useValue,
} from "@shopify/react-native-skia"
import { useToastController } from "@tamagui/toast"
import { HourglassHigh, Pause } from "phosphor-react-native"
import { Square, Text, useTheme, YStack } from "tamagui"
import { XStack } from "tamagui"

import { SESSION_SECONDS, useTimerStore } from "../hooks/useTimerStore"
// import { calculateRadius } from "../utils/calculateRadius"
import { convertSecondsToTime } from "../utils/convertSecondsToTime"

// const RADIUS = calculateRadius(CIRCLE_LENGTH)
// const OUTER_CIRCLE_RADIUS = calculateRadius(OUTER_CIRCLE_LENGTH)
// const INNER_CIRCLE_RADIUS = calculateRadius(INNER_CIRCLE_LENGTH)

const AnimatedXStack = Animated.createAnimatedComponent(XStack)
const AnimatedText = Animated.createAnimatedComponent(Text)

const OUTER_CIRCLE_SIZE = 300
const OUTER_CIRCLE_STROKE = 40

const INNER_CIRCLE_SIZE = 240
const INNER_CIRCLE_STROKE = 8

const OUTER_CIRCLE_RADIUS = (OUTER_CIRCLE_SIZE - OUTER_CIRCLE_STROKE) / 2
const INNER_CIRCLE_RADIUS = (INNER_CIRCLE_SIZE - INNER_CIRCLE_STROKE) / 2

const outerCirclePath = Skia.Path.Make()
const innerCirclePath = Skia.Path.Make()

outerCirclePath.addCircle(
  OUTER_CIRCLE_SIZE,
  OUTER_CIRCLE_SIZE,
  OUTER_CIRCLE_RADIUS
)

innerCirclePath.addCircle(
  OUTER_CIRCLE_SIZE,
  OUTER_CIRCLE_SIZE,
  INNER_CIRCLE_RADIUS
)

interface TimerProps {
  canPlay: boolean
}

export function Timer({ canPlay }: TimerProps) {
  const {
    state: {
      isPaused,
      isBreak,
      isLongBreak,
      sessionSeconds,
      breakSeconds,
      longBreakSeconds,
      totalSessionSeconds,
      totalSessions,
      completedSessions,
    },
    action: {
      setSessionSeconds,
      setIsBreak,
      setIsLongBreak,
      setTotalSessionSeconds,
      setCompletedSessions,
    },
  } = useTimerStore()

  const progress = useValue(0)
  const minutes = useSharedValue(canPlay ? sessionSeconds / 60 : 0)
  const seconds = useSharedValue(canPlay ? sessionSeconds % 60 : 0)
  const theme = useTheme()
  const toast = useToastController()

  const animatedMinutesText = useDerivedValue(() => {
    return `${minutes.value}`.padStart(2, "0")
  })

  const animatedSecondsText = useDerivedValue(() => {
    return `${seconds.value}`.padStart(2, "0")
  })

  const opacityAnimatedProp = useAnimatedProps(() => ({
    opacity: withTiming(isPaused ? 0.4 : 1, { duration: 400 }),
  }))

  const reTextStyle = StyleSheet.create({
    style: {
      fontSize: 64,
      color: theme.blue11.val,
      textAlign: "center",
    },
  })

  function showToast(message: string) {
    toast.show(message, {
      icon: HourglassHigh,
      duration: 3000,
    })
  }

  useEffect(() => {
    if (isPaused || !canPlay) return

    const isSessionEnd = sessionSeconds === -1

    if (isSessionEnd && isLongBreak) {
      setIsLongBreak(false)
      setSessionSeconds(SESSION_SECONDS)
      setTotalSessionSeconds(SESSION_SECONDS)
      setCompletedSessions(1)

      showToast("New session for " + convertSecondsToTime(SESSION_SECONDS))
      return
    }

    if (isSessionEnd && completedSessions === totalSessions) {
      setIsLongBreak(true)
      setSessionSeconds(longBreakSeconds)
      setTotalSessionSeconds(longBreakSeconds)

      showToast(
        `Take a long break for ${convertSecondsToTime(longBreakSeconds)}`
      )
      return
    }

    if (isSessionEnd && isBreak) {
      setIsBreak(false)
      setSessionSeconds(SESSION_SECONDS)
      setTotalSessionSeconds(SESSION_SECONDS)
      setCompletedSessions(completedSessions + 1)

      showToast("New session for " + convertSecondsToTime(SESSION_SECONDS))
      return
    }

    if (isSessionEnd) {
      setIsBreak(true)
      setSessionSeconds(breakSeconds)
      setTotalSessionSeconds(breakSeconds)

      showToast(`Take a break for ${convertSecondsToTime(breakSeconds)}`)
      return
    }

    setTimeout(() => {
      minutes.value = Math.floor(sessionSeconds / 60)
      seconds.value = sessionSeconds % 60

      setSessionSeconds(sessionSeconds - 1)

      runTiming(progress, sessionSeconds / totalSessionSeconds, {
        duration: 1000,
      })
    }, 1000)
  }, [sessionSeconds, isPaused, canPlay])

  useEffect(() => {
    runTiming(progress, 1, {
      duration: 500,
    })
  }, [])

  return (
    <>
      <YStack>
        <AnimatedXStack
          ai="center"
          gap={4}
          zIndex={50}
          animatedProps={opacityAnimatedProp}
        >
          <ReText
            style={reTextStyle.style}
            text={animatedMinutesText}
          />
          <Text
            color="$blue11"
            fontSize={48}
          >
            :
          </Text>
          <ReText
            style={reTextStyle.style}
            text={animatedSecondsText}
          />
        </AnimatedXStack>
        <AnimatedText
          color="$yellow11"
          textAlign="center"
          mt={12}
          opacity={isPaused ? 0.4 : 1}
          zIndex={50}
          animatedProps={opacityAnimatedProp}
        >
          {isBreak || isLongBreak
            ? `${
                isLongBreak ? "Long break" : "break"
              } for ${convertSecondsToTime(breakSeconds)}`
            : `${completedSessions} of ${totalSessions} sessions`}
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
            <Pause
              color={theme.blue12.val}
              size={80}
            />
          </Square>
        )}
      </YStack>
      <Canvas
        style={{
          position: "absolute",
          width: OUTER_CIRCLE_SIZE * 2,
          height: OUTER_CIRCLE_SIZE * 2,
        }}
      >
        <Path
          path={outerCirclePath}
          color={theme.blue4.val}
          style="stroke"
          strokeWidth={OUTER_CIRCLE_STROKE}
          start={0}
          end={1}
        />

        <Path
          path={outerCirclePath}
          color={theme.blue7.val}
          style="stroke"
          strokeWidth={OUTER_CIRCLE_STROKE}
          start={0}
          end={progress}
        >
          <BlurMask
            blur={1}
            style="solid"
          />
        </Path>

        <Path
          path={innerCirclePath}
          color={theme.blue7.val}
          style="stroke"
          strokeWidth={INNER_CIRCLE_STROKE}
          opacity={0.5}
          start={0}
          end={1}
        >
          <BlurMask
            blur={20}
            style="normal"
          />
        </Path>

        <Path
          path={innerCirclePath}
          color={theme.blue10.val}
          style="stroke"
          strokeWidth={INNER_CIRCLE_STROKE}
          start={0}
          end={progress}
        />
      </Canvas>
    </>
  )
}