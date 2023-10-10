import { AlertDialog } from '@tamagui/alert-dialog'
import { Button } from 'tamagui'

interface AlertProps {
  title: string
  description: string
  onOpen: () => void
  onConfirm: () => void
}

export const AlertRoot = AlertDialog
export const AlertTrigger = AlertDialog.Trigger

export function AlertContent({
  title,
  description,
  onOpen,
  onConfirm,
}: AlertProps) {
  function handleFocus() {
    console.log('oi')
  }

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
          'quick',
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
        <AlertDialog.Description marginTop={16} color="$blue12">
          {description}
        </AlertDialog.Description>
        <AlertDialog.Action asChild>
          <Button onPress={onConfirm} bc="$red10">
            Yes
          </Button>
        </AlertDialog.Action>
        <AlertDialog.Cancel>
          <Button bc="$blue8">Cancel</Button>
        </AlertDialog.Cancel>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  )
}
