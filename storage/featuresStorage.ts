import { MMKV } from "react-native-mmkv"

import { Feature } from "../@types/feature"

import { IFeaturesStorage } from "./interfaces/IFeaturesStorage"
import { FEATURES_KEY } from "./keys"

export const featuresStorage = (storage: MMKV): IFeaturesStorage => ({
  setFeatures(features: Feature[]) {
    storage.set(FEATURES_KEY, JSON.stringify(features))
  },

  getFeatures() {
    const features = storage.getString(FEATURES_KEY)
    if (features) return JSON.parse(features)
  },

  getFeatureByTitle(featureTitle: string) {
    const features = this.getFeatures()

    if (features)
      return features.find((feature: Feature) => feature.title === featureTitle)
  },

  updateFeature(updatedFeature: Feature) {
    const features = this.getFeatures()

    if (features) {
      const currentFeatures = features.filter(
        (task: Feature) => task.title !== updatedFeature.title
      )

      const updatedFeatures = [...currentFeatures, updatedFeature]

      this.setFeatures(updatedFeatures)
      return updatedFeatures
    }
  },

  deleteFeatures() {
    storage.delete(FEATURES_KEY)
  },
})
