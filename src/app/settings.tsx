import { InputNumber } from '../components/InputNumber'
import { Dimensions } from 'react-native'
import { Button, H1, XStack, YStack } from 'tamagui'

const { width } = Dimensions.get('window')

const PADDING_BETWEEN = 12
const INPUT_NUMBER_WIDTH = width / 3 - PADDING_BETWEEN * 2

export default function Settings() {
  return (
    <YStack position="relative" f={1} bc="$blue2" pt={40} px={24}>
      <H1 fontSize={24} letterSpacing={1.1}>
        Task Settings
      </H1>
      <XStack ai="center" gap={PADDING_BETWEEN}>
        <InputNumber
          minValue={0}
          maxValue={60}
          label="Session"
          value={3}
          width={INPUT_NUMBER_WIDTH}
        />
        <InputNumber
          minValue={0}
          maxValue={60}
          label="Break"
          value={3}
          width={INPUT_NUMBER_WIDTH}
        />
        <InputNumber
          minValue={0}
          maxValue={60}
          label="Long break"
          value={3}
          width={INPUT_NUMBER_WIDTH}
        />
      </XStack>
    </YStack>
  )
}
