import { Event } from "@notifee/react-native"

import { TimerNotificationAction } from "../../../@types/timer-notification-action"

interface UpdateTimerParams {
  title: string
  progress: number
  actions: TimerNotificationAction[]
  time: string
}
export interface ITimerNotification {
  displayTimer(taskId: string): Promise<void>
  updateTimer({
    title,
    actions,
    progress,
    time,
  }: UpdateTimerParams): Promise<void>
  cancelTimer(): Promise<void>
  onTimerAction(callback: (notificationEvent: Event) => void): void
}
