import { Square, XStack, YStack, useTheme } from 'tamagui'
import { RoundButton } from '../components/RoundButton'
import { TaskCard } from '../components/TaskCard'

import {
  Play,
  Pause,
  ClockCounterClockwise,
  Square as Reset,
} from 'phosphor-react-native'

import { Timer } from '../components/Timer'
import { useTimerStore } from '../hooks/useTimerStore'

export function Pomodoro() {
  // const [isPaused, setIsPaused] = useState(false)
  const {
    state: { isPaused, totalSessions, completedSessions, totalSessionSeconds },
    action: { setIsPaused, setSessionSeconds },
  } = useTimerStore()

  const theme = useTheme()

  function handlePlayButton() {
    setIsPaused(!isPaused)
  }

  function handleResetSessionButton() {
    setIsPaused(false)
    setSessionSeconds(totalSessionSeconds)
  }

  return (
    <YStack f={1}>
      <Square pt={40} px={24} w="100%" position="absolute" ai="center">
        <TaskCard
          isActive={!isPaused}
          totalSessions={totalSessions}
          completedSessions={completedSessions}
        />
      </Square>
      <YStack f={1} ai="center" jc="center" position="relative">
        <Timer />

        <YStack position="absolute" ai="center" gap={16} bottom={100}>
          <RoundButton
            shadowColor={theme.blue8.val}
            size="$7"
            icon={
              isPaused ? (
                <Play color={theme.blue12.val} size={36} />
              ) : (
                <Pause color={theme.blue12.val} size={36} />
              )
            }
            bc="$blue10"
            onPress={handlePlayButton}
          />

          {isPaused && (
            <XStack gap={64}>
              <RoundButton
                shadowColor={theme.blue8.val}
                size="$5"
                icon={
                  <ClockCounterClockwise color={theme.blue12.val} size={24} />
                }
                bc="$blue10"
                onPress={handleResetSessionButton}
              />
              <RoundButton
                shadowColor={theme.blue8.val}
                size="$5"
                icon={<Reset color={theme.blue12.val} size={24} />}
                bc="$blue10"
                onPress={handlePlayButton}
              />
            </XStack>
          )}
        </YStack>
      </YStack>
    </YStack>
  )
}
