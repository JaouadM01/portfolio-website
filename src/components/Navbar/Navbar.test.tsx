import { screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { navItems } from '../../data/navigation'
import { renderWithMotion } from '../../test/render'
import Navbar from './Navbar'

describe('Navbar', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.dataset.theme = 'dark'
  })

  it('toont een link naar elke sectie', () => {
    renderWithMotion(<Navbar />)
    const nav = screen.getByRole('navigation', { name: 'Hoofdmenu' })

    for (const item of navItems) {
      expect(nav.querySelector(`a[href="#${item.id}"]`)).toHaveTextContent(item.label)
    }
  })

  it('opent en sluit het mobiele menu, ook met Escape', async () => {
    const { user } = renderWithMotion(<Navbar />)
    const toggle = screen.getByRole('button', { name: 'Menu openen' })

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(document.getElementById('mobile-menu')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.getByRole('button', { name: 'Menu openen' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('maakt de pagina achter het open menu inert, zodat Tab in het menu blijft', async () => {
    document.body.insertAdjacentHTML('beforeend', '<main id="main"></main><footer></footer>')
    const { user } = renderWithMotion(<Navbar />)

    await user.click(screen.getByRole('button', { name: 'Menu openen' }))
    expect(document.getElementById('main')).toHaveAttribute('inert')
    expect(document.querySelector('footer')).toHaveAttribute('inert')

    await user.keyboard('{Escape}')
    expect(document.getElementById('main')).not.toHaveAttribute('inert')
    document.getElementById('main')?.remove()
    document.querySelector('footer')?.remove()
  })

  it('sluit het mobiele menu na het kiezen van een link', async () => {
    const { user } = renderWithMotion(<Navbar />)
    await user.click(screen.getByRole('button', { name: 'Menu openen' }))

    const menu = document.getElementById('mobile-menu')!
    await user.click(menu.querySelector('a[href="#contact"]')!)

    expect(screen.getByRole('button', { name: 'Menu openen' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('wisselt het thema via de themaknop', async () => {
    const { user } = renderWithMotion(<Navbar />)

    await user.click(screen.getByRole('button', { name: 'Schakel over naar licht thema' }))

    expect(document.documentElement.dataset.theme).toBe('light')
    expect(screen.getByRole('button', { name: 'Schakel over naar donker thema' })).toBeInTheDocument()
  })
})
