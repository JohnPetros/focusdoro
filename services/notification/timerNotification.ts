import uuid from "react-native-uuid"
import notifee from "@notifee/react-native"

import { ITimerNotification } from "./interfaces/ITimerNotification"

export function timerNotification(channelId: string): ITimerNotification {
  return {
    async displayTimer({ title, taskId }) {
      if (!channelId) return

      const id = uuid.v4().toString()

      console.log({ channelId })

      await notifee.displayNotification({
        id,
        title: `<strong>${title}</strong>`,
        data: {
          taskId,
        },
        android: {
          channelId,
          actions: [{ title: "pause", pressAction: { id: "pause-timer" } }],
        },
      })

      return id
    },
  }
}
