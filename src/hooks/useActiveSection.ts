import { useEffect, useState } from 'react'

/** Een smalle band rond het midden van het scherm bepaalt welke sectie "actief" is. */
const OBSERVER_OPTIONS: IntersectionObserverInit = { rootMargin: '-45% 0px -50% 0px' }

/**
 * Geeft het id terug van de sectie die nu in beeld is.
 * `ids` moet een stabiele referentie zijn (bv. een constante op moduleniveau).
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined

    const elements = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return undefined

    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      const first = visible[0]
      if (first) setActive(first.target.id)
    }, OBSERVER_OPTIONS)

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
