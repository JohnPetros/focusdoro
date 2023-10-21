import { createContext, ReactNode, useEffect, useState } from "react"

import { useAudio } from "../hooks/useAudio"
import { useStorage } from "../services/storage"
import { AUDIOS } from "../utils/audios"

type BackgroundAudioContextValue = {
  storeAudio: (audio: string) => void
  loadAudioUri: (uri: string) => Promise<boolean>
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
  const { play, stop, loadAudioUri } = useAudio()
  const [audio, setAudio] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const storage = useStorage()

  function storeAudio(audio: string) {
    setAudio(audio)
    storage.setAudio(audio)
  }

  async function loadAudio() {
    const audio = storage.getAudio() ?? AUDIOS[0].file

    setAudio(audio)
    const isLoaded = await loadAudioUri(audio)
    setIsLoaded(isLoaded)
  }

  useEffect(() => {
    loadAudio()
  }, [])

  return (
    <BackgroundAudioContext.Provider
      value={{
        play,
        stop,
        loadAudioUri,
        storeAudio,
        audio,
        isLoaded,
      }}
    >
      {children}
    </BackgroundAudioContext.Provider>
  )
}
