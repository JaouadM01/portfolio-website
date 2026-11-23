import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useTypewriter } from './useTypewriter'

const WORDS = ['ab', 'cd'] as const
const OPTIONS = { typeMs: 10, deleteMs: 5, pauseMs: 50 }

function advance(ms: number) {
  act(() => {
    vi.advanceTimersByTime(ms)
  })
}

describe('useTypewriter', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('typt een woord letter voor letter uit', () => {
    const { result } = renderHook(() => useTypewriter(WORDS, OPTIONS))

    expect(result.current).toBe('')
    advance(10)
    expect(result.current).toBe('a')
    advance(10)
    expect(result.current).toBe('ab')
  })

  it('wist het woord na de pauze en gaat door naar het volgende', () => {
    const { result } = renderHook(() => useTypewriter(WORDS, OPTIONS))

    // Elke stap plant de volgende timer pas na de React-flush, dus per stap één advance.
    advance(10)
    advance(10)
    expect(result.current).toBe('ab')
    advance(50) // pauze voorbij → wissen begint
    advance(5)
    expect(result.current).toBe('a')
    advance(5)
    expect(result.current).toBe('')
    advance(0) // volgend woord
    advance(10)
    expect(result.current).toBe('c')
  })

  it('toont het eerste woord statisch als animatie uit staat', () => {
    const { result } = renderHook(() => useTypewriter(WORDS, { ...OPTIONS, enabled: false }))

    advance(1000)
    expect(result.current).toBe('ab')
  })

  it('geeft een lege string bij een lege woordenlijst', () => {
    const { result } = renderHook(() => useTypewriter([], OPTIONS))

    advance(100)
    expect(result.current).toBe('')
  })
})
