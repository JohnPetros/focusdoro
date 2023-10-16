import { Task } from "../../@types/task"

export const tasksMock: Task[] = [
  {
    id: "1",
    title: "Task 1",
    completedSessions: 2,
    totalSessions: 4,
    sessionMinutes: 25,
    breakMinutes: 5,
    longBreakMinutes: 15,
    isBreak: false,
    isLongBreak: false,
    isSelected: false,
  },
  {
    id: "2",
    title: "Task 2",
    completedSessions: 1,
    totalSessions: 3,
    sessionMinutes: 30,
    breakMinutes: 5,
    longBreakMinutes: 20,
    isBreak: false,
    isLongBreak: false,
    isSelected: true,
  },
  {
    id: "3",
    title: "Task 3",
    completedSessions: 0,
    totalSessions: 2,
    sessionMinutes: 20,
    breakMinutes: 5,
    longBreakMinutes: 10,
    isBreak: false,
    isLongBreak: false,
    isSelected: false,
  },
]