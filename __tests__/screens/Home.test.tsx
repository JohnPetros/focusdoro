import { fireEvent } from "@testing-library/react-native"
import { Stack } from "expo-router"
import { renderRouter, screen } from "expo-router/testing-library"
import { View } from "tamagui"

import Home from "../../app"
import { TamaguiProvider } from "../../providers/TamaguiProvider"
import { ToastProvider } from "../../providers/ToastProvider"
import { storage } from "../../storage"
import { tasksMock } from "../mocks/tasksMock"

const wrapper = ({ children }) => (
  <TamaguiProvider>
    <ToastProvider>
      <Stack>{children}</Stack>
    </ToastProvider>
  </TamaguiProvider>
)

describe("Home screen", () => {
  it("should fetch tasks", () => {
    // const storageMock = jest
    //   .spyOn(storage, "getTasks")
    //   .mockImplementationOnce(() => tasksMock)
    const HomeMock = jest.fn(() => <View />)
    const SettingsMock = jest.fn(() => <View />)

    renderRouter(
      {
        index: HomeMock,
        settings: SettingsMock,
      },
      {
        initialUrl: "/settings",
      }
    )

    expect(screen).toHavePathname("/settings")
  })
})
