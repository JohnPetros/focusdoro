import { useCallback, useState } from "react"
import { useFocusEffect } from "expo-router/src/useFocusEffect"
import { H2, Text, useTheme, View, XStack, YStack } from "tamagui"
import { VictoryBar } from "victory-native"

import { WeeklyChart as WeeklyChartData } from "../@types/weeklyChart"
import { useDate } from "../hooks/useDate"
import { useStorage } from "../services/storage"
import { DEFAULT_WEEKLY_CHART } from "../utils/default-weekly-chart"

const weeklyChartMock: WeeklyChartData = {
  shouldReset: false,
  weekdays: [
    {
      weekday: "Sun",
      value: 5,
    },
    {
      weekday: "Mon",
      value: 2,
    },
    {
      weekday: "Tue",
      value: 1,
    },
    {
      weekday: "Wed",
      value: 0,
    },
    {
      weekday: "Thu",
      value: 4,
    },
    {
      weekday: "Fri",
      value: 4,
    },
    {
      weekday: "Sat",
      value: 9,
    },
  ],
}

const radius = 7

export function WeeklyChart() {
  const [data, setData] = useState([])
  const storage = useStorage()
  const theme = useTheme()
  const { getTodayWeekday, getMonthWeekDays } = useDate()

  function setWeeklyChart(weeklyChart: WeeklyChartData) {
    const data = weeklyChart.weekdays.map(({ weekday, value }) => {
      return {
        x: weekday,
        y: value,
      }
    })
    setData(data)
    storage.setWeeklyChart(weeklyChart)
  }

  function fetchWeeklyChart() {
    const weeklyChart = storage.getWeeklyChart()
    if (weeklyChart) {
      setWeeklyChart(weeklyChart)

      const isTodaySunday = getTodayWeekday() === "Sun"
      if (isTodaySunday && weeklyChart.shouldReset) {
        setWeeklyChart(DEFAULT_WEEKLY_CHART)
      }

      if (!isTodaySunday && !weeklyChart.shouldReset) {
        storage.toggleShouldReset()
      }

      return
    }

    setWeeklyChart(DEFAULT_WEEKLY_CHART)
  }

  useFocusEffect(
    useCallback(() => {
      fetchWeeklyChart()
    }, [])
  )

  if (data.length)
    return (
      <YStack>
        <H2
          fontSize={16}
          color="$blue12"
          mt={12}
          letterSpacing={1.1}
        >
          Daily Sessions
        </H2>
        <View
          w="100%"
          alignItems="center"
          mt={-24}
        >
          <VictoryBar
            height={200}
            style={{
              data: { fill: theme.blue10.val },
              labels: { fill: theme.blue12.val },
            }}
            cornerRadius={{
              topLeft: radius,
              topRight: radius,
              bottomLeft: radius,
              bottomRight: radius,
            }}
            data={data}
            labels={({ datum }) => datum.y}
            animate={{ duration: 800, easing: "bounce" }}
          />
        </View>
        <YStack mt={-40}>
          <View
            borderRadius={50}
            w="100%"
            h={8}
            bg="$blue8"
          />
          <XStack
            justifyContent="space-around"
            mt={12}
          >
            {data.map((value, index) => (
              <YStack key={value.x}>
                <Text color="$blue12">{value.x}</Text>
                <Text
                  textAlign="center"
                  color="$blue12"
                  opacity={0.7}
                >
                  {getMonthWeekDays()[index]}
                </Text>
              </YStack>
            ))}
          </XStack>
        </YStack>
      </YStack>
    )
}
