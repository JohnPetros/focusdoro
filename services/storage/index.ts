import { MMKV } from "react-native-mmkv"

import { audioStorage } from "./audioStorage"
import { featuresStorage } from "./featuresStorage"
import { tasksStorage } from "./tasksStorage"
import { weeklyChartStorage } from "./weeklyChartStorage"

const mmkvStorage = new MMKV({ id: "focusdoro" })

export function useStorage() {
  return {
    ...featuresStorage(mmkvStorage),
    ...tasksStorage(mmkvStorage),
    ...audioStorage(mmkvStorage),
    ...weeklyChartStorage(mmkvStorage),
  }
}
