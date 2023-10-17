import { MMKV } from "react-native-mmkv"

import { AudioStorage } from "./interfaces/audioStorage"
import { AUDIO_KEY } from "./keys"

export const audio = (storage: MMKV): AudioStorage => ({
  getAudio() {
    return storage.getString(AUDIO_KEY)
  },

  setAudio(audio) {
    storage.set(AUDIO_KEY, audio)
  },
})
