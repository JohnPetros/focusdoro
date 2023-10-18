import { useRef } from "react"
import uuid from "react-native-uuid"
import notifee, {
  AndroidImportance,
  AndroidVisibility,
  AuthorizationStatus,
} from "@notifee/react-native"

import { ITimerNotification } from "./interfaces/ITimerNotification"
import { CHANNELS } from "./channels"

export function timerNotification(): ITimerNotification {
  const timerChannelId = useRef("")
  const timerId = useRef("")

  return {
    async displayTimer(taskId) {
      if (AuthorizationStatus.DENIED) await notifee.requestPermission()

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
          actions: [{ title: "pause", pressAction: { id: "pause-timer" } }],
          onlyAlertOnce: true,
          progress: {
            max: 10,
            current: 0,
          },
        },
      })

      timerId.current = id
    },

    async updateTimer({ title, actions, progress }) {
      if (timerId.current && timerChannelId.current)
        await notifee.displayNotification({
          id: timerId.current,
          title,
          android: {
            channelId: timerChannelId.current,
            progress: {
              max: 10,
              current: progress,
            },
            actions,
          },
        })
    },

    async cancelTimer() {
      if (timerId.current) await notifee.cancelNotification(timerId.current)
    },
  }
}
