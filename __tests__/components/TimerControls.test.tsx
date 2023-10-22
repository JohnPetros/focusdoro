import { act } from "react-test-renderer"
import { fireEvent, render, screen } from "@testing-library/react-native"

import { TimerControls } from "../../components/TimerControls"
import { BackgroundAudioContext } from "../../contexts/BackgroundAudioContext"
import { useTimerStore } from "../../hooks/useTimerStore"
import { TamaguiProvider } from "../../providers/TamaguiProvider"

jest.mock("../../hooks/useTimerStore")

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

const onEndMock = jest.fn()

const sessionSecondsMock = 60

function renderComponent() {
  const { debug } = render(
    <TamaguiProvider>
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
        <TimerControls
          isTimerLoaded={true}
          onEnd={onEndMock}
        />
      </BackgroundAudioContext.Provider>
    </TamaguiProvider>
  )

  debug()
}

function mockTimerStore({
  isPaused,
  isEnd,
}: {
  isPaused: boolean
  isEnd: boolean
}) {
  const useTimerStoreMock = jest.mocked(useTimerStore)

  useTimerStoreMock.mockReturnValueOnce({
    action: {
      setIsPaused: setIsPausedMock,
      setIsBreak: setIsBreakMock,
      setCompletedSessions: setCompletedSessionsMock,
      setIsLongBreak: setIsLongBreakMock,
      setShouldReset: setShouldResetMock,
      setSessionSeconds: setSessionSecondsMock,
    },
    state: {
      isPaused,
      sessionSeconds: sessionSecondsMock,
      isEnd,
    },
  })
}

describe("Controls component", () => {
  it("should show pause button and hide reset buttons when timer is not paused", async () => {
    mockTimerStore({ isPaused: false, isEnd: false })

    renderComponent()

    expect(screen.getByLabelText(/pause timer/i)).toBeTruthy()
    expect(screen.queryByLabelText(/reset current session/i)).not.toBeTruthy()
    expect(screen.queryByLabelText(/reset pomodoro/i)).not.toBeTruthy()
  })

  it("should show reset buttons and play button when timer is paused", async () => {
    mockTimerStore({ isPaused: true, isEnd: false })

    renderComponent()

    expect(screen.getByLabelText(/play timer/i)).toBeTruthy()
    expect(screen.getByLabelText(/reset current session/i)).toBeTruthy()
    expect(screen.getByLabelText(/reset pomodoro/i)).toBeTruthy()
  })

  it("should pause timer when pause button is pressed", async () => {
    mockTimerStore({ isPaused: false, isEnd: false })

    renderComponent()

    await act(() => {
      fireEvent.press(screen.getByLabelText(/pause timer/i))
    })

    expect(setIsPausedMock).toHaveBeenCalledWith(true)
  })

  it("should play timer when play button is pressed", async () => {
    mockTimerStore({ isPaused: true, isEnd: false })

    renderComponent()

    await act(() => {
      fireEvent.press(screen.getByLabelText(/play timer/i))
    })

    expect(setIsPausedMock).toHaveBeenCalledWith(false)
  })

  it("should reset timer session when reset session button is pressed", async () => {
    mockTimerStore({ isPaused: true, isEnd: false })

    renderComponent()

    await act(() => {
      fireEvent.press(screen.getByLabelText(/play timer/i))
    })

    expect(setShouldResetMock).toHaveBeenCalledWith(true)
    expect(setIsPausedMock).toHaveBeenCalledWith(false)
  })

  it("should reset pomodoro when reset pomodoro button is pressed", async () => {
    mockTimerStore({ isPaused: true, isEnd: false })

    renderComponent()

    await act(() => {
      fireEvent.press(screen.getByLabelText(/reset pomodoro/i))
    })

    expect(setIsPausedMock).toHaveBeenCalledWith(false)
    expect(setIsBreakMock).toHaveBeenCalledWith(false)
    expect(setIsLongBreakMock).toHaveBeenCalledWith(false)
    expect(setSessionSecondsMock).toHaveBeenCalledWith(sessionSecondsMock)
    expect(setCompletedSessionsMock).toHaveBeenCalledWith(1)
  })

  it("should call a function on pomodoro end", async () => {
    mockTimerStore({ isPaused: true, isEnd: true })

    renderComponent()

    await act(() => {
      fireEvent.press(screen.getByLabelText(/play timer/i))
    })

    expect(onEndMock).toHaveBeenCalled()
  })
})
