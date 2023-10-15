import { fireEvent, render } from "@testing-library/react-native"
import { Play } from "phosphor-react-native"
import { TamaguiProvider } from "tamagui"

import { TaskCard } from "../../components/TaskCard"
import config from "../../tamagui.config"

const wrapper = ({ children }) => (
  <TamaguiProvider config={config}>{children}</TamaguiProvider>
)

const task = {
  title: "title mock",
  icon: Play,
  completedSessions: 1,
  totalSessions: 3,
  isActive: false,
  onPress: () => console.log("mock"),
}

describe("TaskCard component", () => {
  it("should render task title", () => {
    const { getByText } = render(
      <TaskCard
        title={task.title}
        icon={task.icon}
        completedSessions={task.completedSessions}
        totalSessions={task.totalSessions}
        isActive={task.isActive}
        onPress={task.onPress}
      />,
      { wrapper }
    )

    expect(getByText(task.title)).toBeTruthy()
  })

  it("should call a function on press", () => {
    const functionMock = jest.fn()

    const taskActionLabel = "Run task action"

    const { getByLabelText } = render(
      <TaskCard
        title={task.title}
        icon={task.icon}
        completedSessions={task.completedSessions}
        totalSessions={task.totalSessions}
        isActive={task.isActive}
        onPress={functionMock}
        label={taskActionLabel}
      />,
      { wrapper }
    )

    const taskButton = getByLabelText(taskActionLabel)

    fireEvent.press(taskButton)

    expect(functionMock).toBeCalled()
  })

  it("should call a function on press", () => {
    const functionMock = jest.fn()

    const taskActionLabel = "Run task action"

    const { getByLabelText } = render(
      <TaskCard
        title={task.title}
        icon={task.icon}
        completedSessions={task.completedSessions}
        totalSessions={task.totalSessions}
        isActive={task.isActive}
        onPress={functionMock}
        label={taskActionLabel}
      />,
      { wrapper }
    )

    const taskButton = getByLabelText(taskActionLabel)

    fireEvent.press(taskButton)

    expect(functionMock).toBeCalled()
  })
})
