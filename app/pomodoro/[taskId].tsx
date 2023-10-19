import { useCallback, useEffect, useState } from "react"
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router"
import {
  ClockCounterClockwise,
  Pause,
  Play,
  Square as Reset,
} from "phosphor-react-native"
import { BookOpen } from "phosphor-react-native"
import { Square, useTheme, XStack, YStack } from "tamagui"

import type { Feature } from "../../@types/feature"
import type { Task } from "../../@types/task"
import { RoundButton } from "../../components/RoundButton"
import { TaskCard } from "../../components/TaskCard"
import { TaskControls } from "../../components/TaskControls"
import { Timer } from "../../components/Timer"
import { TimerControls } from "../../components/TimerControls"
import { TimerNotification } from "../../components/TimerNotification"
import { useBackgroundAudio } from "../../hooks/useBackgroundAudio"
import { useFeatures } from "../../hooks/useFeatures"
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
      setShouldReset,
    },
  } = useTimerStore()
  const { taskId } = useLocalSearchParams()
  const { getFeatureByTitle, features } = useFeatures()
  const { stop, play, isLoaded } = useBackgroundAudio()

  const [isTimerLoaded, setIsTimerLoaded] = useState(false)
  const [task, setTask] = useState<Task>(null)
  const [notificationFeature, setNotificationFeature] =
    useState<Feature | null>(null)
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false)

  const router = useRouter()
  const navigation = useNavigation()
  const theme = useTheme()

  function handlePlayButton() {
    if (isLoaded) setIsPaused(!isPaused)
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
          setIsTimerLoaded(true)
        }, 1000)
      }
    } catch (error) {
      console.error(error)
      router.push("/")
    }
  }

  function handleScreenBlur() {
    setIsTimerLoaded(false)
    setIsPaused(true)
    stop()
  }

  useFocusEffect(
    useCallback(() => {
      setIsTimerLoaded(false)
      fetchTask()
    }, [])
  )

  useFocusEffect(
    useCallback(() => {
      if (features.length)
        setNotificationFeature(getFeatureByTitle("show notification"))
    }, [features])
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
    if (isTimerLoaded && isLoaded && !isPaused && !isBreak && !isLongBreak) {
      play()
      setIsPaused(false)
    } else if (isLoaded && isPaused) {
      stop()
    }
  }, [isTimerLoaded, isLoaded, isPaused, isBreak, isLongBreak])

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
        <TaskControls taskId={taskId.toString()} />
      </Square>

      <YStack
        f={1}
        ai="center"
        jc="center"
        position="relative"
      >
        <Timer
          isLoaded={isTimerLoaded}
          task={task}
        />
        {notificationFeature?.isActive && (
          <TimerNotification taskId={String(taskId)} />
        )}

        <TimerControls isTimerLoaded={isTimerLoaded} />
      </YStack>
    </YStack>
  )
}
