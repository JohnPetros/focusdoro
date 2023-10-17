import { MMKV } from "react-native-mmkv"

import { audio } from "./audio"
import { tasks } from "./tasks"

const mmkvStorage = new MMKV({ id: "focusdoro" })

export const storage = {
  ...tasks(mmkvStorage),
  ...audio(mmkvStorage),
}
