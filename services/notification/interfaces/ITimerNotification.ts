interface displayTimerParams {
  title: string
  taskId: string
}

export interface ITimerNotification {
  displayTimer({ title }: displayTimerParams): Promise<string>
}
