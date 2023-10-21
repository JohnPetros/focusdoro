import { act, fireEvent, render, screen } from "@testing-library/react-native"
import { Button } from "tamagui"

import { AlertContent, AlertRoot, AlertTrigger } from "../../components/Alert"
import { TamaguiProvider } from "../../providers/TamaguiProvider"

const alertTitleMock = "Mock title"
const alertDescriptionMock = "Are you sure to mock this?"

const onCancelMock = jest.fn()
const onConfirmMock = jest.fn()

function renderCompoenent() {
  render(
    <TamaguiProvider>
      <AlertRoot>
        <AlertContent
          title={alertTitleMock}
          description={alertDescriptionMock}
          onCancel={onCancelMock}
          onConfirm={onConfirmMock}
        />
        <AlertTrigger asChild>
          <Button testID="alert-trigger" />
        </AlertTrigger>
      </AlertRoot>
    </TamaguiProvider>
  )
}

describe("Alert component", () => {
  it("should open alert", async () => {
    renderCompoenent()

    const alertTrigger = screen.getByTestId("alert-trigger")

    act(() => {
      fireEvent.press(alertTrigger)
    })

    expect(screen.getByTestId("alert")).toBeOnTheScreen()
    expect(screen.getByText(alertTitleMock)).toBeOnTheScreen()
    expect(screen.getByText(alertDescriptionMock)).toBeOnTheScreen()
  })

  it("should call a function on confirm", async () => {
    renderCompoenent()

    await act(() => {
      const alertTrigger = screen.getByTestId("alert-trigger")
      fireEvent.press(alertTrigger)
    })

    await act(() => {
      const alertConfirm = screen.getByTestId("alert-confirm")
      fireEvent.press(alertConfirm)
    })

    expect(onConfirmMock).toHaveBeenCalled()
  })

  it("should call a function and close on cancel", async () => {
    renderCompoenent()

    await act(() => {
      const alertTrigger = screen.getByTestId("alert-trigger")
      fireEvent.press(alertTrigger)
    })

    await act(() => {
      const alertCancel = screen.getByTestId("alert-cancel")
      fireEvent.press(alertCancel)
    })
    expect(onCancelMock).toHaveBeenCalled()
    expect(screen.queryByTestId("alert")).toBe(null)
  })
})
