import { useState } from "react"
import { Dimensions } from "react-native"
import { Dialog } from "@tamagui/dialog"
import { Coffee, Tree, X } from "phosphor-react-native"
import { useTheme, XStack } from "tamagui"

import { Button } from "./Button"
import { Checkbox } from "./Checkbox"
import { RoundButton } from "./RoundButton"

const { width } = Dimensions.get("window")

const PADDING_BETWEEN = 24
const CHECKBOX_WIDTH = width / 2 - PADDING_BETWEEN * 2

export const AudioModal = Dialog
export const AudioModalTrigger = Dialog.Trigger

export function AudioModalContent() {
  const theme = useTheme()
  const [selectedAudio, setSelectedAudio] = useState("forest")

  function handleAudioCheckboxChange(audio: string) {
    console.log(audio)
    setSelectedAudio(audio)
  }

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          opacity={0.4}
          backgroundColor="$blue2"
        />
        <Dialog.Content
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
        >
          <XStack
            alignItems="center"
            justifyContent="space-between"
          >
            <Dialog.Title fontSize={20}>Play sound during session</Dialog.Title>
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
              />
            </Dialog.Close>
          </XStack>

          <XStack
            gap={PADDING_BETWEEN}
            mt={24}
          >
            <Checkbox
              id="forest"
              label="forest"
              isChecked={"forest" === selectedAudio}
              icon={Tree}
              width={CHECKBOX_WIDTH}
              onCheck={handleAudioCheckboxChange}
            />
            <Checkbox
              id="coffee"
              label="coffee"
              isChecked={"coffee" === selectedAudio}
              icon={Coffee}
              width={CHECKBOX_WIDTH}
              onCheck={handleAudioCheckboxChange}
            />
          </XStack>
          <Dialog.Close asChild>
            <Button>Play audio</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  )
}
