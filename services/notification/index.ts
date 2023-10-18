import { timerNotification } from "./timerNotification"

export function useNotification() {
  return {
    ...timerNotification(),
  }
}
