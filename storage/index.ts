import { MMKV } from "react-native-mmkv"

import { audio } from "./audio"
import { features } from "./features"
import { tasks } from "./tasks"

const mmkvStorage = new MMKV({ id: "focusdoro" })

export const storage = {
  ...features(mmkvStorage),
  ...tasks(mmkvStorage),
  ...audio(mmkvStorage),
}
