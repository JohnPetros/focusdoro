import { Task } from "../../@types/task"

export interface TasksStorage {
  getTask(taskId: string): Task
  getTasks(): Task[] | null
  createTask(task: Task): void
  destroyTask(taskId: string): void
  destroyAllTasks(): void
  updateTask(task: Task): void
}
