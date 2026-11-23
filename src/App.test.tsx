import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { navItems } from './data/navigation'

describe('App', () => {
  it('rendert alle secties met een kop en een skip-link', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: 'Direct naar de inhoud' })).toHaveAttribute('href', '#main')
    expect(screen.getByRole('heading', { level: 1, name: /Jaouad/ })).toBeInTheDocument()

    for (const item of navItems) {
      const section = document.getElementById(item.id)
      expect(section).toBeInTheDocument()
      expect(section).toHaveAccessibleName(item.label)
    }
  })

  it('heeft precies één h1', () => {
    render(<App />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('kopieert het e-mailadres naar het klembord', async () => {
    const { default: userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /E-mailadres kopiëren/ }))

    expect(await navigator.clipboard.readText()).toBe('jaouadmchichi@hotmail.com')
    expect(screen.getByRole('button', { name: /Gekopieerd/ })).toBeInTheDocument()
  })
})
