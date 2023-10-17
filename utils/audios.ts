import {
  CloudRain,
  Coffee,
  Icon,
  Peace,
  Tree,
  Waves,
} from "phosphor-react-native"

type Audio = {
  title: string
  file: string
  icon: Icon
}

const BASE_URL =
  "https://joeweaver.me/codepenassets/freecodecamp/challenges/build-a-pomodoro-clock"

export const audios: Audio[] = [
  {
    title: "forest",
    file: `${BASE_URL}/forest.mp3`,
    icon: Tree,
  },
  {
    title: "cafe",
    file: `${BASE_URL}/cafe.mp3`,
    icon: Coffee,
  },
  {
    title: "ocean",
    file: `${BASE_URL}/ocean.mp3`,
    icon: Waves,
  },
  {
    title: "rain",
    file: `${BASE_URL}/rain.mp3`,
    icon: CloudRain,
  },
  {
    title: "peace",
    file: `${BASE_URL}/peace.mp3`,
    icon: Peace,
  },
]
