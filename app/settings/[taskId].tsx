import { useEffect, useState } from "react"
import { Dimensions } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { CaretLeft } from "phosphor-react-native"
import {
  Button as BackButton,
  H1,
  Label,
  useTheme,
  XStack,
  YStack,
} from "tamagui"

import type { Task } from "../../@types/task"
import { Button } from "../../components/Button"
import { NumberInput } from "../../components/NumberInput"
import { TextInput } from "../../components/TextInput"
import { storage } from "../../storage"

const { width } = Dimensions.get("window")

const PADDING_BETWEEN = 12
const INPUT_NUMBER_WIDTH = width / 3 - PADDING_BETWEEN * 2

export default function Settings() {
  const [task, setTask] = useState<Task | null>(null)
  const [taskTitle, setTaskTitle] = useState("")
  const { taskId } = useLocalSearchParams()
  const theme = useTheme()
  const router = useRouter()

  function handleError(error: string) {}

  function updateTask(updatedTask: Task) {
    try {
      setTask(updatedTask)
      storage.updateTask(updatedTask)
    } catch (error) {
      handleError(error.message)
    }
  }

  function handleBackButton() {
    router.back()
  }

  function handlePlayPomodoroButton() {
    router.push("/pomodoro/" + taskId)
  }

  function handleSessionNumberInputChange(value: number) {
    const updatedTask: Task = {
      ...task,
      sessionMinutes: value,
    }

    updateTask(updatedTask)
  }

  function handleBreakNumberInputChange(value: number) {
    const updatedTask: Task = {
      ...task,
      breakMinutes: value,
    }

    updateTask(updatedTask)
  }

  function handleLongBreakNumberInputChange(value: number) {
    const updatedTask: Task = {
      ...task,
      longBreakMinutes: value,
    }

    updateTask(updatedTask)
  }

  function handleTaskTitleInputChange(title: string) {
    setTaskTitle(title)
    const updatedTask: Task = {
      ...task,
      title,
    }

    updateTask(updatedTask)
  }

  async function fetchTask() {
    try {
      const task = storage.getTask(String(taskId))
      if (task) {
        setTask(task)
        setTaskTitle(task.title)
      }
    } catch (error) {
      handleError(error.message as string)
    }
  }

  useEffect(() => {
    fetchTask()
  }, [])

  if (task)
    return (
      <YStack
        position="relative"
        flex={1}
        bc="$blue2"
      >
        <XStack
          ai="center"
          gap={12}
        >
          <BackButton
            unstyled
            ai="center"
            jc="center"
            onPress={handleBackButton}
          >
            <CaretLeft
              color={theme.blue12.val}
              weight="bold"
            />
          </BackButton>
          <H1
            fontSize={24}
            letterSpacing={1.1}
          >
            Task Settings
          </H1>
        </XStack>
        <YStack
          mt={12}
          gap={8}
        >
          <Label fontSize={16}>Title</Label>
          <TextInput
            value={taskTitle}
            onChangeText={handleTaskTitleInputChange}
            w="100%"
          />
        </YStack>

        <XStack
          ai="center"
          gap={PADDING_BETWEEN}
          mt={24}
        >
          <NumberInput
            minValue={0}
            maxValue={60}
            label="Session"
            value={task.sessionMinutes}
            width={INPUT_NUMBER_WIDTH}
            onChange={handleSessionNumberInputChange}
          />
          <NumberInput
            minValue={0}
            maxValue={60}
            label="Break"
            value={task.breakMinutes}
            width={INPUT_NUMBER_WIDTH}
            onChange={handleBreakNumberInputChange}
          />
          <NumberInput
            minValue={0}
            maxValue={60}
            label="Long break"
            value={task.longBreakMinutes}
            width={INPUT_NUMBER_WIDTH}
            onChange={handleLongBreakNumberInputChange}
          />
        </XStack>
        <XStack mt="auto">
          <Button onPress={handlePlayPomodoroButton}>Play Pomodoro</Button>
        </XStack>
      </YStack>
    )
}
