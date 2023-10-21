import { useCallback, useEffect, useState } from "react"
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router"
import { BookOpen } from "phosphor-react-native"
import { Square, YStack } from "tamagui"

import type { Task } from "../../@types/task"
import { TaskCard } from "../../components/TaskCard"
import { TaskControls } from "../../components/TaskControls"
import { Timer } from "../../components/Timer"
import { TimerControls } from "../../components/TimerControls"
import { TimerNotification } from "../../components/TimerNotification"
import { useBackgroundAudio } from "../../hooks/useBackgroundAudio"
import { useFeatures } from "../../hooks/useFeatures"
import { useTimerStore } from "../../hooks/useTimerStore"
import { useStorage } from "../../services/storage"
import { convertMinutesToSeconds } from "../../utils/convertMinutesToSeconds"

export default function Pomodoro() {
  const {
    state: {
      isPaused,
      isBreak,
      isLongBreak,
      totalSessions,
      completedSessions,
      breakSeconds,
      longBreakSeconds,
    },
    action: {
      setIsPaused,
      setSessionSeconds,
      setBreakSeconds,
      setTotalSessionSeconds,
      setTotalSessions,
      setCompletedSessions,
      setLongBreakSeconds,
      setIsBreak,
      setIsLongBreak,
      resetState,
    },
  } = useTimerStore()
  console.log({ isPaused })

  const { taskId } = useLocalSearchParams()
  const {
    features: [audioFeature, notificationFeature],
  } = useFeatures(["background sound", "show notification"])
  const { stop, play, isLoaded } = useBackgroundAudio()

  const [isTimerLoaded, setIsTimerLoaded] = useState(false)
  const [task, setTask] = useState<Task>(null)

  const router = useRouter()
  const navigation = useNavigation()
  const storage = useStorage()

  function fetchTask() {
    try {
      const task = storage.getTask(String(taskId))

      if (task) {
        const taskBreakSeconds = convertMinutesToSeconds(task.breakMinutes)
        const taskLongBreakSeconds = convertMinutesToSeconds(
          task.longBreakMinutes
        )

        const sessionSeconds = task.isBreak
          ? taskBreakSeconds
          : task.isLongBreak
          ? taskLongBreakSeconds
          : convertMinutesToSeconds(task.sessionMinutes)

        setTask(task)
        setIsBreak(task.isBreak)
        setIsLongBreak(task.isLongBreak)
        setTotalSessions(task.totalSessions)
        setCompletedSessions(task.completedSessions)
        setBreakSeconds(convertMinutesToSeconds(task.breakMinutes))
        setLongBreakSeconds(convertMinutesToSeconds(task.longBreakMinutes))

        console.log({ sessionSeconds })

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

  useEffect(() => {
    if (isTimerLoaded && !isPaused && !isBreak && !isLongBreak) {
      if (audioFeature?.isActive && isLoaded) play()
      setIsPaused(false)
    } else if (audioFeature?.isActive && isLoaded && !isPaused) {
      stop()
    }
  }, [audioFeature, isTimerLoaded, isLoaded, isBreak, isLongBreak])

  useEffect(() => {
    if (task && completedSessions)
      storage.updateTask({ ...task, completedSessions })
  }, [task, completedSessions])

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

        {isTimerLoaded && <TimerControls isTimerLoaded={isTimerLoaded} />}
      </YStack>
    </YStack>
  )
}
