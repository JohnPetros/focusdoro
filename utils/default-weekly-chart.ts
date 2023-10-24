import { WeeklyChart } from "../@types/weeklyChart"

export const DEFAULT_WEEKLY_CHART: WeeklyChart = {
  shouldReset: false,
  weekdays: [
    {
      weekday: "Sun",
      value: 0,
    },
    {
      weekday: "Mon",
      value: 0,
    },
    {
      weekday: "Tue",
      value: 0,
    },
    {
      weekday: "Wed",
      value: 0,
    },
    {
      weekday: "Thu",
      value: 0,
    },
    {
      weekday: "Fri",
      value: 0,
    },
    {
      weekday: "Sat",
      value: 0,
    },
  ],
}
