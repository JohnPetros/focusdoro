export type Task = {
  id: string
  title: string
  completedSessions: number
  totalSessions: number
  sessionMinutes: number
  breakMinutes: number
  longBreakMinutes: number
  isBreak: boolean
  isLongBreak: boolean
  isSelected: boolean
}
