import { fireEvent, render, screen } from "@testing-library/react-native"
import { Check } from "phosphor-react-native"

import { Checkbox } from "../../components/Checkbox"
import { TamaguiProvider } from "../../providers/TamaguiProvider"

const wrapper = ({ children }) => <TamaguiProvider>{children}</TamaguiProvider>

const onCheckMock = jest.fn()

describe("Checkbox component", () => {
  it("should render Checkbox label", () => {
    const label = "Mock label"

    render(
      <Checkbox
        id="mock id"
        label={label}
        value="mock value"
        isChecked={false}
        width={100}
        icon={Check}
        onCheck={onCheckMock}
      />,
      { wrapper }
    )

    expect(screen.getByText(label)).toBeOnTheScreen()
  })

  it("should call a function on check", () => {
    const value = "Mock value"

    render(
      <Checkbox
        id="mock id"
        label="mock label"
        value={value}
        isChecked={false}
        width={100}
        icon={Check}
        onCheck={onCheckMock}
      />,
      { wrapper }
    )

    fireEvent.press(screen.getByRole("checkbox"))

    expect(onCheckMock).toHaveBeenCalledWith(value)
  })
})
