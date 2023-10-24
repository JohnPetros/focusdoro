import { fireEvent, render, screen } from "@testing-library/react-native"

import { RoundButton } from "../../components/RoundButton"
import { TamaguiProvider } from "../../providers/TamaguiProvider"
import { ToastProvider } from "../../providers/ToastProvider"

const wrapper = ({ children }) => (
  <TamaguiProvider>
    <ToastProvider>{children}</ToastProvider>
  </TamaguiProvider>
)

describe("RoundButton component", () => {
  it("should call a function on press", () => {
    const onPressMock = jest.fn()
    const label = "Mock label"

    render(
      <RoundButton
        shadowColor="$blue10"
        radius={12}
        onPress={onPressMock}
        aria-label={label}
      />,
      { wrapper }
    )

    const roundButton = screen.getByLabelText(label)

    fireEvent.press(roundButton)

    expect(onPressMock).toBeCalledTimes(1)
  })
})
