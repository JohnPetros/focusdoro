import {
  CloudRain,
  Coffee,
  Icon,
  Peace,
  Tree,
  Waves,
} from "phosphor-react-native"

export type AudioTitle = "forest" | "cafe" | "ocean" | "rain" | "peace"

type Audio = {
  title: AudioTitle
  icon: Icon
}

export const AUDIOS: Audio[] = [
  {
    title: "forest",
    icon: Tree,
  },
  {
    title: "cafe",
    icon: Coffee,
  },
  {
    title: "ocean",
    icon: Waves,
  },
  {
    title: "rain",
    icon: CloudRain,
  },
  {
    title: "peace",
    icon: Peace,
  },
]
