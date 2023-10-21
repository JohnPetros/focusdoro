import { useCallback, useState } from "react"
import { useFocusEffect } from "expo-router/src/useFocusEffect"

import { Feature, FeatureTitle } from "../@types/feature"
import { useStorage } from "../services/storage"
import { DEFAULT_FEATURES } from "../utils/default-features"

export function useFeatures(featureTypes: FeatureTitle[]) {
  const [features, setFeatures] = useState<Feature[]>([])
  const storage = useStorage()

  function sortFeaturesByTitle(features: Feature[]) {
    return features.sort((a, b) => a.title.localeCompare(b.title))
  }

  function updateFeature(updatedFeature: Feature) {
    const updatedFeatures = storage.updateFeature(updatedFeature)
    setFeatures(sortFeaturesByTitle(updatedFeatures))
  }

  function fetchFeatures() {
    try {
      const allFeatures = storage.getFeatures()

      if (allFeatures?.length) {
        const features = allFeatures.filter((feature) =>
          featureTypes.includes(feature.title)
        )
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
    updateFeature,
  }
}
