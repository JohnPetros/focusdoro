import { useEffect, useState } from "react"
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
  Skia,
  useValue,
} from "@shopify/react-native-skia"
import { useToastController } from "@tamagui/toast"
import { Check, HourglassHigh, Pause } from "phosphor-react-native"
import { Square, Text, useTheme, YStack } from "tamagui"
import { XStack } from "tamagui"

import { Task } from "../@types/task"
import { useAudio } from "../hooks/useAudio"
import { useBackgroundAudio } from "../hooks/useBackgroundAudio"
import { useFeatures } from "../hooks/useFeatures"
import { useTimerStore } from "../hooks/useTimerStore"
import { useVibration } from "../hooks/useVibration"
import { useStorage } from "../services/storage"
import { convertSecondsToTime } from "../utils/convertSecondsToTime"

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
  isLoaded: boolean
  task: Task
}

export function Timer({ isLoaded, task }: TimerProps) {
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
      shouldReset,
      isEnd,
    },
    action: {
      setSessionSeconds,
      setIsBreak,
      setIsLongBreak,
      setTotalSessionSeconds,
      setCompletedSessions,
      setIsPaused,
      setShouldReset,
      setIsEnd,
    },
  } = useTimerStore()
  const {
    features: [automaticSessionFeature],
  } = useFeatures(["automatic sessions"])
  const vibration = useVibration()
  const storage = useStorage()

  const progress = useValue(0)
  const minutes = useSharedValue(isLoaded ? sessionSeconds / 60 : 0)
  const seconds = useSharedValue(isLoaded ? sessionSeconds % 60 : 0)
  const theme = useTheme()
  const toast = useToastController()
  const { stop: stopBackgroundAudio } = useBackgroundAudio()
  const { loadAudioUri, play } = useAudio()
  const [isAudioLoaded, setIsAudioLoaded] = useState(false)

  const animatedMinutesText = useDerivedValue(() => {
    return `${minutes.value}`.padStart(2, "0")
  })

  const animatedSecondsText = useDerivedValue(() => {
    return `${seconds.value}`.padStart(2, "0")
  })

  const opacityAnimatedProp = useAnimatedProps(() => ({
    opacity: withTiming(isPaused && !isEnd ? 0.4 : 1, { duration: 400 }),
  }))

  const reTextStyle = StyleSheet.create({
    style: {
      fontSize: 64,
      color: theme.blue11.val,
      textAlign: "center",
    },
  })

  function reset() {
    minutes.value = 0
    seconds.value = 0
    runTiming(progress, 1, {
      duration: 1000,
    })
    setSessionSeconds(totalSessionSeconds)

    if (isLoaded && !automaticSessionFeature?.isActive) {
      setIsPaused(true)
    }
  }

  function showToast(message: string) {
    if (automaticSessionFeature?.isActive)
      toast.show(message, {
        icon: HourglassHigh,
        duration: 3000,
      })
  }

  async function hanldeSessionEnd() {
    stopBackgroundAudio()
    vibration.vibrate("success")

    if (isAudioLoaded) {
      await play(false)
      setShouldReset(true)
    }
  }

  async function loadAudio() {
    const isLoaded = await loadAudioUri(
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/989813/chime.wav"
    )

    setIsAudioLoaded(isLoaded)
  }

  useEffect(() => {
    if (isPaused || shouldReset || isEnd) return

    const isSessionEnd = sessionSeconds === -1

    if (isSessionEnd && isLongBreak) {
      setShouldReset(true)
      setIsEnd(true)

      showToast("New session for " + convertSecondsToTime(totalSessionSeconds))
      storage.updateTask({ ...task, isLongBreak: false })
      return
    }

    if (isSessionEnd && completedSessions === totalSessions) {
      setIsLongBreak(true)
      setSessionSeconds(5)
      setTotalSessionSeconds(5)

      showToast(
        `Take a long break for ${convertSecondsToTime(longBreakSeconds)}`
      )
      storage.updateTask({ ...task, isLongBreak: true })
      hanldeSessionEnd()
      return
    }

    if (isSessionEnd && isBreak) {
      setIsBreak(false)
      setSessionSeconds(totalSessionSeconds)
      setTotalSessionSeconds(totalSessionSeconds)
      setCompletedSessions(completedSessions + 1)

      showToast("New session for " + convertSecondsToTime(totalSessionSeconds))
      storage.updateTask({ ...task, isBreak: false })
      hanldeSessionEnd()
      return
    }

    if (isSessionEnd) {
      setIsBreak(true)
      setSessionSeconds(breakSeconds)
      setTotalSessionSeconds(breakSeconds)

      showToast(`Take a break for ${convertSecondsToTime(breakSeconds)}`)
      storage.updateTask({ ...task, isBreak: true })
      hanldeSessionEnd()
      return
    }

    const timer = setTimeout(() => {
      minutes.value = Math.floor(sessionSeconds / 60)
      seconds.value = sessionSeconds % 60

      setSessionSeconds(sessionSeconds - 1)

      runTiming(progress, sessionSeconds / totalSessionSeconds, {
        duration: 1000,
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [sessionSeconds, isPaused, shouldReset, isLoaded])

  useEffect(() => {
    if (shouldReset) {
      reset()
      setTimeout(() => {
        setShouldReset(false)
      }, 500)
    }
  }, [shouldReset])

  useEffect(() => {
    if (!isLoaded) {
      reset()
      loadAudio()
    }
  }, [isLoaded])

  return (
    <>
      {isEnd ? (
        <Check
          color={theme.blue10.val}
          size={120}
          weight="bold"
        />
      ) : (
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
            opacity={isPaused || isEnd ? 0.4 : 1}
            zIndex={50}
            animatedProps={opacityAnimatedProp}
          >
            {isLoaded && (
              <>
                {isBreak || isLongBreak
                  ? `${
                      isLongBreak ? "Long break" : "break"
                    } for ${convertSecondsToTime(breakSeconds)}`
                  : `${completedSessions} of ${totalSessions} sessions`}
              </>
            )}
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
      )}
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
