import { useEffect, useState } from 'react'
import './Navbar.css'

const links = [
  { label: 'Skills', href: '#skills' },
  { label: 'Ervaring', href: '#ervaring' },
  { label: 'Projecten', href: '#projecten' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <a href="#intro" className="navbar__logo">
        jm<span>();</span>
      </a>
      <ul className="navbar__links">
        {links.map(link => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
