import { useContext } from "react"

import { BackgroundAudioContext } from "../contexts/BackgroundAudioContext"

export function useBackgroundAudio() {
  const context = useContext(BackgroundAudioContext)

  if (!context) {
    throw new Error(
      "useBackgroundAudio must be used inside BackgroundAudioContext"
    )
  }

  return context
}
