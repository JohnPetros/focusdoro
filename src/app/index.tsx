import { useState, useCallback } from 'react'
import { useFocusEffect, useRouter } from 'expo-router'
import { useToastController } from '@tamagui/toast'

import { H2, XStack, YStack, useTheme } from 'tamagui'
import { TaskCard } from '../components/TaskCard'
import { RoundButton } from '../components/RoundButton'
import { TextInput } from '../components/TextInput'
import { Play, Plus, SmileyXEyes } from 'phosphor-react-native'
import uuid from 'react-native-uuid'

import { storage } from '../storage'
import type { Task } from '../@types/task'

export default function Home() {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const theme = useTheme()
  const router = useRouter()
  const toast = useToastController()

  function handleError(message: string) {
    toast.show(message, {
      icon: SmileyXEyes,
    })
  }

  async function handleNewTaskButton() {
    if (newTaskTitle.length < 3) {
      handleError('Add a valid task title')
      return
    }

    const taskId = uuid.v4().toString()

    console.log(taskId)

    const newTask: Task = {
      id: taskId,
      title: newTaskTitle,
      completedSessions: 1,
      totalSessions: 3,
      sessionMinutes: 20,
      breakMinutes: 5,
      longBreakMinutes: 15,
    }

    try {
      await storage.saveTask(newTask)
    } catch (error) {
      console.error(error)
      handleError('Failed to save task')
    }

    router.push('/settings/' + taskId)
  }

  async function fetchTasks() {
    try {
      const tasks = await storage.getTasks()

      console.log(tasks)

      if (tasks) setTasks(tasks)
    } catch (error) {
      console.error(error)
      handleError('Failed to fetch tasks')
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchTasks()
    }, [])
  )

  return (
    <YStack f={1} bc="$blue2" pt={44} px={24}>
      <XStack ai="center" jc="space-between" gap={8}>
        <TextInput
          w="85%"
          placeholder="What are you working on?"
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
        />

        <RoundButton
          shadowColor={theme.blue8.val}
          size="$3"
          bg="$blue10"
          icon={<Plus color={theme.blue12.val} size={24} weight="bold" />}
          onPress={handleNewTaskButton}
        />
      </XStack>
      <H2 fontSize={16} color="$blue12" mt={24} letterSpacing={1.1}>
        Tasks ({tasks.length})
      </H2>
      <YStack gap={12}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            totalSessions={task.totalSessions}
            completedSessions={task.completedSessions}
            icon={Play}
          />
        ))}
      </YStack>
    </YStack>
  )
}
