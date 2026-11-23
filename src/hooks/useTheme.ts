import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'theme'
const THEME_COLORS: Record<Theme, string> = { dark: '#080c10', light: '#f5f7fa' }
const LIGHT_QUERY = '(prefers-color-scheme: light)'

function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark'
}

/** Leest een expliciete keuze van de bezoeker; null als die er niet is of opslag geblokkeerd is. */
export function readStoredTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY)
    return isTheme(value) ? value : null
  } catch {
    return null
  }
}

function getSystemTheme(): Theme {
  return window.matchMedia?.(LIGHT_QUERY).matches ? 'light' : 'dark'
}

/** public/theme-init.js zet data-theme al vóór de eerste paint; die waarde is leidend. */
export function getInitialTheme(): Theme {
  const fromDocument = document.documentElement.dataset.theme
  if (isTheme(fromDocument)) return fromDocument
  return readStoredTheme() ?? getSystemTheme()
}

export interface UseThemeResult {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export function useTheme(): UseThemeResult {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
  }, [theme])

  // Volg het systeemthema zolang de bezoeker zelf nog niets gekozen heeft.
  useEffect(() => {
    const query = window.matchMedia?.(LIGHT_QUERY)
    if (!query) return undefined

    const onChange = (event: MediaQueryListEvent) => {
      if (readStoredTheme() === null) setThemeState(event.matches ? 'light' : 'dark')
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Opslag geblokkeerd (privévenster): de keuze geldt dan alleen voor deze sessie.
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  return { theme, setTheme, toggleTheme }
}
