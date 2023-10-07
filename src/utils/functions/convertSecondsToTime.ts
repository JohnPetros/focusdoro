export function convertSecondsToTime(seconds: number) {
  const minutesValue = Math.floor(seconds / 60)

  if (minutesValue > 1) {
    return `${minutesValue} minutes`
  }

  return `${seconds} seconds`
}
