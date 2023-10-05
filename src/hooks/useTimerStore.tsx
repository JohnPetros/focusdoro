import { create } from 'zustand'

type StoreState = {
  sessionSeconds: number
  completedSessions: number
  totalSessions: number
  isPaused: boolean
}

type StoreAction = {
  setIsPaused: (isPaused: boolean) => void
}

type StoreProps = {
  state: StoreState
  action: StoreAction
}

export const useTimerStore = create<StoreProps>((set) => ({
  state: {
    sessionSeconds: 900,
    completedSessions: 2,
    totalSessions: 3,
    isPaused: false,
  },
  action: {
    setIsPaused: (isPaused: boolean) =>
      set(({ state }: StoreProps) => ({ state: { ...state, isPaused } })),
  },
}))
