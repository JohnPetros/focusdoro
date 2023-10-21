import { render, screen } from "@testing-library/react-native"

import { AudioModal, AudioModalContent } from "../../components/AudioModal"
import { BackgroundAudioProvider } from "../../contexts/BackgroundAudioContext"
import { TamaguiProvider } from "../../providers/TamaguiProvider"
import { AUDIOS } from "../../utils/audios"

const setIsModalOpenMock = jest.fn()

function renderCompoenent() {
  render(
    <TamaguiProvider>
      <BackgroundAudioProvider>
        <AudioModal open={true}>
          <AudioModalContent setIsModalOpen={setIsModalOpenMock} />
        </AudioModal>
      </BackgroundAudioProvider>
    </TamaguiProvider>
  )
}

describe("AudioModal component", () => {
  it.each(AUDIOS)("should render $title audio", ({ title }) => {
    renderCompoenent()
    expect(screen.getByTestId(title)).toBeOnTheScreen()
  })
})
