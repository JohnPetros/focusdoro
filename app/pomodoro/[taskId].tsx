import { useCallback, useEffect, useState } from "react"
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router"
import {
  ClockCounterClockwise,
  Gear,
  House,
  MusicNotes,
  Pause,
  Play,
  Square as Reset,
} from "phosphor-react-native"
import { BookOpen } from "phosphor-react-native"
import { Square, useTheme, XStack, YStack } from "tamagui"

import { Task } from "../../@types/task"
import {
  AudioModal,
  AudioModalContent,
  AudioModalTrigger,
} from "../../components/AudioModal"
import { RoundButton } from "../../components/RoundButton"
import { TaskCard } from "../../components/TaskCard"
import { Timer } from "../../components/Timer"
import { useBackgroundAudio } from "../../hooks/useBackgroundAudio"
import { useTimerStore } from "../../hooks/useTimerStore"
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
      sessionSeconds,
      totalSessionSeconds,
      breakSeconds,
      longBreakSeconds,
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
    },
  } = useTimerStore()
  const { taskId } = useLocalSearchParams()
  const [canPlayTimer, setCanPlayTimer] = useState(false)
  const [task, setTask] = useState<Task>(null)
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false)
  const { stop, play, isLoaded } = useBackgroundAudio()
  const router = useRouter()
  const navigation = useNavigation()
  const theme = useTheme()

  function handleSettingsButton() {
    router.push("/settings/" + taskId)
  }

  function handleHomeButton() {
    router.push("/")
  }

  function handlePlayButton() {
    if (isLoaded) setIsPaused(!isPaused)
  }

  function handleResetSessionButton() {
    setIsPaused(false)
    setSessionSeconds(totalSessionSeconds)
  }

  function handleResetPomodoroButton() {
    setIsPaused(false)
    setIsBreak(false)
    setIsLongBreak(false)

    setSessionSeconds(sessionSeconds)
    setCompletedSessions(1)
  }

  function fetchTask() {
    try {
      const task = storage.getTask(String(taskId))

      if (task) {
        setTask(task)

        setTotalSessions(task.totalSessions)
        setCompletedSessions(task.completedSessions)
        setBreakSeconds(convertMinutesToSeconds(task.breakMinutes))

        const sessionSeconds = task.isBreak
          ? breakSeconds
          : task.isLongBreak
          ? longBreakSeconds
          : convertMinutesToSeconds(task.sessionMinutes)

        setSessionSeconds(sessionSeconds)
        setTotalSessionSeconds(sessionSeconds)

        setTimeout(() => {
          setCanPlayTimer(true)
        }, 1000)
      }
    } catch (error) {
      console.error(error)
      router.push("/")
    }
  }

  function handleAudioModal() {
    setIsAudioModalOpen(true)
  }

  async function handleScreenBlur() {
    setCanPlayTimer(false)
    setIsPaused(true)
    stop()
  }

  useFocusEffect(
    useCallback(() => {
      setCanPlayTimer(false)
      fetchTask()
    }, [])
  )

  useEffect(() => {
    if (isAudioModalOpen) {
      setIsPaused(true)
      stop()
      return
    }
    setIsPaused(false)
  }, [isAudioModalOpen])

  useEffect(() => {
    if (canPlayTimer && isLoaded && !isPaused) {
      play()
      setIsPaused(false)
    } else if (isLoaded && isPaused) {
      stop()
    }
  }, [canPlayTimer, isLoaded, isPaused])

  useEffect(() => {
    navigation.addListener("blur", () => handleScreenBlur())

    return () => navigation.removeListener("blur", () => handleScreenBlur())
  }, [navigation])

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
          title={task?.title}
          isActive={!isPaused && !isBreak}
          totalSessions={totalSessions}
          completedSessions={completedSessions}
          icon={BookOpen}
          onPress={null}
        />
        {isPaused && (
          <XStack
            w="100%"
            mt={20}
            mr={20}
            ai="center"
            jc="flex-end"
            gap={20}
            zIndex={50}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
            opacity={1}
            animation="lazy"
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
            <AudioModal open={isAudioModalOpen}>
              <AudioModalTrigger asChild>
                <RoundButton
                  shadowColor={theme.blue12.val}
                  size="$2"
                  radius={18}
                  icon={
                    <MusicNotes
                      color={theme.blue12.val}
                      size={16}
                      weight="bold"
                    />
                  }
                  bc="$blue2"
                  onPress={handleAudioModal}
                  aria-label="Open audio modal"
                />
              </AudioModalTrigger>

              <AudioModalContent setIsModalOpen={setIsAudioModalOpen} />
            </AudioModal>
          </XStack>
        )}
      </Square>

      <YStack
        f={1}
        ai="center"
        jc="center"
        position="relative"
      >
        <Timer
          canPlay={canPlayTimer}
          task={task}
        />

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
                size="$4"
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
                size="$4"
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
