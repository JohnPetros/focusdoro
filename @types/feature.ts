export type FeatureTitle =
  | "automatic sessions"
  | "background sound"
  | "show notification"
  | "vibration"

export type Feature = {
  title: FeatureTitle
  isActive: boolean
}
