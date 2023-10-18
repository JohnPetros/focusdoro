import { useEffect } from "react"
import { useNavigation } from "expo-router/src/useNavigation"

import { useTimerStore } from "../hooks/useTimerStore"
import { useNotification } from "../services/notification"
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
