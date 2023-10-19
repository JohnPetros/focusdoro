import { TimerNotificationAction } from "../@types/timerNotificationAction"

export const TIMER_NOTIFICATIONS_ACTIONS: Record<
  "running" | "paused",
  TimerNotificationAction[]
> = {
  running: [
    {
      title: "Pause",
      pressAction: {
        id: "pause",
      },
    },
  ],
  paused: [
    {
      title: "Resume",
      pressAction: {
        id: "resume",
      },
    },
    {
      title: "Reset",
      pressAction: {
        id: "reset",
      },
    },
    {
      title: "Close",
      pressAction: {
        id: "close",
      },
    },
  ],
}
