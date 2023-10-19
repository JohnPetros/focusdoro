export type TimerNotificationActionType = "pause" | "resume" | "reset" | "close"

export type TimerNotificationAction = {
  title: string
  pressAction: {
    id: TimerNotificationActionType
  }
}
