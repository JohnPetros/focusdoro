import { useCallback, useState } from "react"
import { useFocusEffect } from "expo-router/src/useFocusEffect"

import { Feature, FeatureTitle } from "../@types/feature"
import { storage } from "../storage"
import { DEFAULT_FEATURES } from "../utils/default-features"

export function useFeatures() {
  const [features, setFeatures] = useState<Feature[]>([])

  function sortFeaturesByTitle(features: Feature[]) {
    return features.sort((a, b) => a.title.localeCompare(b.title))
  }

  function getFeatureByTitle(featureTitle: FeatureTitle) {
    return features.find((feature) => feature.title === featureTitle)
  }

  function updateFeature(updatedFeature: Feature) {
    const updatedFeatures = storage.updateFeature(updatedFeature)
    setFeatures(sortFeaturesByTitle(updatedFeatures))
  }

  function fetchFeatures() {
    try {
      const features = storage.getFeatures()

      if (features?.length) {
        setFeatures(sortFeaturesByTitle(features))
        return
      }

      storage.setFeatures(DEFAULT_FEATURES)
    } catch (error) {
      console.error(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchFeatures()
    }, [])
  )

  return {
    features,
    getFeatureByTitle,
    updateFeature,
  }
}
