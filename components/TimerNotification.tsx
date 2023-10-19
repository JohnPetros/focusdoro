import { useEffect } from "react"
import { useNavigation } from "expo-router/src/useNavigation"

import { useTimerStore } from "../hooks/useTimerStore"
import { useNotification } from "../services/notification"
import { convertSecondsToTime } from "../utils/convertSecondsToTime"
import { TIMER_NOTIFICATIONS_ACTIONS } from "../utils/timer-notifications-actions"

interface TimerNotificationProps {
  taskId: string
}

export function TimerNotification({ taskId }: TimerNotificationProps) {
  const {
    state: {
      isPaused,
      isBreak,
      isLongBreak,
      sessionSeconds,
      totalSessionSeconds,
    },
  } = useTimerStore()
  const notification = useNotification()
  const navigation = useNavigation()

  async function displayTimerNotification() {
    try {
      await notification.displayTimer(taskId)
    } catch (error) {
      console.error(error)
    }
  }

  async function updateTimerNotification() {
    const time = convertSecondsToTime(sessionSeconds + 1, true)

    const sessionStatus = isBreak
      ? "break"
      : isLongBreak
      ? "long break"
      : "session"

    const timerStatus = isPaused ? "paused" : "running"

    const actions = isPaused
      ? TIMER_NOTIFICATIONS_ACTIONS.paused
      : TIMER_NOTIFICATIONS_ACTIONS.running

    try {
      await notification.updateTimer({
        title: `${sessionStatus} - ${timerStatus}`,
        progress: 10 - Math.floor((sessionSeconds / totalSessionSeconds) * 10),
        actions,
        time,
      })
    } catch (error) {
      console.error(error)
    }
  }

  async function handleScreenBlur() {
    await notification.cancelTimer()
  }

  useEffect(() => {
    displayTimerNotification()

    notification.onTimerAction((event) => {
      console.log(event)
    })
  }, [])

  useEffect(() => {
    updateTimerNotification()
  }, [sessionSeconds, isPaused, isLongBreak, isBreak])

  useEffect(() => {
    navigation.addListener("blur", () => handleScreenBlur())

    return () => navigation.removeListener("blur", () => handleScreenBlur())
  }, [navigation])

  return <></>
}
