import { useToastController } from "@tamagui/toast"
import { render, screen, waitFor } from "@testing-library/react-native"

import { Timer } from "../../components/Timer"
import { BackgroundAudioContext } from "../../contexts/BackgroundAudioContext"
import { useAudio } from "../../hooks/useAudio"
import { StoreState, useTimerStore } from "../../hooks/useTimerStore"
import { useVibration } from "../../hooks/useVibration"
import { TamaguiProvider } from "../../providers/TamaguiProvider"
import { ToastProvider } from "../../providers/ToastProvider"
import { tasksMock } from "../mocks/tasksMock"

jest.mock("../../hooks/useTimerStore")
jest.mock("../../hooks/useAudio")
jest.mock("../../hooks/useVibration")
// jest.mock("@tamagui/toast")
jest.mock("expo-router/src/useFocusEffect", () => {
  return {
    useFocusEffect: jest.fn(() => ({})),
  }
})

const loadAudioMock = jest.fn()
const playMock = jest.fn()
const stopMock = jest.fn()
const storeAudioMock = jest.fn()

const setIsPausedMock = jest.fn()
const setIsBreakMock = jest.fn()
const setIsLongBreakMock = jest.fn()
const setCompletedSessionsMock = jest.fn()
const setShouldResetMock = jest.fn()
const setSessionSecondsMock = jest.fn()
const setTotalSessionSecondsMock = jest.fn()
const setIsEndMock = jest.fn()

const loadAudioFileMock = jest.fn()
const vibrateMock = jest.fn()
const showToastMock = jest.fn()

const taskMock = tasksMock[0]

function renderComponent(isTimerLoaded = true) {
  const { debug } = render(
    <TamaguiProvider>
      <ToastProvider>
        <BackgroundAudioContext.Provider
          value={{
            audio: "cafe",
            isLoaded: true,
            loadAudio: loadAudioMock,
            play: playMock,
            stop: stopMock,
            storeAudio: storeAudioMock,
          }}
        >
          <Timer
            task={taskMock}
            isLoaded={isTimerLoaded}
          />
        </BackgroundAudioContext.Provider>
      </ToastProvider>
    </TamaguiProvider>
  )

  debug()
}

// function mockUseToast() {
//   const useToastMock = jest.mocked(useToastController)

//   useToastMock.mockReturnValueOnce({
//     show: showToastMock,
//   } as any)
// }

function mockUseVibration() {
  const useVibrationMock = jest.mocked(useVibration)

  useVibrationMock.mockReturnValueOnce({
    vibrate: vibrateMock,
  })
}

function mockUseAudio() {
  const useAudioMock = jest.mocked(useAudio)

  useAudioMock.mockReturnValueOnce({
    loadAudioFile: loadAudioFileMock,
  } as any)
}

function mockTimerStore({
  isPaused = false,
  isBreak = false,
  isLongBreak = false,
  sessionSeconds = 20 * 60,
  breakSeconds = 5 * 60,
  longBreakSeconds = 15 * 60,
  totalSessionSeconds = 20 * 60,
  totalSessions = 3,
  completedSessions = 1,
  shouldReset = false,
  isEnd = false,
}: Partial<StoreState>) {
  const useTimerStoreMock = jest.mocked(useTimerStore)

  useTimerStoreMock.mockReturnValueOnce({
    action: {
      setIsPaused: setIsPausedMock,
      setIsBreak: setIsBreakMock,
      setCompletedSessions: setCompletedSessionsMock,
      setIsLongBreak: setIsLongBreakMock,
      setShouldReset: setShouldResetMock,
      setSessionSeconds: setSessionSecondsMock,
      setTotalSessionSeconds: setTotalSessionSecondsMock,
      setIsEnd: setIsEndMock,
    },
    state: {
      isPaused,
      isBreak,
      isLongBreak,
      sessionSeconds,
      breakSeconds,
      longBreakSeconds,
      totalSessionSeconds,
      totalSessions,
      completedSessions,
      shouldReset,
      isEnd,
    },
  })
}

