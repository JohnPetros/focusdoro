import { useState } from "react"
import { Audio } from "expo-av"

type Sound = Audio.Sound | null

export function useAudio() {
  const [sound, setSound] = useState<Sound>(null)

  async function loadAudioUri(uri: string) {
    if (sound) {
      await sound.unloadAsync()
    }

    const newSound = new Audio.Sound()

    await newSound.loadAsync({
      uri,
    })

    setSound(newSound)

    return newSound._loaded
  }

  async function stop() {
    if (sound?._loaded) {
      await Promise.all([sound.stopAsync()])
    }
  }

  async function play(isLooping = true) {
    console.log(sound?._loaded)

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
