import AsyncStorage from '@react-native-async-storage/async-storage'
import { TASKS_KEY } from './keys'
import type { Task } from '../@types/task'

export const tasks = {
  async getTask(id: string): Promise<Task | undefined> {
    const tasks = await AsyncStorage.getItem(TASKS_KEY)

    if (tasks) return JSON.parse(tasks).find((task: Task) => task.id === id)
  },

  async getTasks(): Promise<Task[] | undefined> {
    const tasks = await AsyncStorage.getItem(TASKS_KEY)

    if (tasks) return await JSON.parse(tasks)
  },

  async createTask(task: Task) {
    const tasks = await this.getTasks()
    let tasksData = tasks ?? []

    const updatedTasks = [...tasksData, task]
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks))
  },

  async destroyTask(id: string) {
    const tasks = await this.getTasks()

    const updatedTasks = tasks?.filter((task) => task.id !== id)

    if (updatedTasks)
      AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks))
  },

  async destroyAllTasks() {
    await AsyncStorage.removeItem(TASKS_KEY)
  },

  async updateTask(task: Task) {
    await Promise.all([this.destroyTask(task.id), this.createTask(task)])
  },
}
