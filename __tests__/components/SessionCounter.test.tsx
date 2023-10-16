import { render } from "@testing-library/react-native"
import { TamaguiProvider } from "tamagui"

import { SessionCounter } from "../../components/SessionCounter"
import config from "../../tamagui.config"

const wrapper = ({ children }) => (
  <TamaguiProvider config={config}>{children}</TamaguiProvider>
)

describe("SessionCounter component", () => {
  it("should render icons according to total sessions amount", () => {
    const totalAmount = 3

    const { getAllByTestId } = render(
      <SessionCounter
        isActive={true}
        completedAmount={1}
        totalAmount={totalAmount}
      />,
      { wrapper }
    )

    expect(getAllByTestId(/filled|not-filled/i)).toHaveLength(totalAmount)
  })

  it("should render filled icons according to completed sessions amount", () => {
    const completedAmount = 2

    const { getAllByTestId } = render(
      <SessionCounter
        isActive={true}
        completedAmount={completedAmount}
        totalAmount={4}
      />,
      { wrapper }
    )

    expect(getAllByTestId(/filled/i)).toHaveLength(completedAmount + 2)
  })
})
