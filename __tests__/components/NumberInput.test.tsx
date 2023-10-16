import { PortalProvider } from "@gorhom/portal"
import { fireEvent, render } from "@testing-library/react-native"
import { TamaguiProvider } from "tamagui"

import { NumberInput } from "../../components/NumberInput"
import config from "../../tamagui.config"

const wrapper = ({ children }) => (
  <TamaguiProvider config={config}>
    <PortalProvider>{children}</PortalProvider>
  </TamaguiProvider>
)

const onChangeMock = jest.fn()

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
        onChange={onChangeMock}
      />,
      { wrapper }
    )

    expect(getByText(value.toString())).toBeTruthy()
    expect(getByText(new RegExp(`\\b${label}\\b`, "i"))).toBeTruthy()
  })

  it("should open NumberPicker on press", () => {
    const { getByTestId } = render(
      <NumberInput
        minValue={0}
        maxValue={60}
        label={"Session"}
        value={20}
        width={100}
        onChange={onChangeMock}
      />,
      { wrapper }
    )

    const button = getByTestId("number-input-trigger")

    fireEvent.press(button)

    expect(getByTestId("number-picker")).toBeTruthy()
  })

  it("should close NumberPicker on confirm value", () => {
    const { getByTestId, getByLabelText } = render(
      <NumberInput
        minValue={0}
        maxValue={60}
        label={"Session"}
        value={20}
        width={100}
        onChange={onChangeMock}
      />,
      { wrapper }
    )

    const numberInputbutton = getByTestId("number-input-trigger")
    const confirmButton = getByLabelText(/confirm value/i)

    fireEvent.press(numberInputbutton)
    fireEvent.press(confirmButton)

    expect(getByTestId("number-picker")).not.toBeTruthy()
  })

  it("should call onChange on NumberPicker confirm value", () => {
    const value = 20

    const { getByTestId, getByLabelText } = render(
      <NumberInput
        minValue={0}
        maxValue={60}
        label={"Session"}
        value={value}
        width={100}
        onChange={onChangeMock}
      />,
      { wrapper }
    )

    const numberInputbutton = getByTestId("number-input-trigger")
    const confirmButton = getByLabelText(/confirm value/i)

    fireEvent.press(numberInputbutton)
    fireEvent.press(confirmButton)

    expect(onChangeMock).toHaveBeenCalledWith(value)
  })
})
