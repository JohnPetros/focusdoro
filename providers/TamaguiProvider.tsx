import { ReactNode } from "react"
import { TamaguiProvider as Tamagui } from "tamagui"

import config from "../tamagui.config"

interface TamaguiProviderProps {
  children: ReactNode
}

export function TamaguiProvider({ children }: TamaguiProviderProps) {
  return <Tamagui config={config}>{children}</Tamagui>
}
