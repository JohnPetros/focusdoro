import { useCallback, useState } from "react"
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router"
import {
  ClockCounterClockwise,
  Gear,
  House,
  Pause,
  Play,
  Square as Reset,
} from "phosphor-react-native"
import { BookOpen } from "phosphor-react-native"
import { Square, useTheme, XStack, YStack } from "tamagui"

import { RoundButton } from "../../components/RoundButton"
import { TaskCard } from "../../components/TaskCard"
import { Timer } from "../../components/Timer"
import { SESSION_SECONDS, useTimerStore } from "../../hooks/useTimerStore"
import { storage } from "../../storage"
import { convertMinutesToSeconds } from "../../utils/convertMinutesToSeconds"

export default function Pomodoro() {
  const {
    state: {
      isPaused,
      isBreak,
      isLongBreak,
      totalSessions,
      completedSessions,
      totalSessionSeconds,
      taskTitle,
    },
    action: {
      setIsPaused,
      setIsBreak,
      setIsLongBreak,
      setSessionSeconds,
      setBreakSeconds,
      setTotalSessionSeconds,
      setTotalSessions,
      setCompletedSessions,
      setTaskTitle,
    },
  } = useTimerStore()
  const { taskId } = useLocalSearchParams()
  const [canPlay, setCanPlay] = useState(false)
  const router = useRouter()

  const theme = useTheme()

  function handleSettingsButton() {
    router.push("/settings/" + taskId)
  }

  function handleHomeButton() {
    router.push("/")
  }

  function handlePlayButton() {
    setIsPaused(!isPaused)
  }

  function handleResetSessionButton() {
    setIsPaused(false)
    setSessionSeconds(totalSessionSeconds)
  }

  function handleResetPomodoroButton() {
    setIsPaused(false)
    setIsBreak(false)
    setIsLongBreak(false)

    setSessionSeconds(SESSION_SECONDS)
    setCompletedSessions(1)
  }

  function fetchTask() {
    try {
      const task = storage.getTask(String(taskId))

      if (task) {
        setTotalSessions(task.totalSessions)
        setCompletedSessions(task.completedSessions)
        setBreakSeconds(convertMinutesToSeconds(task.breakMinutes))
        setSessionSeconds(convertMinutesToSeconds(task.sessionMinutes))
        setTotalSessionSeconds(convertMinutesToSeconds(task.sessionMinutes))
        setTaskTitle(task.title)

        setCanPlay(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchTask()
    }, [])
  )

  return (
    <YStack
      flex={1}
      bc="$blue2"
    >
      <Square
        w="100%"
        position="absolute"
        ai="center"
      >
        <TaskCard
          title={taskTitle}
          isActive={!isPaused && !isBreak}
          totalSessions={totalSessions}
          completedSessions={completedSessions}
          icon={BookOpen}
          onPress={null}
        />
        <XStack
          w="100%"
          mt={20}
          mr={20}
          ai="center"
          jc="flex-end"
          gap={16}
          zIndex={50}
        >
          <RoundButton
            shadowColor={theme.blue12.val}
            size="$2"
            radius={18}
            icon={
              <Gear
                color={theme.blue12.val}
                size={16}
                weight="bold"
              />
            }
            bc="$blue2"
            onPress={handleSettingsButton}
            aria-label="Open task settings"
          />
          <RoundButton
            shadowColor={theme.blue12.val}
            size="$2"
            radius={18}
            icon={
              <House
                color={theme.blue12.val}
                size={16}
                weight="bold"
              />
            }
            bc="$blue2"
            onPress={handleHomeButton}
            aria-label="Go back to home"
          />
        </XStack>
      </Square>

      <YStack
        f={1}
        ai="center"
        jc="center"
        position="relative"
      >
        <Timer canPlay={canPlay} />

        <YStack
          position="absolute"
          ai="center"
          gap={16}
          bottom={10}
        >
          <RoundButton
            shadowColor={theme.blue8.val}
            size="$7"
            radius={36}
            icon={
              isPaused ? (
                <Play
                  color={theme.blue12.val}
                  size={36}
                />
              ) : (
                <Pause
                  color={theme.blue12.val}
                  size={36}
                />
              )
            }
            bc="$blue10"
            onPress={handlePlayButton}
            aria-label={`${isPaused ? "Play" : "Pause"} timer"`}
          />

          {isPaused && (
            <XStack gap={64}>
              <RoundButton
                shadowColor={theme.blue8.val}
                size="$5"
                radius={28}
                icon={
                  <ClockCounterClockwise
                    color={theme.blue12.val}
                    size={24}
                  />
                }
                bc="$blue10"
                onPress={handleResetSessionButton}
                aria-label="Reset current session"
              />
              <RoundButton
                shadowColor={theme.blue8.val}
                radius={28}
                icon={
                  <Reset
                    color={theme.blue12.val}
                    size={24}
                  />
                }
                bc="$blue10"
                onPress={handleResetPomodoroButton}
                aria-label="Reset pomodoro"
              />
            </XStack>
          )}
        </YStack>
      </YStack>
    </YStack>
  )
}
