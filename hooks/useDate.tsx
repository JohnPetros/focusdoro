import { Weekday } from "../@types/weeklyChart"

const WEEKDAYS: Weekday[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function useDate() {
  function getTodayDate() {
    return new Date()
  }

  function getTodayWeekday() {
    const todayWeekNumber = getTodayDate().getDay()
    return WEEKDAYS[todayWeekNumber]
  }

  function getMonthWeekDays(): number[] {
    const today = getTodayDate()
    const todayWeekNumber = today.getDay()
    const monthToday = today.getDate()

    const monthSundayDay = monthToday - todayWeekNumber
    const monthSaturdayDay = monthSundayDay + 7

    const days = []
    for (let day = monthSundayDay; day < monthSaturdayDay; day++) {
      days.push(day)
    }

    return days
  }

  function formatTime(time: number) {
    return String(time).padStart(2, "0")
  }

  function convertSecondsToTime(seconds: number, canJoin = false) {
    const minutesValue = Math.floor(seconds / 60)
    const secondsValue = seconds % 60

    if (canJoin) {
      return `${formatTime(minutesValue)}:${formatTime(secondsValue)}`
    }

    if (minutesValue > 1) {
      return `${minutesValue} minutes`
    }

    return `${seconds} seconds`
  }

  return {
    getTodayDate,
    getMonthWeekDays,
    getTodayWeekday,
    formatTime,
    convertSecondsToTime,
  }
}
