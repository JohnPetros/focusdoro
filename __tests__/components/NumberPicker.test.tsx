import { PortalProvider } from "@gorhom/portal"
import { fireEvent, render } from "@testing-library/react-native"
import { TamaguiProvider } from "tamagui"

import { NumberInput } from "../../components/NumberInput"
import { NumberPicker } from "../../components/NumberPicker"
import config from "../../tamagui.config"

const wrapper = ({ children }) => (
  <TamaguiProvider config={config}>
    <PortalProvider>{children}</PortalProvider>
  </TamaguiProvider>
)

const onCofirmMock = jest.fn()

describe("NumberInput component", () => {
  it("should render current value and label", () => {
    const value = 20
    const label = "Session"

    const { getByText } = render(
      <NumberInput
        minValue={0}
        maxValue={60}
        label={label}
        value={value}
        width={100}
        onChange={onCofirmMock}
      />,
      { wrapper }
    )

    expect(getByText(value.toString())).toBeTruthy()
    expect(getByText(new RegExp(`\\b${label}\\b`, "i"))).toBeTruthy()
  })

  it("should increase value", () => {
    const value = 20

    const { getByLabelText, getByText } = render(
      <NumberPicker
        minValue={0}
        maxValue={60}
        label={"Session"}
        value={value}
        onConfirm={(newValue) => console.log(newValue)}
      />,
      { wrapper }
    )

    const increaseButton = getByLabelText(/increase value/i)

    fireEvent.press(increaseButton)

    const updatedValue = getByText(String(value + 1))

    expect(updatedValue).toBeTruthy()
  })

  it("should decrease value", () => {
    const value = 20

    const { getByLabelText, getByText } = render(
      <NumberPicker
        minValue={0}
        maxValue={60}
        label={"Session"}
        value={value}
        onConfirm={onCofirmMock}
      />,
      { wrapper }
    )

    const decreaseButton = getByLabelText(/decrease value/i)

    fireEvent.press(decreaseButton)

    const updatedValue = getByText(String(value - 1))

    expect(updatedValue).toBeTruthy()
  })

  it("should not exceed max value", () => {
    const value = 60
    const maxValue = 60

    const { getByLabelText, getByText } = render(
      <NumberPicker
        minValue={0}
        maxValue={maxValue}
        label={"Session"}
        value={value}
        onConfirm={onCofirmMock}
      />,
      { wrapper }
    )

    const increaseButton = getByLabelText(/increase value/i)

    fireEvent.press(increaseButton)
    fireEvent.press(increaseButton)
    fireEvent.press(increaseButton)

    const updatedValue = getByText(String(maxValue))

    expect(updatedValue).toBeTruthy()
  })

  it("should not exceed min value", () => {
    const value = 0
    const minValue = 0

    const { getByLabelText, getByText } = render(
      <NumberPicker
        minValue={minValue}
        maxValue={60}
        label={"Session"}
        value={value}
        onConfirm={(newValue) => console.log(newValue)}
      />,
      { wrapper }
    )

    const decreaseButton = getByLabelText(/decrease value/i)

    fireEvent.press(decreaseButton)
    fireEvent.press(decreaseButton)
    fireEvent.press(decreaseButton)

    const updatedValue = getByText(String(minValue))

    expect(updatedValue).toBeTruthy()
  })

  it("should call a function on confirm value", () => {
    const value = 20

    const { getByLabelText } = render(
      <NumberPicker
        minValue={0}
        maxValue={60}
        label={"Session"}
        value={value}
        onConfirm={onCofirmMock}
      />,
      { wrapper }
    )

    const increaseButton = getByLabelText(/increase value/i)
    const confirmButton = getByLabelText(/confirm value/i)

    fireEvent.press(increaseButton)
    fireEvent.press(confirmButton)

    expect(onCofirmMock).toHaveBeenCalledWith(value + 1)
  })
})
