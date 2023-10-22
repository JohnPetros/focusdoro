import { act } from "react-test-renderer"
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native"

import type { AudioTitle } from "../../@types/audio"
import { AudioModal, AudioModalContent } from "../../components/AudioModal"
import { BackgroundAudioContext } from "../../contexts/BackgroundAudioContext"
import { TamaguiProvider } from "../../providers/TamaguiProvider"
import { AUDIOS } from "../../utils/audios"

const setIsModalOpenMock = jest.fn()
const loadAudioMock = jest.fn()
const playMock = jest.fn()
const stopMock = jest.fn()
const storeAudioMock = jest.fn()

async function renderComponent() {
  render(
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
        <AudioModal open={true}>
          <AudioModalContent setIsModalOpen={setIsModalOpenMock} />
        </AudioModal>
      </BackgroundAudioContext.Provider>
    </TamaguiProvider>
  )
}

describe("AudioModal component", () => {
  it.each(AUDIOS)("should render $title audio", async ({ title }) => {
    renderComponent()

    await waitFor(() => {
      expect(screen.findByText(title)).toBeTruthy()
    })
  })

  it("should close when close button is pressed", async () => {
    renderComponent()

    await act(() => {
      fireEvent.press(screen.getByLabelText("Close modal"))
    })

    await waitFor(() => {
      expect(setIsModalOpenMock).toHaveBeenCalledWith(false)
    })
  })

  it("should close when confirm button is pressed", async () => {
    renderComponent()

    fireEvent.press(screen.getByText("play audio"))

    await waitFor(() => {
      expect(setIsModalOpenMock).toHaveBeenCalledWith(false)
    })
  })

  it("should close when confirm button is pressed", async () => {
    renderComponent()

    fireEvent.press(screen.getByText("play audio"))

    await waitFor(() => {
      expect(setIsModalOpenMock).toHaveBeenCalledWith(false)
    })
  })

  it("should store audio when a checkbox is pressed", async () => {
    renderComponent()

    const audio: AudioTitle = "cafe"

    const checkbox = screen.getByText(audio)

    fireEvent.press(checkbox)

    await waitFor(() => {
      expect(storeAudioMock).toHaveBeenCalledWith(audio)
    })
  })
})
