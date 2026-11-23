import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { navItems } from '../../data/navigation'
import { useActiveSection } from '../../hooks/useActiveSection'
import ThemeToggle from '../ThemeToggle'
import './Navbar.css'

const SECTION_IDS: readonly string[] = ['intro', ...navItems.map(item => item.id)]
const SCROLL_THRESHOLD = 20
const MENU_ID = 'mobile-menu'
/** Moet overeenkomen met het breekpunt in Navbar.css. */
const DESKTOP_QUERY = '(min-width: 821px)'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scrollen blokkeren gebeurt in CSS (html:has(#mobile-menu)); hier: sluiten en focus binnen het menu houden.
  useEffect(() => {
    if (!menuOpen) return undefined
    const close = () => setMenuOpen(false)
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    // Wordt het venster breed genoeg voor de desktopnavigatie (draaien, resizen), dan sluit het menu.
    const desktop = window.matchMedia?.(DESKTOP_QUERY)
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) close()
    }
    const background = [document.getElementById('main'), document.querySelector('footer')]

    window.addEventListener('keydown', onKey)
    desktop?.addEventListener('change', onDesktop)
    background.forEach(el => el?.setAttribute('inert', ''))
    return () => {
      window.removeEventListener('keydown', onKey)
      desktop?.removeEventListener('change', onDesktop)
      background.forEach(el => el?.removeAttribute('inert'))
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`navbar${scrolled || menuOpen ? ' navbar--scrolled' : ''}`}>
      <nav className="navbar__inner" aria-label="Hoofdmenu">
        <a href="#intro" className="navbar__logo" onClick={closeMenu}>
          jm<span aria-hidden="true">();</span>
          <span className="sr-only">, Jaouad M&apos;chichi, naar boven</span>
        </a>

        <ul className="navbar__links">
          {navItems.map(item => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={active === item.id ? 'is-active' : undefined}
                aria-current={active === item.id ? 'location' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <ThemeToggle />
          <button
            type="button"
            className="icon-btn navbar__menu-btn"
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
            onClick={() => setMenuOpen(open => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            id={MENU_ID}
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <ul>
              {navItems.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={closeMenu}
                    aria-current={active === item.id ? 'location' : undefined}
                  >
                    <span className="mobile-menu__num" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
