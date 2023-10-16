import { fireEvent, render } from "@testing-library/react-native"
import { Play } from "phosphor-react-native"
import { TamaguiProvider } from "tamagui"

import { TaskCard } from "../../components/TaskCard"
import config from "../../tamagui.config"
import { tasksMock } from "../mocks/tasksMock"

const wrapper = ({ children }) => (
  <TamaguiProvider config={config}>{children}</TamaguiProvider>
)

const taskMock = tasksMock[0]
const onPressMock = jest.fn()

describe("TaskCard component", () => {
  it("should render task title", () => {
    const { getByText } = render(
      <TaskCard
        title={taskMock.title}
        icon={Play}
        completedSessions={taskMock.completedSessions}
        totalSessions={taskMock.totalSessions}
        isActive={true}
        onPress={onPressMock}
      />,
      { wrapper }
    )

    expect(getByText(taskMock.title)).toBeTruthy()
  })

  it("should call a function on press", () => {
    const taskActionLabel = "Run task action"

    const { getByLabelText } = render(
      <TaskCard
        title={taskMock.title}
        icon={Play}
        completedSessions={taskMock.completedSessions}
        totalSessions={taskMock.totalSessions}
        isActive={true}
        onPress={onPressMock}
      />,
      { wrapper }
    )

    const taskButton = getByLabelText(taskActionLabel)

    fireEvent.press(taskButton)

    expect(onPressMock).toBeCalled()
  })

  it("should call a function on press", () => {
    const taskActionLabel = "Run task action"

    const { getByLabelText } = render(
      <TaskCard
        title={taskMock.title}
        icon={Play}
        completedSessions={taskMock.completedSessions}
        totalSessions={taskMock.totalSessions}
        isActive={true}
        onPress={onPressMock}
        label={taskActionLabel}
      />,
      { wrapper }
    )

    const taskButton = getByLabelText(taskActionLabel)

    fireEvent.press(taskButton)

    expect(onPressMock).toBeCalled()
  })
})
