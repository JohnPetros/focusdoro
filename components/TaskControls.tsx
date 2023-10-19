import { useEffect, useState } from "react"
import { useRouter } from "expo-router/src/hooks"
import { Gear, House, MusicNotes } from "phosphor-react-native"
import { XStack } from "tamagui"

import type { Feature } from "../@types/feature"
import { useBackgroundAudio } from "../hooks/useBackgroundAudio"
import { useFeatures } from "../hooks/useFeatures"
import { useTimerStore } from "../hooks/useTimerStore"

import { AudioModal, AudioModalContent, AudioModalTrigger } from "./AudioModal"
import { TaskControlButton } from "./TaskControlButton"

interface TaskControls {
  taskId: string
}

export function TaskControls({ taskId }: TaskControls) {
  const [audioFeature, setAudioFeature] = useState<Feature | null>(null)
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false)
  const router = useRouter()
  const {
    action: { setIsPaused },
  } = useTimerStore()
  const { stop } = useBackgroundAudio()
  const { getFeatureByTitle } = useFeatures()

  function handleSettingsButton() {
    router.push("/settings/" + taskId)
  }

  function handleHomeButton() {
    router.push("/")
  }

  function handleAudioModal() {
    setIsAudioModalOpen(true)
  }

  useEffect(() => {
    if (isAudioModalOpen) {
      setIsPaused(true)
      stop()
      return
    }
    setIsPaused(false)
  }, [isAudioModalOpen])

  useEffect(() => {
    setAudioFeature(getFeatureByTitle("background sound"))
  }, [])

  return (
    <XStack
      w="100%"
      mt={20}
      mr={20}
      ai="center"
      jc="flex-end"
      gap={20}
      zIndex={50}
      enterStyle={{ opacity: 0 }}
      exitStyle={{ opacity: 0 }}
      opacity={1}
      animation="lazy"
    >
      <TaskControlButton
        label="Open task settings"
        onPress={handleSettingsButton}
        icon={Gear}
      />
      <TaskControlButton
        label="Go back to home"
        onPress={handleHomeButton}
        icon={House}
      />

      <AudioModal open={isAudioModalOpen}>
        <AudioModalTrigger>
          <TaskControlButton
            label="Open audio modal"
            onPress={handleAudioModal}
            icon={MusicNotes}
          />
        </AudioModalTrigger>

        <AudioModalContent setIsModalOpen={setIsAudioModalOpen} />
      </AudioModal>
    </XStack>
  )
}
