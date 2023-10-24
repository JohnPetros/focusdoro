import { act } from "react-test-renderer"
import { fireEvent, render, screen } from "@testing-library/react-native"
import { useRouter } from "expo-router/src/hooks"

import { TaskControls } from "../../components/TaskControls"
import { BackgroundAudioContext } from "../../contexts/BackgroundAudioContext"
import { useTimerStore } from "../../hooks/useTimerStore"
import { TamaguiProvider } from "../../providers/TamaguiProvider"

jest.mock("expo-router/src/hooks")
jest.mock("expo-router/src/useFocusEffect", () => {
  return {
    useFocusEffect: jest.fn(() => ({})),
  }
})
jest.mock("../../hooks/useTimerStore")

const loadAudioMock = jest.fn()
const playMock = jest.fn()
const stopMock = jest.fn()
const storeAudioMock = jest.fn()
const setIsPausedMock = jest.fn()
const pushMock = jest.fn()

const taskId = "task id mock"

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
        <TaskControls taskId={taskId} />
      </BackgroundAudioContext.Provider>
    </TamaguiProvider>
  )

  debug()
}

describe("TaskControls component", () => {
  beforeEach(() => {
    const useTimerStoreMock = jest.mocked(useTimerStore)

    useTimerStoreMock.mockReturnValueOnce({
      action: {
        setIsPaused: setIsPausedMock,
      },
    })

    const useRouterMock = jest.mocked(useRouter)

    useRouterMock.mockReturnValueOnce({
      push: pushMock,
    } as any)
  })

  it("should redirect user to settings screen", async () => {
    renderComponent()

    await act(() => {
      fireEvent.press(screen.getByLabelText(/Open task settings/i))
    })

    expect(pushMock).toHaveBeenCalledWith(`/settings/${taskId}`)
  })

  it("should redirect user to home screen", async () => {
    renderComponent()

    await act(() => {
      fireEvent.press(screen.getByLabelText(/Go back to home/i))
    })

    expect(pushMock).toHaveBeenCalledWith("/")
  })

  it("should open audio modal", async () => {
    renderComponent()

    const useTimerStoreMock = jest.mocked(useTimerStore)

    useTimerStoreMock.mockReturnValueOnce({
      action: {
        setIsPaused: setIsPausedMock,
      },
    })

    await act(() => {
      fireEvent.press(screen.getByLabelText(/Open audio modal/i))
    })

    expect(screen.getByTestId(/audio-modal/i)).toBeTruthy()
  })

  it("should stop background music and pause timer when audio modal is open", async () => {
    const useTimerStoreMock = jest.mocked(useTimerStore)

    useTimerStoreMock.mockReturnValueOnce({
      action: {
        setIsPaused: setIsPausedMock,
      },
    })

    renderComponent()

    await act(() => {
      fireEvent.press(screen.getByLabelText(/Open audio modal/i))
    })

    expect(stopMock).toHaveBeenCalled()
    expect(setIsPausedMock).toHaveBeenCalledWith(false)
  })
})
