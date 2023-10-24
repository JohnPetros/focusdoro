import { Weekday, WeekdayChart, WeeklyChart } from "../../../@types/weeklyChart"

export interface IWeeklyStorage {
  setWeeklyChart(weeklyChart: WeeklyChart): void
  resetWeeklyChart(): void
  toggleShouldReset(): void
  updateWeeklyChart(weekdayChart: WeekdayChart): void
  getWeeklyChart(): WeeklyChart
  getWeekdayChartByWeekday(weekday: Weekday): WeekdayChart
}
