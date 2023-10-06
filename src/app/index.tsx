import { useState } from 'react'
import { Pressable } from 'react-native'
import { Link, useRouter } from 'expo-router'

import { H2, Input, XStack, YStack, useTheme } from 'tamagui'
import { TaskCard } from '../components/TaskCard'
import { RoundButton } from '../components/RoundButton'
import { Plus } from 'phosphor-react-native'

export default function Home() {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const theme = useTheme()

  return (
    <YStack f={1} bc="$blue2" pt={40} px={24}>
      <XStack ai="center" jc="space-between" gap={8}>
        <Input
          bg="$colorTransparent"
          color="$yellow3"
          borderWidth={1}
          borderColor="$blue4"
          focusStyle={{ borderColor: '$blue10', color: '$blue12' }}
          w="85%"
          h={56}
          p={12}
          placeholder="What are you workin on?"
          placeholderTextColor="$blue12"
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
        />
        <RoundButton
          shadowColor={theme.blue8.val}
          size="$3"
          bg="$blue10"
          icon={<Plus color={theme.blue12.val} size={24} weight="bold" />}
        />
      </XStack>
      <H2 fontSize={24} color="$blue12" mt={24}>
        Tasks (3)
      </H2>
      <YStack gap={12}>
        <Pressable>
          <TaskCard totalSessions={3} completedSessions={1} />
        </Pressable>
        <Pressable>
          <TaskCard totalSessions={3} completedSessions={1} />
        </Pressable>
        <Pressable>
          <TaskCard totalSessions={3} completedSessions={1} />
        </Pressable>
      </YStack>
    </YStack>
  )
}
