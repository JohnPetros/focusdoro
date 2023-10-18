import { create } from "zustand"

type StoreState = {
  sessionSeconds: number
  breakSeconds: number
  longBreakSeconds: number
  totalSessionSeconds: number
  completedSessions: number
  totalSessions: number
  isPaused: boolean
  isBreak: boolean
  isLongBreak: boolean
  shouldReset: boolean
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
  setShouldReset: (shouldReset: boolean) => void
}

type StoreProps = {
  state: StoreState
  action: StoreAction
}

export const useTimerStore = create<StoreProps>((set) => ({
  state: {
    totalSessionSeconds: 15,
    sessionSeconds: 15,
    breakSeconds: 5,
    longBreakSeconds: 10,
    completedSessions: 1,
    totalSessions: 3,
    isPaused: false,
    isBreak: false,
    isLongBreak: false,
  },
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
  },
}))
