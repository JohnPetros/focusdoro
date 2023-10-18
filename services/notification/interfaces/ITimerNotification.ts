import { TimerNotificationAction } from "../../../@types/timer-notification-action"

interface UpdateTimerParams {
  title: string
  progress: number
  actions: TimerNotificationAction[]
}
export interface ITimerNotification {
  displayTimer(taskId: string): Promise<void>
  updateTimer({ title, actions }: UpdateTimerParams): Promise<void>
}
