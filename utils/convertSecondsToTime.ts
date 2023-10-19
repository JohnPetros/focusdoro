import { formatTime } from "./formatTime"

export function convertSecondsToTime(seconds: number, canJoin = false) {
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
