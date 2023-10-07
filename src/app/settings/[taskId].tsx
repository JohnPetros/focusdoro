import { NumberInput } from '../../components/NumberInput'
import { useState, useEffect } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Dimensions } from 'react-native'

import { Button, H1, Label, XStack, YStack, useTheme } from 'tamagui'
import { TextInput } from '../../components/TextInput'
import { CaretLeft } from 'phosphor-react-native'

import { storage } from '../../storage'

import type { Task } from '../../@types/task'

const { width } = Dimensions.get('window')

const PADDING_BETWEEN = 12
const INPUT_NUMBER_WIDTH = width / 3 - PADDING_BETWEEN * 2

export default function Settings() {
  const [task, setTask] = useState<Task | null>(null)
  const [taskTitle, setTaskTitle] = useState('')
  const { taskId } = useLocalSearchParams()
  const theme = useTheme()
  const router = useRouter()

  function handleBackButton() {
    router.back()
  }

  async function handleTaskTitleInputBlur() {
    if (task) await storage.saveTask(task)
  }

  async function fetchTask() {
    try {
      const task = await storage.getTask(String(taskId))
      if (task) {
        setTask(task)
        setTaskTitle(task.title)
      }
    } catch (error) {}
  }

  useEffect(() => {
    fetchTask()
  }, [])

  if (task)
    return (
      <YStack position="relative" f={1} bc="$blue2" pt={40} px={24}>
        <XStack ai="center" gap={12}>
          <Button unstyled ai="center" jc="center" onPress={handleBackButton}>
            <CaretLeft color={theme.blue12.val} weight="bold" />
          </Button>
          <H1 fontSize={24} letterSpacing={1.1}>
            Task Settings
          </H1>
        </XStack>
        <YStack mt={12}>
          <Label fontSize={16}>Title</Label>
          <TextInput
            value={taskTitle}
            onChangeText={setTaskTitle}
            onBlur={handleTaskTitleInputBlur}
            w="100%"
            mt={4}
          />
        </YStack>

        <XStack ai="center" gap={PADDING_BETWEEN} mt={24}>
          <NumberInput
            minValue={0}
            maxValue={60}
            label="Session"
            value={task.sessionMinutes}
            width={INPUT_NUMBER_WIDTH}
          />
          <NumberInput
            minValue={0}
            maxValue={60}
            label="Break"
            value={task.breakMinutes}
            width={INPUT_NUMBER_WIDTH}
          />
          <NumberInput
            minValue={0}
            maxValue={60}
            label="Long break"
            value={task.longBreakMinutes}
            width={INPUT_NUMBER_WIDTH}
          />
        </XStack>
      </YStack>
    )
}
