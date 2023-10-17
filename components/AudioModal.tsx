import { useEffect, useState } from "react"
import { Dimensions } from "react-native"
import { Dialog } from "@tamagui/dialog"
import { X } from "phosphor-react-native"
import { useTheme, XStack } from "tamagui"

import { useBackgroundAudio } from "../hooks/useBackgroundAudio"
import { audios } from "../utils/audios"

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
  const theme = useTheme()
  const { audio, storeAudio, loadAudioUri, play } = useBackgroundAudio()
  const [selectedAudioFile, setSelectedAudioFile] = useState(audio)
  const [isAudioLoading, setIsAudioLoading] = useState(false)
  const [isAudioLoaded, setIsAudioLoaded] = useState(false)

  function close() {
    setIsModalOpen(false)
  }

  async function handleAudioCheckboxChange(audioFile: string) {
    setSelectedAudioFile(audioFile)
    storeAudio(audioFile)
  }

  async function handlePlayAudio() {
    try {
      setIsAudioLoaded(false)
      setIsAudioLoading(true)

      const isLoaded = await loadAudioUri(selectedAudioFile)
      setIsAudioLoaded(isLoaded)
    } catch (error) {
      console.error(error)
    } finally {
      setIsAudioLoading(false)
    }
  }

  useEffect(() => {
    if (isAudioLoaded) {
      play()
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
        />
        <Dialog.Content
          forceMount
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
            <Dialog.Title fontSize={20}>
              Play background sound during session
            </Dialog.Title>
            <Dialog.Close asChild>
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
                onPress={close}
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
            {audios.map((audio) => (
              <Checkbox
                key={audio.title}
                id={audio.title}
                label={audio.title}
                value={audio.file}
                isChecked={audio.file === selectedAudioFile}
                icon={audio.icon}
                width={CHECKBOX_WIDTH}
                onCheck={handleAudioCheckboxChange}
              />
            ))}
          </XStack>
          <Dialog.Close
            asChild
            mt={24}
          >
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
