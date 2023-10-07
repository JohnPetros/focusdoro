import AsyncStorage from '@react-native-async-storage/async-storage'
import { SELECTED_TASK, TASKS_KEY } from './keys'
import type { Task } from '../@types/task'

export default {
  async getTask(id: string): Promise<Task | undefined> {
    const tasks = await AsyncStorage.getItem(TASKS_KEY)

    if (tasks) return JSON.parse(tasks).find((task: Task) => task.id === id)
  },

  async getTasks(): Promise<Task[] | undefined> {
    const tasks = await AsyncStorage.getItem(TASKS_KEY)

    if (tasks) return await JSON.parse(tasks)
  },

  async getSelectedTask(): Promise<Task | undefined> {
    const selectedTask = await AsyncStorage.getItem(SELECTED_TASK)

    if (selectedTask) return await JSON.parse(selectedTask)
  },

  async selectTask(selectedTask: Task) {
    await AsyncStorage.setItem(SELECTED_TASK, JSON.stringify(selectedTask))
  },

  async saveTask(newTask: Task) {
    const tasks = await AsyncStorage.getItem(TASKS_KEY)
    let tasksData = tasks ? JSON.parse(tasks) : []

    const updatedTasks = [...tasksData, newTask]
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks))
  },

  async destroyAllTasks() {
    await AsyncStorage.removeItem(TASKS_KEY)
  },
}
