import { useEffect, useState } from 'react'

export interface TypewriterOptions {
  typeMs?: number
  deleteMs?: number
  pauseMs?: number
  /** Uit bij prefers-reduced-motion: dan wordt het eerste woord statisch getoond. */
  enabled?: boolean
}

const DEFAULTS = { typeMs: 65, deleteMs: 35, pauseMs: 2200 } as const

/** Typt de woorden één voor één uit, wist ze weer en gaat door naar het volgende. */
export function useTypewriter(words: readonly string[], options: TypewriterOptions = {}): string {
  const {
    typeMs = DEFAULTS.typeMs,
    deleteMs = DEFAULTS.deleteMs,
    pauseMs = DEFAULTS.pauseMs,
    enabled = true,
  } = options

  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!enabled || words.length === 0) return undefined

    const word = words[index % words.length] ?? ''
    let delay: number
    let step: () => void

    if (!deleting && text.length < word.length) {
      delay = typeMs
      step = () => setText(word.slice(0, text.length + 1))
    } else if (!deleting) {
      delay = pauseMs
      step = () => setDeleting(true)
    } else if (text.length > 0) {
      delay = deleteMs
      step = () => setText(text.slice(0, -1))
    } else {
      delay = 0
      step = () => {
        setDeleting(false)
        setIndex(i => (i + 1) % words.length)
      }
    }

    const timer = window.setTimeout(step, delay)
    return () => window.clearTimeout(timer)
  }, [enabled, words, index, text, deleting, typeMs, deleteMs, pauseMs])

  return enabled ? text : (words[0] ?? '')
}
