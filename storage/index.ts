import { MMKV } from "react-native-mmkv"

import { audioStorage } from "./audioStorage"
import { featuresStorage } from "./featuresStorage"
import { tasksStorage } from "./tasksStorage"

const mmkvStorage = new MMKV({ id: "focusdoro" })

export const storage = {
  ...featuresStorage(mmkvStorage),
  ...tasksStorage(mmkvStorage),
  ...audioStorage(mmkvStorage),
}
