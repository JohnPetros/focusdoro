import { useState } from "react"
import { Audio } from "expo-av"

type Sound = Audio.Sound | null

export function useAudio() {
  const [sound, setSound] = useState<Sound>(null)

  async function loadAudioUri(uri: string) {
    await stop()
    const sound = new Audio.Sound()

    await sound.loadAsync({
      uri,
    })

    setSound(sound)

    return sound._loaded
  }

  async function stop() {
    if (sound?._loaded) {
      await Promise.all([sound.stopAsync(), sound.unloadAsync()])
    }
  }

  async function play(isLooping = true) {
    if (sound?._loaded)
      await Promise.all([
        sound.setIsLoopingAsync(isLooping),
        sound.setPositionAsync(0),
        sound.playAsync(),
      ])
  }

  return {
    play,
    stop,
    loadAudioUri,
  }
}
