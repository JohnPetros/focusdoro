import { Feature } from "../../@types/feature"

export interface IFeaturesStorage {
  getFeatures(): Feature[]
  getFeatureByTitle(featureTitle: string): Feature
  updateFeature(updatedFeature: Feature): Feature[]
  setFeatures(features: Feature[]): void
}
