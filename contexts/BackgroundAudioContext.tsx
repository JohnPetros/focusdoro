import { createContext, ReactNode, useEffect, useState } from "react"

import { useAudio } from "../hooks/useAudio"
import { storage } from "../storage"

type BackgroundAudioContextValue = {
  storeAudio: (audio: string) => void
  loadAudioUri: (uri: string) => Promise<boolean>
  play: (isLooping?: boolean) => Promise<void>
  stop: () => Promise<void>
  audio: string
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

  function storeAudio(audio: string) {
    setAudio(audio)
    storage.setAudio(audio)
  }

  useEffect(() => {
    const audio = storage.getAudio()
    setAudio(audio)
  }, [])

  return (
    <BackgroundAudioContext.Provider
      value={{
        play,
        stop,
        loadAudioUri,
        storeAudio,
        audio,
      }}
    >
      {children}
    </BackgroundAudioContext.Provider>
  )
}
