import { ReactNode } from "react"
import { ToastProvider as Container, ToastViewport } from "@tamagui/toast"

import { Toast } from "../components/Toast"

interface ToastProviderProps {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <Container>
      <Toast />
      <ToastViewport
        left="50%"
        bottom={40}
      />
      {children}
    </Container>
  )
}
