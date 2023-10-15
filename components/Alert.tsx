import { useEffect } from "react"
import { AlertDialog } from "@tamagui/alert-dialog"
import { Button, XStack } from "tamagui"

interface AlertProps {
  title: string
  description: string
  onCancel: () => void
  onConfirm: () => void
}

export const AlertRoot = AlertDialog
export const AlertTrigger = AlertDialog.Trigger

export function AlertContent({
  title,
  description,
  onCancel,
  onConfirm,
}: AlertProps) {
  function handleFocus() {
    console.log("oi")
  }

  useEffect(() => {
    console.log("oi")
  }, [])

  return (
    <AlertDialog.Portal>
      <AlertDialog.Overlay
        key="overlay"
        animation="quick"
        opacity={0.5}
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <AlertDialog.Content
        bordered
        elevate
        key="content"
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
        scale={1}
        opacity={1}
        x={0}
        y={0}
        onFocus={handleFocus}
        // backgroundColor="$blue10"
      >
        <AlertDialog.Title
          fontSize={16}
          textTransform="uppercase"
          color="$blue12"
        >
          {title}
        </AlertDialog.Title>
        <AlertDialog.Description color="$blue12">
          {description}
        </AlertDialog.Description>
        <XStack
          gap={12}
          mt={16}
        >
          <AlertDialog.Action asChild>
            <Button
              onPress={onConfirm}
              bc="$red10"
              flex={1}
            >
              Yes
            </Button>
          </AlertDialog.Action>
          <AlertDialog.Cancel asChild>
            <Button
              bc="$blue8"
              flex={1}
              onPress={onCancel}
            >
              Cancel
            </Button>
          </AlertDialog.Cancel>
        </XStack>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  )
}