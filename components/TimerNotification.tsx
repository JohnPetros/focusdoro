import { useEffect } from "react"
import { useNavigation } from "expo-router/src/useNavigation"

import { TimerNotificationActionType } from "../@types/timerNotificationAction"
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
      shouldReset,
    },
    action: { setIsPaused, setShouldReset },
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
    const seconds = shouldReset ? sessionSeconds : sessionSeconds + 1
    const time = convertSecondsToTime(seconds, true)

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

  function handleNotificationAction(action: TimerNotificationActionType) {
    switch (action) {
      case "pause":
        setIsPaused(true)
        break
      case "resume":
        setIsPaused(false)
        break
      case "reset":
        setShouldReset(true)
        setIsPaused(false)
        break
      case "close":
        notification.cancelTimer()
        setIsPaused(true)
        break
      default:
        return
    }
  }

  async function handleScreenBlur() {
    await notification.cancelTimer()
  }

  useEffect(() => {
    displayTimerNotification()

    notification.onTimerAction((event) => {
      handleNotificationAction(
        event.detail.pressAction?.id as unknown as TimerNotificationActionType
      )
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
