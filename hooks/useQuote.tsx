import { useEffect, useState } from "react"
import { useToastController } from "@tamagui/toast"
import { toast } from "burnt"

type Quote = {
  content: string
  author: string
}

export function useQuote(canFetch: boolean) {
  const [quote, setQuote] = useState<Quote | null>(null)

  function fetchQuote() {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        setQuote({
          content: data.content,
          author: data.author,
        })
      })
      .catch((error) => {
        console.error(error)
        setQuote({
          content: "Knowing is eternal; learning, infinite.",
          author: "John Petros",
        })
      })
  }

  useEffect(() => {
    if (canFetch) fetchQuote()
  }, [canFetch])

  return quote
}
