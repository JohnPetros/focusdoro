import { useEffect, useState } from "react"
import { Dimensions } from "react-native"
import { useToastController } from "@tamagui/toast"
import { useLocalSearchParams, useRouter } from "expo-router"
import {
  Bell,
  CaretLeft,
  Icon,
  Pause,
  SmileyXEyes,
  Timer,
  Vibrate,
} from "phosphor-react-native"
import {
  Button as BackButton,
  H1,
  H2,
  Label,
  ScrollView,
  useTheme,
  XStack,
  YStack,
} from "tamagui"

import type { Feature, FeatureTitle } from "../../@types/feature"
import type { Task } from "../../@types/task"
import { Button } from "../../components/Button"
import { Checkbox } from "../../components/Checkbox"
import { NumberInput } from "../../components/NumberInput"
import { TextInput } from "../../components/TextInput"
import { storage } from "../../storage"
import { features as defaultFeatures } from "../../utils/features"

const { width } = Dimensions.get("window")

const PADDING_BETWEEN = 12
const INPUT_NUMBER_WIDTH = width / 3 - PADDING_BETWEEN * 2
const FEATURE_CHECKBOX_WIDTH = width

const featuresIcons: Record<FeatureTitle, Icon> = {
  vibration: Vibrate,
  "automatic breaks": Pause,
  "automatic sessions": Timer,
  "show notification": Bell,
}

export default function Settings() {
  const [task, setTask] = useState<Task | null>(null)
  const [taskTitle, setTaskTitle] = useState("")
  const [features, setFeatures] = useState<Feature[]>([])
  const { taskId } = useLocalSearchParams()
  const theme = useTheme()
  const router = useRouter()
  const toast = useToastController()

  function handleError(message: string) {
    toast.show(message, {
      icon: SmileyXEyes,
    })
  }

  function sortFeaturesByTitle(features: Feature[]) {
    return features.sort((a, b) => a.title.localeCompare(b.title))
  }

  function updateTask(updatedTask: Task) {
    try {
      setTask(updatedTask)
      storage.updateTask(updatedTask)
    } catch (error) {
      handleError(error.message)
    }
  }

  function handleFeatureCheckbox(featureTitle: FeatureTitle) {
    const feature = storage.getFeatureByTitle(featureTitle)
    storage.updateFeature({ ...feature, isActive: !feature.isActive })

    const uptadedFeatures = storage.getFeatures()
    setFeatures(sortFeaturesByTitle(uptadedFeatures))
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

  function handleTotalSessionsNumberInputChange(value: number) {
    const updatedTask: Task = {
      ...task,
      totalSessions: value,
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

  async function fetchFeatures() {
    try {
      const features = storage.getFeatures()
      if (features?.length) {
        setFeatures(sortFeaturesByTitle(features))
        return
      }

      setFeatures(sortFeaturesByTitle(defaultFeatures))
      storage.setFeatures(defaultFeatures)
    } catch (error) {
      handleError(error.message as string)
    }
  }

  useEffect(() => {
    fetchTask()
    fetchFeatures()
  }, [])

  if (task && features.length)
    return (
      <ScrollView>
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

          <YStack
            mt={24}
            alignItems="center"
          >
            <H2
              color="$blue12"
              fontSize={16}
            >
              Durations
            </H2>
            <XStack
              ai="center"
              gap={PADDING_BETWEEN}
            >
              <NumberInput
                minValue={1}
                maxValue={60}
                label="Session"
                value={task.sessionMinutes}
                width={INPUT_NUMBER_WIDTH}
                onChange={handleSessionNumberInputChange}
              />
              <NumberInput
                minValue={1}
                maxValue={60}
                label="Break"
                value={task.breakMinutes}
                width={INPUT_NUMBER_WIDTH}
                onChange={handleBreakNumberInputChange}
              />
              <NumberInput
                minValue={1}
                maxValue={60}
                label="Long break"
                value={task.longBreakMinutes}
                width={INPUT_NUMBER_WIDTH}
                onChange={handleLongBreakNumberInputChange}
              />
            </XStack>
          </YStack>

          <YStack
            mt={24}
            alignItems="center"
          >
            <H2
              color="$blue12"
              fontSize={16}
            >
              Other preferences
            </H2>
            <NumberInput
              minValue={1}
              maxValue={8}
              label="Sessions amount"
              unit="total"
              value={task.totalSessions}
              width={INPUT_NUMBER_WIDTH * 2}
              onChange={handleTotalSessionsNumberInputChange}
            />
          </YStack>
          <XStack
            gap={PADDING_BETWEEN}
            mt={24}
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
            mb={40}
          >
            {features.map((feature) => (
              <Checkbox
                key={String(feature.title)}
                id={String(feature.title)}
                label={feature.title}
                value={feature.title}
                isChecked={feature.isActive}
                icon={featuresIcons[feature.title]}
                onCheck={(value) =>
                  handleFeatureCheckbox(value as FeatureTitle)
                }
                width={FEATURE_CHECKBOX_WIDTH}
              />
            ))}
          </XStack>
          <XStack mt="auto">
            <Button onPress={handlePlayPomodoroButton}>Play Pomodoro</Button>
          </XStack>
        </YStack>
      </ScrollView>
    )
}
