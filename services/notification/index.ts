import { useEffect, useState } from "react"
import {
  AndroidImportance,
  AndroidVisibility,
  AuthorizationStatus,
} from "@notifee/react-native"
import notifee from "@notifee/react-native"

import { CHANNELS } from "./channels"
import { timerNotification } from "./timerNotification"

export function useNotification() {
  const [timerChannelId, setTimerChannelId] = useState("")

  async function init() {
    if (AuthorizationStatus.DENIED) await notifee.requestPermission()

    const timerChannelId = await notifee.createChannel({
      id: CHANNELS.timer,
      name: CHANNELS.timer,
      vibration: false,
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
    })

    setTimerChannelId(timerChannelId)
  }

  useEffect(() => {
    init()
  }, [])

  return {
    ...timerNotification(timerChannelId),
  }
}
