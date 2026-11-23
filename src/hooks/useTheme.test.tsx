import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { THEME_STORAGE_KEY, getInitialTheme, readStoredTheme, useTheme } from './useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    window.localStorage.clear()
    delete document.documentElement.dataset.theme
    document.head.innerHTML = '<meta name="theme-color" content="#000000">'
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('neemt het thema over dat theme-init.js al op <html> heeft gezet', () => {
    document.documentElement.dataset.theme = 'light'

    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe('light')
  })

  it('valt terug op het systeemthema (donker in de testomgeving)', () => {
    expect(getInitialTheme()).toBe('dark')
  })

  it('wisselt van thema, onthoudt de keuze en past <html> en theme-color aan', () => {
    const { result } = renderHook(() => useTheme())

    act(() => result.current.toggleTheme())

    expect(result.current.theme).toBe('light')
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('light')
    expect(document.querySelector('meta[name="theme-color"]')?.getAttribute('content')).toBe('#f5f7fa')
  })

  it('blijft werken als localStorage geblokkeerd is', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('SecurityError')
    })
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError')
    })
    const { result } = renderHook(() => useTheme())

    act(() => result.current.setTheme('light'))

    expect(result.current.theme).toBe('light')
    expect(readStoredTheme()).toBeNull()
  })

  it('negeert ongeldige waarden in localStorage', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'paars')

    expect(readStoredTheme()).toBeNull()
  })
})
