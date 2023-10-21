import { createContext, ReactNode, useEffect, useState } from "react"

import { useAudio } from "../hooks/useAudio"
import { useStorage } from "../services/storage"
import { AudioTitle } from "../utils/audios"

const PATH = "../assets/audios"

type BackgroundAudioContextValue = {
  storeAudio: (audio: string) => void
  loadAudio: (audio: string) => Promise<boolean>
  play: (isLooping?: boolean) => Promise<void>
  stop: () => Promise<void>
  audio: string
  isLoaded: boolean
}

export const BackgroundAudioContext = createContext(
  {} as BackgroundAudioContextValue
)

interface BackgroundAudioProviderProps {
  children: ReactNode
}

export function BackgroundAudioProvider({
  children,
}: BackgroundAudioProviderProps) {
  const { play, stop, loadAudioFile } = useAudio()
  const [audio, setAudio] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const storage = useStorage()

  function getAudio(audioTitle: AudioTitle) {
    switch (audioTitle) {
      case "forest":
        return require(`${PATH}/forest.mp3`)
      case "rain":
        return require(`${PATH}/rain.mp3`)
      case "cafe":
        return require(`${PATH}/cafe.mp3`)
      case "peace":
        return require(`${PATH}/peace.mp3`)
      case "ocean":
      default:
        return require(`${PATH}/ocean.mp3`)
    }
  }

  function storeAudio(audio: string) {
    setAudio(audio)
    storage.setAudio(String(audio))
  }

  async function loadAudio(audio: string) {
    if (!audio) return

    try {
      const isLoaded = await loadAudioFile(getAudio(audio as AudioTitle))

      setIsLoaded(isLoaded)
      return isLoaded
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const audio = storage.getAudio()
    loadAudio(audio)
  }, [])

  return (
    <BackgroundAudioContext.Provider
      value={{
        play,
        stop,
        loadAudio,
        storeAudio,
        audio,
        isLoaded,
      }}
    >
      {children}
    </BackgroundAudioContext.Provider>
  )
}
