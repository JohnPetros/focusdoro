import { Task } from "../../../@types/task"

export interface ITasksStorage {
  getTask(taskId: string): Task
  getTasks(): Task[] | null
  createTask(task: Task): void
  destroyTask(taskId: string): Task[]
  destroyAllTasks(): void
  updateTask(task: Task): void
}