describe("Timer component", () => {
  it("should show completed sessions out of total sessions", async () => {
    const completedSessions = 1
    const totalSessions = 3

    mockTimerStore({
      completedSessions,
      totalSessions,
    })
    mockUseAudio()

    renderComponent()

    await waitFor(() => {
      expect(
        screen.getByText(`${completedSessions} of ${totalSessions} sessions`)
      ).toBeTruthy()
    })
  })

  it("should show break message on timer", async () => {
    const isBreak = true
    const breakSeconds = 60 * 5 // minutes

    mockUseVibration()
    mockUseAudio()
    mockTimerStore({
      isBreak,
      breakSeconds,
    })

    renderComponent()

    await waitFor(() => {
      expect(screen.getByText(`break for 5 minutes`)).toBeTruthy()
    })
  })

  it("should show session seconds in time format", async () => {
    const sessionSeconds = 90 // 1:30

    mockTimerStore({ sessionSeconds })
    mockUseAudio()

    renderComponent()

    await waitFor(() => {
      expect(screen.getByDisplayValue(/1/i)).toBeTruthy()
      expect(screen.getByText(":")).toBeTruthy()
      expect(screen.getByDisplayValue(/30/i)).toBeTruthy()
    })
  })

  it("should decrement session seconds by 1", async () => {
    mockTimerStore({ sessionSeconds: 100, isBreak: false, isLongBreak: false })
    mockUseVibration()
    mockUseAudio()

    renderComponent()

    await waitFor(() => {
      expect(setSessionSecondsMock).toHaveBeenCalledWith(99)
    })
  })

  it("should set break to true when session is end", async () => {
    const breakSeconds = 60 * 5 // 5 minutes

    mockUseVibration()
    mockUseAudio()
    mockTimerStore({ breakSeconds, sessionSeconds: -1 })

    renderComponent()

    await waitFor(() => {
      expect(setIsBreakMock).toHaveBeenCalledWith(true)
      expect(setSessionSecondsMock).toHaveBeenCalledWith(breakSeconds)
      expect(setSessionSecondsMock).toHaveBeenCalledWith(breakSeconds)
    })
  })

  it("should set long break to true when session is end and completed sessions is equal to total sessions", async () => {
    const longBreakSeconds = 60 * 15 // 15 minutes

    mockUseVibration()
    mockUseAudio()
    mockTimerStore({
      completedSessions: 3,
      totalSessions: 3,
      longBreakSeconds: longBreakSeconds,
      sessionSeconds: -1,
    })

    renderComponent()

    await waitFor(() => {
      expect(setIsLongBreakMock).toHaveBeenCalledWith(true)
      expect(setSessionSecondsMock).toHaveBeenCalledWith(longBreakSeconds)
      expect(setSessionSecondsMock).toHaveBeenCalledWith(longBreakSeconds)
    })
  })

  it("should reset timer when sessions is end and has a long break", async () => {
    const longBreakSeconds = 60 * 15 // 15 minutes

    mockUseVibration()
    mockUseAudio()
    mockTimerStore({
      completedSessions: 3,
      totalSessions: 3,
      longBreakSeconds: longBreakSeconds,
      isLongBreak: true,
      sessionSeconds: -1,
    })

    renderComponent()

    await waitFor(() => {
      expect(setShouldResetMock).toHaveBeenCalledWith(true)
      expect(setIsEndMock).toHaveBeenCalledWith(true)
    })
  })

  it("should vibrate device on session end", async () => {
    const breakSeconds = 60 * 5 // 5 minutes

    mockUseVibration()
    mockUseAudio()
    mockTimerStore({ breakSeconds, sessionSeconds: -1 })

    renderComponent()

    await waitFor(() => {
      expect(vibrateMock).toHaveBeenCalledWith("success")
    })
  })
})
