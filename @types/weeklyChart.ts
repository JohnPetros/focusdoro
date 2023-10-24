export type Weekday = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat"

export type WeekdayChart = {
  weekday: Weekday
  value: number
}

export type WeeklyChart = {
  shouldReset: boolean
  weekdays: WeekdayChart[]
}
