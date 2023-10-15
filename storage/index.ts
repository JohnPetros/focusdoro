import { MMKV } from "react-native-mmkv"

import { tasks } from "./tasks"

const mmkvStorage = new MMKV({ id: "focusdoro" })

export const storage = {
  ...tasks(mmkvStorage),
}
