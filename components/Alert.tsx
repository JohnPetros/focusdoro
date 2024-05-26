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
  return (
    <AlertDialog.Portal>
      <AlertDialog.Overlay
        key="overlay"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
        opacity={0.5}
      />
      <AlertDialog.Content
        testID="alert"
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
        backgroundColor="$blue2"
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
              testID="alert-confirm"
              onPress={onConfirm}
              bc="$red10"
              flex={1}
            >
              Yes
            </Button>
          </AlertDialog.Action>
          <AlertDialog.Cancel asChild>
            <Button
              testID="alert-cancel"
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
