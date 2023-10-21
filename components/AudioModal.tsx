import { useEffect, useRef, useState } from "react"
import { Dimensions } from "react-native"
import { Dialog } from "@tamagui/dialog"
import { X } from "phosphor-react-native"
import { useTheme, XStack } from "tamagui"

import { useBackgroundAudio } from "../hooks/useBackgroundAudio"
import { AUDIOS } from "../utils/audios"

import { Button } from "./Button"
import { Checkbox } from "./Checkbox"
import { RoundButton } from "./RoundButton"

const { width } = Dimensions.get("window")

const MODAL_WIDTH = width - 48
const PADDING_BETWEEN = 24
const CHECKBOX_WIDTH = MODAL_WIDTH / 2 - PADDING_BETWEEN * 2

export const AudioModal = Dialog
export const AudioModalTrigger = Dialog.Trigger

interface AudioModalContentProps {
  setIsModalOpen: (isOPen: boolean) => void
}

export function AudioModalContent({ setIsModalOpen }: AudioModalContentProps) {
  const { audio, storeAudio, loadAudio } = useBackgroundAudio()
  const [selectedAudio, setSelectedAudio] = useState(audio)
  const [isAudioLoading, setIsAudioLoading] = useState(false)
  const [isAudioLoaded, setIsAudioLoaded] = useState(false)
  const theme = useTheme()
  const originalSelectedAudio = useRef(selectedAudio)

  function close() {
    setIsModalOpen(false)
  }

  async function handleAudioCheckboxChange(audio: string) {
    setSelectedAudio(audio)
    storeAudio(audio)
    setIsAudioLoaded(false)
  }

  async function handlePlayAudio() {
    if (selectedAudio === originalSelectedAudio.current) {
      close()
      return
    }

    try {
      setIsAudioLoading(true)

      const isLoaded = await loadAudio(selectedAudio)
      console.log(isLoaded)

      setIsAudioLoaded(isLoaded)
    } catch (error) {
      console.error(error)
    } finally {
      setIsAudioLoading(false)
    }
  }

  function handleOpen() {
    originalSelectedAudio.current = selectedAudio
  }

  useEffect(() => {
    if (isAudioLoaded) {
      close()
    }
  }, [isAudioLoaded])

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          opacity={0.7}
          backgroundColor="$blue2"
          onLayout={handleOpen}
        />
        <Dialog.Content
          forceMount={true}
          bordered
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          w={MODAL_WIDTH}
          bg="$blue2"
        >
          <XStack
            alignItems="center"
            justifyContent="space-between"
          >
            <Dialog.Title fontSize={18}>Play sound during session</Dialog.Title>
            <Dialog.Close>
              <RoundButton
                shadowColor={theme.blue8.val}
                size="$2"
                radius={12}
                icon={
                  <X
                    color={theme.blue12.val}
                    size={24}
                  />
                }
                bg="$blue10"
                aria-label="Close modal"
                onPress={handlePlayAudio}
                disabled={isAudioLoading}
              />
            </Dialog.Close>
          </XStack>

          <XStack
            gap={PADDING_BETWEEN}
            mt={24}
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
          >
            {AUDIOS.map((audio) => (
              <Checkbox
                key={audio.title}
                id={audio.title}
                label={audio.title}
                value={audio.title}
                isChecked={audio.title === selectedAudio}
                icon={audio.icon}
                width={CHECKBOX_WIDTH}
                onCheck={handleAudioCheckboxChange}
              />
            ))}
          </XStack>
          <Dialog.Close mt={24}>
            <Button
              disabled={isAudioLoading}
              onPress={handlePlayAudio}
              opacity={isAudioLoading ? 0.5 : 1}
            >
              {isAudioLoading ? "loading audio..." : "play audio"}
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  )
}
