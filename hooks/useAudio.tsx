import { useState } from "react"
import { Audio, AVPlaybackSource } from "expo-av"

type Sound = Audio.Sound | null

export function useAudio() {
  const [sound, setSound] = useState<Sound>(null)

  async function loadAudioFile(audio: AVPlaybackSource) {
    if (sound) {
      await sound.unloadAsync()
    }

    const { sound: newSound } = await Audio.Sound.createAsync(audio)

    setSound(newSound)

    return newSound._loaded
  }

  async function stop() {
    if (sound?._loaded) {
      await sound.stopAsync()
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
    loadAudioFile,
  }
}
