import { useCallback, useEffect, useState } from "react"
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router"
import { BookOpen } from "phosphor-react-native"
import { Square, Text, YStack } from "tamagui"

import type { Task } from "../../@types/task"
import { TaskCard } from "../../components/TaskCard"
import { TaskControls } from "../../components/TaskControls"
import { Timer } from "../../components/Timer"
import { TimerControls } from "../../components/TimerControls"
import { TimerNotification } from "../../components/TimerNotification"
import { useBackgroundAudio } from "../../hooks/useBackgroundAudio"
import { useFeatures } from "../../hooks/useFeatures"
import { useQuote } from "../../hooks/useQuote"
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
      completedPomodoros,
      isEnd,
    },
    action: {
      setIsPaused,
      setSessionSeconds,
      setBreakSeconds,
      setTotalSessionSeconds,
      setTotalSessions,
      setCompletedSessions,
      setCompletedPomodoros,
      setLongBreakSeconds,
      setIsBreak,
      setIsLongBreak,
      setShouldReset,
      setIsEnd,
    },
  } = useTimerStore()

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
  const quote = useQuote(isEnd)

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

        console.log(task.isBreak)

        setTask(task)
        setIsBreak(task.isBreak)
        setIsLongBreak(task.isLongBreak)
        setTotalSessions(task.totalSessions)
        setCompletedSessions(task.completedSessions)
        setCompletedPomodoros(task.completedPomodoros)
        setBreakSeconds(convertMinutesToSeconds(task.breakMinutes))
        setLongBreakSeconds(convertMinutesToSeconds(task.longBreakMinutes))

        setSessionSeconds(5)
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

  function handlePomodoroEnd() {
    const sessionSeconds = convertMinutesToSeconds(task.sessionMinutes)
    const completedPomodoros = task.completedPomodoros + 1

    setIsBreak(false)
    setIsLongBreak(false)
    setSessionSeconds(sessionSeconds)
    setTotalSessionSeconds(sessionSeconds)
    setCompletedSessions(1)
    setCompletedPomodoros(completedPomodoros)

    storage.updateTask({
      ...task,
      completedSessions: 1,
      completedPomodoros: completedPomodoros,
      isBreak: false,
      isLongBreak: false,
    })

    setIsEnd(false)
    setShouldReset(true)
  }

  function handleScreenBlur() {
    if (isEnd) {
      handlePomodoroEnd()
      return
    }

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
    if (isTimerLoaded && !isPaused && !isBreak && !isLongBreak && !isEnd) {
      if (audioFeature?.isActive && isLoaded) play()
      setIsPaused(false)
    } else if (audioFeature?.isActive && isLoaded && !isPaused) {
      stop()
    }
  }, [audioFeature, isTimerLoaded, isLoaded, isBreak, isLongBreak, isEnd])

  useEffect(() => {
    if (task && completedSessions)
      storage.updateTask({ ...task, completedSessions })
  }, [task, completedSessions])

  useEffect(() => {
    navigation.addListener("blur", () => handleScreenBlur())

    return () => navigation.removeListener("blur", () => handleScreenBlur())
  }, [navigation, isEnd])

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
          completedPomodoros={completedPomodoros}
          icon={BookOpen}
          onPress={null}
        />
        <TaskControls taskId={taskId.toString()} />

        {isEnd && (
          <YStack mt={12}>
            <Text
              color="$blue12"
              fontWeight="bold"
              textTransform="uppercase"
              textAlign="center"
            >
              You completed this Pomodoro. Congratulations!
            </Text>
            <Text
              color="$blue12"
              fontSize={14}
              mt={8}
            >
              {quote?.content}
            </Text>
            <Text
              color="$blue12"
              fontSize={12}
              textAlign="right"
            >
              - {quote?.author}
            </Text>
          </YStack>
        )}
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

        {isTimerLoaded && (
          <TimerControls
            isTimerLoaded={isTimerLoaded}
            onEnd={handlePomodoroEnd}
          />
        )}
      </YStack>
    </YStack>
  )
}
