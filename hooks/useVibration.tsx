import * as Haptics from "expo-haptics"

import { useFeatures } from "./useFeatures"

type VibrationType = "success" | "error"

export function useVibration() {
  const {
    features: [vibrationFeature],
  } = useFeatures(["vibration"])

  function vibrate(vibrationType: VibrationType) {
    if (vibrationFeature.isActive)
      switch (vibrationType) {
        case "success":
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
          break
        case "error":
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
          break
        default:
          return
      }
  }

  return { vibrate }
}
