import { Feature } from "../../@types/feature"

export interface FeaturesStorage {
  getFeatures(): Feature[]
  getFeatureByTitle(featureTitle: string): Feature
  updateFeature(updatedFeature: Feature): void
  setFeatures(features: Feature[]): void
}
