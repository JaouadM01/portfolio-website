import type { PointerEvent, ReactNode } from 'react'
import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { site } from '../../data/site'

const MAX_TILT_DEG = 6
const SPRING = { stiffness: 160, damping: 18 } as const

const Kw = ({ children }: { children: ReactNode }) => <span className="tok-kw">{children}</span>
const Str = ({ children }: { children: ReactNode }) => <span className="tok-str">{children}</span>
const Prop = ({ children }: { children: ReactNode }) => <span className="tok-prop">{children}</span>
const Pun = ({ children }: { children: ReactNode }) => <span className="tok-pun">{children}</span>

const LINES: readonly ReactNode[] = [
  <>
    <Kw>const</Kw> <span className="tok-var">jaouad</span> <Pun>=</Pun> <Pun>{'{'}</Pun>
  </>,
  <>
    {'  '}
    <Prop>rol</Prop>
    <Pun>:</Pun> <Str>'Full-stack developer'</Str>
    <Pun>,</Pun>
  </>,
  <>
    {'  '}
    <Prop>stack</Prop>
    <Pun>:</Pun> <Pun>[</Pun>
    <Str>'C#'</Str>
    <Pun>,</Pun> <Str>'Java'</Str>
    <Pun>,</Pun> <Str>'TypeScript'</Str>
    <Pun>],</Pun>
  </>,
  <>
    {'  '}
    <Prop>frontend</Prop>
    <Pun>:</Pun> <Pun>[</Pun>
    <Str>'React'</Str>
    <Pun>,</Pun> <Str>'Next.js'</Str>
    <Pun>,</Pun> <Str>'Angular'</Str>
    <Pun>],</Pun>
  </>,
  <>
    {'  '}
    <Prop>opleiding</Prop>
    <Pun>:</Pun> <Str>'HBO-ICT · Haagse Hogeschool'</Str>
    <Pun>,</Pun>
  </>,
  <>
    {'  '}
    <Prop>afstuderen</Prop>
    <Pun>:</Pun> <Str>'{site.graduation}'</Str>
    <Pun>,</Pun>
  </>,
  <>
    {'  '}
    <Prop>openVoor</Prop>
    <Pun>:</Pun> <Pun>[</Pun>
    <Str>'junior-functie'</Str>
    <Pun>,</Pun> <Str>'freelance'</Str>
    <Pun>],</Pun>
  </>,
  <>
    <Pun>{'}'}</Pun> <Kw>satisfies</Kw> <span className="tok-type">Developer</span>
  </>,
]

export default function CodeCard() {
  const reduceMotion = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [MAX_TILT_DEG, -MAX_TILT_DEG]), SPRING)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-MAX_TILT_DEG, MAX_TILT_DEG]), SPRING)

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    px.set((event.clientX - rect.left) / rect.width - 0.5)
    py.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const onPointerLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <m.figure
      className="code-card"
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      aria-labelledby="code-card-caption"
    >
      <div className="code-card__bar" aria-hidden="true">
        <span className="code-card__dot code-card__dot--red" />
        <span className="code-card__dot code-card__dot--yellow" />
        <span className="code-card__dot code-card__dot--green" />
        <span className="code-card__file">jaouad.ts</span>
      </div>
      <pre className="code-card__body" aria-hidden="true">
        <code>
          {LINES.map((line, i) => (
            <span className="code-card__line" key={i}>
              {line}
            </span>
          ))}
        </code>
      </pre>
      <figcaption id="code-card-caption" className="sr-only">
        Profiel als code: full-stack developer met C#, Java en TypeScript, frontend in React, Next.js en
        Angular, HBO-ICT aan De Haagse Hogeschool, afstuderen in {site.graduation}, open voor een
        junior-functie en freelance.
      </figcaption>
    </m.figure>
  )
}
