import { create } from "zustand"

export type StoreState = {
  sessionSeconds: number
  breakSeconds: number
  longBreakSeconds: number
  completedSessions: number
  completedPomodoros: number
  totalSessionSeconds: number
  totalSessions: number
  isPaused: boolean
  isBreak: boolean
  isLongBreak: boolean
  shouldReset: boolean
  isEnd: boolean
}

type StoreAction = {
  setIsPaused: (isPaused: boolean) => void
  setIsBreak: (isBreak: boolean) => void
  setIsLongBreak: (isLongBreak: boolean) => void
  setSessionSeconds: (seconds: number) => void
  setBreakSeconds: (seconds: number) => void
  setLongBreakSeconds: (seconds: number) => void
  setTotalSessionSeconds: (totalSeconds: number) => void
  setTotalSessions: (totalSessions: number) => void
  setCompletedSessions: (completedSession: number) => void
  setCompletedPomodoros: (completedSession: number) => void
  setShouldReset: (shouldReset: boolean) => void
  setIsEnd: (isEnd: boolean) => void
  resetState: () => void
}

type StoreProps = {
  state: StoreState
  action: StoreAction
}

const initialState: StoreState = {
  totalSessionSeconds: 0,
  sessionSeconds: 0,
  breakSeconds: 0,
  longBreakSeconds: 0,
  completedSessions: 0,
  completedPomodoros: 0,
  totalSessions: 0,
  isPaused: false,
  isBreak: false,
  isLongBreak: false,
  shouldReset: false,
  isEnd: false,
}

export const useTimerStore = create<StoreProps>((set) => ({
  state: initialState,
  action: {
    setIsPaused: (isPaused: boolean) =>
      set(({ state, action }: StoreProps) => ({
        state: { ...state, isPaused },
        action,
      })),

    setIsBreak: (isBreak: boolean) =>
      set(({ state, action }: StoreProps) => ({
        state: { ...state, isBreak },
        action,
      })),

    setIsLongBreak: (isLongBreak: boolean) =>
      set(({ state, action }: StoreProps) => ({
        state: { ...state, isLongBreak },
        action,
      })),

    setSessionSeconds: (sessionSeconds: number) =>
      set(({ state, action }: StoreProps) => ({
        state: { ...state, sessionSeconds },
        action,
      })),

    setBreakSeconds: (breakSeconds: number) =>
      set(({ state, action }: StoreProps) => ({
        state: { ...state, breakSeconds },
        action,
      })),

    setLongBreakSeconds: (longBreakSeconds: number) =>
      set(({ state, action }: StoreProps) => ({
        state: { ...state, longBreakSeconds },
        action,
      })),

    setTotalSessionSeconds: (totalSessionSeconds: number) =>
      set(({ state, action }: StoreProps) => ({
        state: { ...state, totalSessionSeconds },
        action,
      })),

    setCompletedSessions: (completedSessions: number) =>
      set(({ state, action }: StoreProps) => ({
        state: { ...state, completedSessions },
        action,
      })),

    setTotalSessions: (totalSessions: number) =>
      set(({ state, action }: StoreProps) => ({
        state: { ...state, totalSessions },
        action,
      })),

    setShouldReset: (shouldReset: boolean) =>
      set(({ state, action }: StoreProps) => ({
        state: { ...state, shouldReset },
        action,
      })),

    setIsEnd: (isEnd: boolean) =>
      set(({ state, action }: StoreProps) => ({
        state: { ...state, isEnd },
        action,
      })),

    setCompletedPomodoros: (completedPomodoros: number) =>
      set(({ state, action }: StoreProps) => ({
        state: { ...state, completedPomodoros },
        action,
      })),

    resetState: () =>
      set(({ action }: StoreProps) => ({
        state: initialState,
        action,
      })),
  },
}))
