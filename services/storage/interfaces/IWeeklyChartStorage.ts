import { Weekday, WeekdayChart, WeeklyChart } from "../../../@types/weeklyChart"

export interface IWeeklyStorage {
  setWeeklyChart(weeklyChart: WeeklyChart): void
  toggleShouldReset(): void
  updateWeeklyChart(weekdayChart: WeekdayChart): void
  getWeeklyChart(): WeeklyChart
  getWeekdayChartByWeekday(weekday: Weekday): WeekdayChart
}
