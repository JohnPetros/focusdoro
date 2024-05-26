import { useCallback, useRef, useState } from "react"
import { FlatList, TextInput as TextInputRef } from "react-native"
import { Swipeable } from "react-native-gesture-handler"
import uuid from "react-native-uuid"
import { useToastController } from "@tamagui/toast"
import { useFocusEffect, useRouter } from "expo-router"
import { Notepad, Play, Plus, SmileyXEyes, Trash } from "phosphor-react-native"
import { Button, H2, useTheme, View, XStack, YStack } from "tamagui"
import { Text } from "tamagui"

import type { Task } from "../@types/task"
import { AlertContent, AlertRoot, AlertTrigger } from "../components/Alert"
import { RoundButton } from "../components/RoundButton"
import { TaskCard } from "../components/TaskCard"
import { TextInput } from "../components/TextInput"
import { WeeklyChart } from "../components/WeeklyChart"
import { useVibration } from "../hooks/useVibration"
import { useStorage } from "../services/storage"

export default function Home() {
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [tasks, setTasks] = useState<Task[]>([])
  const theme = useTheme()
  const router = useRouter()
  const swipeableRefs = useRef<Swipeable[]>([])
  const toast = useToastController()
  const storage = useStorage()
  const inputRef = useRef<TextInputRef>(null)
  const { vibrate } = useVibration()

  function sortTasksByCreationDate(tasks: Task[]) {
    return tasks.sort((a, b) => {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    })
  }

  function handleError(message: string) {
    toast.show(message, {
      icon: SmileyXEyes,
    })

    vibrate("error")
  }

  function handleTaskButton(taskId: string) {
    router.push("/pomodoro/" + taskId)
  }

  function handleAlertCancel(swipeRefIndex: number) {
    swipeableRefs.current[swipeRefIndex]?.close()
  }

  async function handleRemoveTaskButton(taskId: string) {
    try {
      const updatedTasks = storage.destroyTask(taskId)
      setTasks(updatedTasks)
    } catch (error) {
      console.error(error)
      handleError("Failed to remove task")
    }
  }

  function handleEmptyMessageTask() {
    toast.show("Add a title to your task", {
      icon: Notepad,
    })
    inputRef.current?.focus()
  }

  async function handleNewTaskButton() {
    if (newTaskTitle.length < 3) {
      handleError("Add a valid task title")
      return
    }

    const taskId = uuid.v4().toString()

    const newTask: Task = {
      id: taskId,
      title: newTaskTitle.trim(),
      completedSessions: 0,
      totalSessions: 3,
      sessionMinutes: 20,
      breakMinutes: 5,
      longBreakMinutes: 15,
      completedPomodoros: 0,
      isBreak: false,
      isLongBreak: false,
      isSelected: false,
      created_at: new Date(),
    }

    try {
      storage.createTask(newTask)
      setTasks(sortTasksByCreationDate([...tasks, newTask]))
    } catch (error) {
      console.error(error)
      handleError("Failed to save task")
    }

    setNewTaskTitle("")
    router.push("/settings/" + taskId)
  }

  async function fetchTasks() {
    try {
      const tasks = storage.getTasks()

      if (tasks) setTasks(sortTasksByCreationDate(tasks))
    } catch (error) {
      console.error(error)
      handleError("Failed to fetch tasks")
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchTasks()
    }, [])
  )

  return (
    <YStack
      flex={1}
      bg="$blue2"
    >
      <XStack
        ai="center"
        jc="space-between"
      >
        <TextInput
          inputRef={inputRef}
          w="80%"
          placeholder="What are you working on?"
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
        />

        <View mr={8}>
          <RoundButton
            shadowColor={theme.blue8.val}
            radius={24}
            bg="$blue10"
            icon={
              <Plus
                color={theme.blue12.val}
                size={24}
                weight="bold"
              />
            }
            onPress={handleNewTaskButton}
          />
        </View>
      </XStack>

      <WeeklyChart />

      <H2
        fontSize={16}
        color="$blue12"
        mt={24}
        letterSpacing={1.1}
      >
        Tasks ({tasks.length})
      </H2>
      <YStack
        gap={12}
        mt={12}
      >
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Swipeable
              ref={(ref: Swipeable) => {
                if (ref) swipeableRefs.current.push(ref)
              }}
              containerStyle={{
                width: "100%",
                overflow: "hidden",
                backgroundColor: theme.red10.val,
                borderRadius: 12,
              }}
              overshootLeft={false}
              renderLeftActions={() => (
                <AlertRoot>
                  <AlertContent
                    title="Danger"
                    description="Are you sure to remove this task?"
                    onCancel={() => handleAlertCancel(index)}
                    onConfirm={() => handleRemoveTaskButton(item.id)}
                  />
                  <AlertTrigger asChild>
                    <Button
                      unstyled
                      bc="$red10"
                      ai="center"
                      jc="center"
                      px={8}
                      py={12}
                      w={90}
                      mb={12}
                      h="100%"
                      borderTopLeftRadius={12}
                      borderBottomLeftRadius={12}
                      focusStyle={{
                        opacity: 0.7,
                      }}
                    >
                      <Trash
                        color={theme.blue12.val}
                        weight="bold"
                        size={32}
                      />
                    </Button>
                  </AlertTrigger>
                </AlertRoot>
              )}
            >
              <TaskCard
                title={item.title}
                totalSessions={item.totalSessions}
                completedSessions={item.completedSessions}
                completedPomodoros={item.completedPomodoros}
                icon={Play}
                isActive={item.isSelected}
                onPress={() => handleTaskButton(item.id)}
                label="play task's pomodoro"
                hasAnimation={false}
              />
            </Swipeable>
          )}
          ListEmptyComponent={
            <Text
              textAlign="center"
              fontSize={24}
              fontWeight="bold"
              onPress={handleEmptyMessageTask}
            >
              Add your first task
            </Text>
          }
        />
      </YStack>
    </YStack>
  )
}
