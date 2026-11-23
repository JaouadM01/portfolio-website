import { useRef, type PointerEvent } from 'react'
import { m, useReducedMotion, type Variants } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { heroRoles, site } from '../../data/site'
import { projects } from '../../data/projects'
import { useTypewriter } from '../../hooks/useTypewriter'
import CodeCard from './CodeCard'
import './Hero.css'

const EASE_OUT = [0.16, 1, 0.3, 1] as const

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
}

// De naam is het LCP-element: niet infaden vanaf opacity 0 (dan telt de browser hem pas laat),
// alleen een korte verschuiving zodat hij meteen zichtbaar is.
const lcpItem: Variants = {
  hidden: { y: 16 },
  show: { y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
}

const uniqueTechCount = new Set(projects.flatMap(project => project.tech)).size

const stats = [
  { value: String(projects.length).padStart(2, '0'), label: 'Projecten' },
  { value: String(uniqueTechCount), label: 'Technologieën' },
  { value: "jan '27", label: 'Afstuderen' },
] as const

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const typed = useTypewriter(heroRoles, { enabled: !reduceMotion })
  const sectionRef = useRef<HTMLElement>(null)
  const frame = useRef<number | null>(null)

  // Spotlight volgt de muis; via CSS-variabelen zodat React niet opnieuw rendert.
  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || frame.current !== null) return
    const { clientX, clientY } = event
    frame.current = window.requestAnimationFrame(() => {
      frame.current = null
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${clientX - rect.left}px`)
      el.style.setProperty('--my', `${clientY - rect.top}px`)
    })
  }

  return (
    <section
      ref={sectionRef}
      className="hero"
      id="intro"
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
    >
      <div className="hero__spotlight" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />

      <div className="hero__inner">
        <m.div className="hero__content" variants={container} initial="hidden" animate="show">
          <m.p className="hero__badge" variants={lcpItem}>
            <span className="hero__badge-dot" aria-hidden="true" />
            {site.availability}
          </m.p>

          <m.h1 className="hero__name" id="hero-title" variants={lcpItem}>
            {site.firstName}
            <br />
            <span>{site.lastName}</span>
          </m.h1>

          <m.p className="hero__typing" variants={item}>
            <span className="sr-only">{site.role}</span>
            <span className="hero__prompt" aria-hidden="true">
              $
            </span>
            <span className="hero__typing-text" aria-hidden="true">
              {typed}
            </span>
            <span className="hero__cursor" aria-hidden="true" />
          </m.p>

          <m.p className="hero__tagline" variants={item}>
            {site.tagline}
          </m.p>

          <m.div className="hero__ctas" variants={item}>
            <a href="#projecten" className="btn btn--primary">
              Bekijk mijn projecten
              <ArrowRight aria-hidden="true" />
            </a>
            <a href="#contact" className="btn btn--secondary">
              Neem contact op
            </a>
          </m.div>

          <m.dl className="hero__stats" variants={item}>
            {stats.map(stat => (
              <div className="hero__stat" key={stat.label}>
                <dt className="hero__stat-label">{stat.label}</dt>
                <dd className="hero__stat-num">{stat.value}</dd>
              </div>
            ))}
          </m.dl>
        </m.div>

        <m.div
          className="hero__visual"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.35 }}
        >
          <CodeCard />
        </m.div>
      </div>

      <a href="#skills" className="hero__scroll">
        <span className="hero__scroll-line" aria-hidden="true" />
        scroll
      </a>
    </section>
  )
}
