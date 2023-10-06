import { useState } from 'react'
import { useRouter } from 'expo-router'
import { useToastController } from '@tamagui/toast'

import { H2, Input, XStack, YStack, useTheme } from 'tamagui'
import { TaskCard } from '../components/TaskCard'
import { RoundButton } from '../components/RoundButton'
import { Play, Plus, XCircle } from 'phosphor-react-native'

export default function Home() {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const theme = useTheme()
  const router = useRouter()
  const toast = useToastController()

  function handleNewTaskButton() {
    if (newTaskTitle.length < 3) {
      toast.show('Add a valid task title', {
        icon: XCircle,
      })
      return
    }

    router.push('/settings')
  }

  return (
    <YStack f={1} bc="$blue2" pt={44} px={24}>
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
          fontSize={16}
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
          onPress={handleNewTaskButton}
        />
      </XStack>
      <H2 fontSize={16} color="$blue12" mt={24} letterSpacing={1.1}>
        Tasks (3)
      </H2>
      <YStack gap={12}>
        <TaskCard totalSessions={3} completedSessions={1} icon={Play} />
        <TaskCard totalSessions={3} completedSessions={1} icon={Play} />
        <TaskCard totalSessions={3} completedSessions={1} icon={Play} />
      </YStack>
    </YStack>
  )
}
