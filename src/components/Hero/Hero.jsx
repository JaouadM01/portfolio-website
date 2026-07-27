import { useEffect, useState } from 'react'
import './Hero.css'

const roles = [
  'Software Developer',
  'Full Stack Developer',
  'Stage-kandidaat 2026',
  'AI Integrator',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const target = roles[roleIndex]

    if (typing) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 65)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 2200)
        return () => clearTimeout(t)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
        return () => clearTimeout(t)
      } else {
        setRoleIndex(i => (i + 1) % roles.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, roleIndex])

  return (
    <section className="hero" id="intro">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />

      <div className="hero__content">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          Beschikbaar voor stage &amp; freelance
        </div>

        <h1 className="hero__name">
          Jaouad<br />
          <span>M'chichi</span>
        </h1>

        <div className="hero__typing" aria-label={`Rol: ${roles[roleIndex]}`}>
          <span className="hero__typing-text">{displayed}</span>
          <span className="hero__cursor" aria-hidden="true">|</span>
        </div>

        <p className="hero__tagline">
          Van .NET en Java tot React en AI-integraties.
          Ik bouw het hele project, van ontwerp tot deploy.
        </p>

        <div className="hero__ctas">
          <a href="#projecten" className="btn btn--primary">Bekijk mijn projecten</a>
          <a href="#contact" className="btn btn--secondary">Neem contact op</a>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">06</span>
            <span className="hero__stat-label">Projecten</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">03</span>
            <span className="hero__stat-label">Bedrijven</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">2026</span>
            <span className="hero__stat-label">Stage-kandidaat</span>
          </div>
        </div>
      </div>

      <a href="#skills" className="hero__scroll" aria-label="Scroll naar skills">
        <span className="hero__scroll-line" aria-hidden="true" />
        scroll
      </a>
    </section>
  )
}
