import * as Haptics from "expo-haptics"

type VibrationType = "success" | "error"

export function useVibration() {
  function vibrate(vibrationType: VibrationType) {
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

  return vibrate
}
