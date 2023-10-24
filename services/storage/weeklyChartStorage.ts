import { MMKV } from "react-native-mmkv"

import { Weekday, WeekdayChart, WeeklyChart } from "../../@types/weeklyChart"
import { DEFAULT_WEEKLY_CHART } from "../../utils/default-weekly-chart"

import { IWeeklyStorage } from "./interfaces/IWeeklyChartStorage"
import { WEEKLY_CHART_KEY } from "./keys"

export const weeklyChartStorage = (storage: MMKV): IWeeklyStorage => ({
  setWeeklyChart(weeklyChart: WeeklyChart) {
    storage.set(WEEKLY_CHART_KEY, JSON.stringify(weeklyChart))
  },

  getWeeklyChart(): WeeklyChart {
    const weeklyChart = storage.getString(WEEKLY_CHART_KEY)
    if (weeklyChart) return JSON.parse(weeklyChart)
  },

  getWeekdayChartByWeekday(weekday: Weekday): WeekdayChart {
    const weeklyChart: WeeklyChart = this.getWeeklyChart()

    if (weeklyChart)
      return weeklyChart.weekdays.find((chart) => chart.weekday === weekday)
  },

  resetWeeklyChart() {
    this.setWeeklyChart(DEFAULT_WEEKLY_CHART)
  },

  toggleShouldReset() {
    const weeklyChart: WeeklyChart = this.getWeeklyChart()

    if (weeklyChart) {
      this.setWeeklyChart({
        ...weeklyChart,
        shouldReset: !weeklyChart.shouldReset,
      })
    }
  },

  updateWeeklyChart(weekdayChart: WeekdayChart) {
    const weeklyChart: WeeklyChart = this.getWeeklyChart()

    if (weeklyChart) {
      const currentWeekdayCharts = weeklyChart.weekdays.filter(
        (chart: WeekdayChart) => chart.weekday !== weekdayChart.weekday
      )

      const updatedWeekdayCharts = [...currentWeekdayCharts, weekdayChart]

      const updatedWeeklyChart: WeeklyChart = {
        ...weeklyChart,
        weekdays: updatedWeekdayCharts,
      }

      this.setWeeklyChart(updatedWeeklyChart)
    }
  },
})
