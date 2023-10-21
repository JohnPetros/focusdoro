import {
  ClockCounterClockwise,
  Pause,
  Play,
  Square as Reset,
} from "phosphor-react-native"
import { XStack, YStack } from "tamagui"

import { useTimerStore } from "../hooks/useTimerStore"

import { TimerControlButton } from "./TimerControlButton"

interface TimerControlsProps {
  isTimerLoaded: boolean
  onEnd: VoidFunction
}

export function TimerControls({ isTimerLoaded, onEnd }: TimerControlsProps) {
  const {
    state: { isPaused, sessionSeconds, isEnd },
    action: {
      setIsPaused,
      setIsBreak,
      setIsLongBreak,
      setSessionSeconds,
      setCompletedSessions,
      setShouldReset,
    },
  } = useTimerStore()

  function handlePlayButton() {
    if (isTimerLoaded && !isEnd) {
      setIsPaused(!isPaused)
    }

    if (isEnd) onEnd()
  }

  function handleResetSessionButton() {
    setShouldReset(true)
    setIsPaused(false)
  }

  function handleResetPomodoroButton() {
    setIsPaused(false)
    setIsBreak(false)
    setIsLongBreak(false)

    setSessionSeconds(sessionSeconds)
    setCompletedSessions(1)
  }

  return (
    <YStack
      position="absolute"
      ai="center"
      gap={16}
      bottom={10}
      enterStyle={{ opacity: 0 }}
      exitStyle={{ opacity: 0 }}
      opacity={1}
      animation="lazy"
    >
      <TimerControlButton
        icon={isPaused || isEnd ? Play : Pause}
        label={`${isPaused ? "Play" : "Pause"} timer"`}
        onPress={handlePlayButton}
        isLarge
      />

      {isPaused && (
        <XStack gap={64}>
          <TimerControlButton
            icon={ClockCounterClockwise}
            label="Reset current session"
            onPress={handleResetSessionButton}
          />

          <TimerControlButton
            icon={Reset}
            label="Reset pomodoro"
            onPress={handleResetPomodoroButton}
          />
        </XStack>
      )}
    </YStack>
  )
}
