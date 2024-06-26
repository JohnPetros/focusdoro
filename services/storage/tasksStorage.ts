import { MMKV } from "react-native-mmkv"

import type { Task } from "../../@types/task"

import { ITasksStorage } from "./interfaces/ITasksStorage"
import { TASKS_KEY } from "./keys"

export const tasksStorage = (storage: MMKV): ITasksStorage => ({
  getTask(id: string): Task {
    const tasks = storage.getString(TASKS_KEY)

    return JSON.parse(tasks).find((task: Task) => task.id === id)
  },

  getTasks(): Task[] | null {
    const tasks = storage.getString(TASKS_KEY)

    if (!tasks) return null

    return JSON.parse(tasks)
  },

  createTask(task: Task) {
    const tasks = this.getTasks()
    const tasksData = tasks ?? []

    const updatedTasks = [...tasksData, task]
    storage.set(TASKS_KEY, JSON.stringify(updatedTasks))
  },

  destroyTask(id: string): Task[] {
    const tasks: Task[] = this.getTasks()

    const updatedTasks = tasks?.filter((task: Task) => task.id !== id)

    storage.set(TASKS_KEY, JSON.stringify(updatedTasks))

    return updatedTasks
  },

  destroyAllTasks(): void {
    storage.delete(TASKS_KEY)
  },

  updateTask(task: Task): void {
    this.destroyTask(task.id)
    this.createTask(task)
  },
})
