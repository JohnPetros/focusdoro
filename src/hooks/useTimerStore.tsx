import { create } from 'zustand'

type StoreState = {
  sessionSeconds: number
  totalSessionSeconds: number
  completedSessions: number
  totalSessions: number
  isPaused: boolean
}

type StoreAction = {
  setIsPaused: (isPaused: boolean) => void
  setSessionSeconds: (seconds: number) => void
  setTotalSessionSeconds: (totalSeconds: number) => void
  setCompletedSessions: (completedSession: number) => void
}

type StoreProps = {
  state: StoreState
  action: StoreAction
}

export const useTimerStore = create<StoreProps>((set) => ({
  state: {
    totalSessionSeconds: 900,
    sessionSeconds: 900,
    completedSessions: 2,
    totalSessions: 3,
    isPaused: false,
  },
  action: {
    setIsPaused: (isPaused: boolean) =>
      set(({ state }: StoreProps) => ({ state: { ...state, isPaused } })),
    setSessionSeconds: (sessionSeconds: number) =>
      set(({ state, action }: StoreProps) => ({
        state: { ...state, sessionSeconds },
        action,
      })),
    setTotalSessionSeconds: (totalSessionSeconds: number) =>
      set(({ state }: StoreProps) => ({
        state: { ...state, totalSessionSeconds },
      })),
    setCompletedSessions: (completedSessions: number) =>
      set(({ state }: StoreProps) => ({
        state: { ...state, completedSessions },
      })),
  },
}))
