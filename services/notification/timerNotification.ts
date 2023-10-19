import { useRef } from "react"
import uuid from "react-native-uuid"
import notifee, {
  AndroidImportance,
  AndroidVisibility,
  AuthorizationStatus,
  Event,
} from "@notifee/react-native"

import { ITimerNotification } from "./interfaces/ITimerNotification"
import { CHANNELS } from "./channels"

export function timerNotification(): ITimerNotification {
  const timerChannelId = useRef("")
  const timerId = useRef("")

  return {
    async displayTimer(taskId) {
      if (AuthorizationStatus.DENIED) await notifee.requestPermission()

      notifee.registerForegroundService(() => {
        return new Promise(() => {
          return null
        })
      })

      const channelId = await notifee.createChannel({
        id: CHANNELS.timer,
        name: CHANNELS.timer,
        vibration: false,
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
      })

      timerChannelId.current = channelId

      const id = uuid.v4().toString()

      await notifee.displayNotification({
        id,
        title: `<strong>Timer running</strong>`,
        data: {
          taskId,
        },
        android: {
          channelId,
          asForegroundService: true,
          onlyAlertOnce: true,
          progress: {
            max: 10,
            current: 0,
          },
        },
      })

      timerId.current = id
    },

    async updateTimer({ title, actions, progress, time }) {
      if (timerId.current && timerChannelId.current)
        await notifee.displayNotification({
          id: timerId.current,
          title: `<strong>${title}</strong>: ${time}`,
          android: {
            channelId: timerChannelId.current,
            onlyAlertOnce: true,
            asForegroundService: true,
            progress: {
              max: 10,
              current: progress,
            },
            actions,
          },
        })
    },

    async cancelTimer() {
      if (timerId.current) {
        await notifee.cancelNotification(timerId.current)
        await notifee.stopForegroundService()
      }
    },

    async onTimerAction(callback: (notificationEvent: Event) => void) {
      notifee.onBackgroundEvent(async (event) => {
        callback(event)
      })

      notifee.onForegroundEvent(async (event) => {
        callback(event)
      })
    },
  }
}
