import { useCallback, useState } from 'react'
import { SESSION_SECONDS, useTimerStore } from '../../hooks/useTimerStore'
import { useFocusEffect, useLocalSearchParams } from 'expo-router'
import { Square, XStack, YStack, useTheme } from 'tamagui'

import { RoundButton } from '../../components/RoundButton'
import { TaskCard } from '../../components/TaskCard'
import { Timer } from '../../components/Timer'
import {
  Play,
  Pause,
  ClockCounterClockwise,
  Square as Reset,
  Gear,
  House,
} from 'phosphor-react-native'

import { BookOpen } from 'phosphor-react-native'

import { storage } from '../../storage'

import { convertMinutesToSeconds } from '../../utils/functions/convertMinutesToSeconds'

export default function Pomodoro() {
  const {
    state: {
      isPaused,
      isBreak,
      isLongBreak,
      totalSessions,
      completedSessions,
      totalSessionSeconds,
      taskTitle,
    },
    action: {
      setIsPaused,
      setIsBreak,
      setIsLongBreak,
      setSessionSeconds,
      setBreakSeconds,
      setTotalSessionSeconds,
      setTotalSessions,
      setCompletedSessions,
      setTaskTitle,
    },
  } = useTimerStore()
  const { taskId } = useLocalSearchParams()

  const theme = useTheme()

  function handleSettingsButton() {}

  function handleHomeButton() {}

  function handlePlayButton() {
    setIsPaused(!isPaused)
  }

  function handleResetSessionButton() {
    setIsPaused(false)
    setSessionSeconds(totalSessionSeconds)
  }

  function handleResetPomodoroButton() {
    setIsPaused(false)
    setIsBreak(false)
    setIsLongBreak(false)

    setSessionSeconds(SESSION_SECONDS)
    setCompletedSessions(1)
  }

  async function fetchTask() {
    try {
      const task = await storage.getTask(String(taskId))

      if (task) {
        console.log(task)

        setTotalSessions(task.totalSessions)
        setCompletedSessions(task.completedSessions)
        setSessionSeconds(convertMinutesToSeconds(task.sessionMinutes))
        setBreakSeconds(convertMinutesToSeconds(task.sessionMinutes))
        setTotalSessionSeconds(convertMinutesToSeconds(task.sessionMinutes))
        setTaskTitle(task.title)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchTask()
    }, [])
  )

  return (
    <YStack f={1} bc="$blue2">
      <Square pt={40} px={24} w="100%" position="absolute" ai="center">
        <TaskCard
          title={taskTitle}
          isActive={!isPaused && !isBreak}
          totalSessions={totalSessions}
          completedSessions={completedSessions}
          icon={BookOpen}
        />
        <XStack>
          <RoundButton
            shadowColor={theme.blue12.val}
            size="$5"
            icon={<Gear color={theme.blue12.val} size={24} />}
            bc="$blue2"
            onPress={handleResetSessionButton}
          />
          <RoundButton
            shadowColor={theme.blue12.val}
            size="$5"
            icon={<House color={theme.blue12.val} size={24} />}
            bc="$blue2"
            onPress={handleResetSessionButton}
          />
        </XStack>
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
                onPress={handleResetPomodoroButton}
              />
            </XStack>
          )}
        </YStack>
      </YStack>
    </YStack>
  )
}
