import { MMKV } from "react-native-mmkv"

import { IAudioStorage } from "./interfaces/IAudioStorage"
import { AUDIO_KEY } from "./keys"

export const audioStorage = (storage: MMKV): IAudioStorage => ({
  getAudio() {
    return storage.getString(AUDIO_KEY)
  },

  setAudio(audio) {
    storage.set(AUDIO_KEY, audio)
  },
})
