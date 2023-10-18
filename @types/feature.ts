export type FeatureTitle =
  | "vibration"
  | "automatic breaks"
  | "automatic sessions"
  | "show notification"

export type Feature = {
  title: FeatureTitle
  isActive: boolean
}
