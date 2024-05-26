import { useEffect, useState } from "react"
import { useRouter } from "expo-router/src/hooks"
import { Gear, House, SpeakerHigh, SpeakerSlash } from "phosphor-react-native"
import { XStack } from "tamagui"

import { useBackgroundAudio } from "../hooks/useBackgroundAudio"
import { useFeatures } from "../hooks/useFeatures"
import { useTimerStore } from "../hooks/useTimerStore"

import { AudioModal, AudioModalContent, AudioModalTrigger } from "./AudioModal"
import { TaskControlButton } from "./TaskControlButton"

interface TaskControlsProps {
  taskId: string
}

export function TaskControls({ taskId }: TaskControlsProps) {
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false)
  const router = useRouter()
  const {
    state: { isPaused },
    action: { setIsPaused },
  } = useTimerStore()
  const { stop } = useBackgroundAudio()
  const {
    features: [audioFeature],
  } = useFeatures(["background sound"])

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
      stop()
      return
    }

    setIsPaused(false)
  }, [isAudioModalOpen])

  if (isPaused)
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
              icon={audioFeature?.isActive ? SpeakerHigh : SpeakerSlash}
              isDisabled={!audioFeature?.isActive}
            />
          </AudioModalTrigger>

          <AudioModalContent setIsModalOpen={setIsAudioModalOpen} />
        </AudioModal>
      </XStack>
    )
}
