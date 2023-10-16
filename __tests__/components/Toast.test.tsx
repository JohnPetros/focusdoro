import { act } from "react-test-renderer"
import { useToastController } from "@tamagui/toast"
import { render, renderHook, screen } from "@testing-library/react-native"
import { SmileyXEyes } from "phosphor-react-native"

import { Toast } from "../../components/Toast"
import { TamaguiProvider } from "../../providers/TamaguiProvider"
import { ToastProvider } from "../../providers/ToastProvider"

const wrapper = ({ children }) => (
  <TamaguiProvider>
    <ToastProvider>{children}</ToastProvider>
  </TamaguiProvider>
)

describe("SessionCounter component", () => {
  beforeAll(() => {
    render(<Toast />, { wrapper })
  })

  it("should show toast with a message", () => {
    const {
      result: { current: toast },
    } = renderHook(() => useToastController(), {
      wrapper,
    })

    act(() => {
      toast.show("Mock message", {
        icon: SmileyXEyes,
      })
    })

    expect(screen.getByTestId("toast")).toBeTruthy()
  })
})
