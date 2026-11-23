import { m, type HTMLMotionProps } from 'motion/react'

interface RevealProps extends HTMLMotionProps<'div'> {
  /** Vertraging in seconden, handig om items in een lijst na elkaar te laten verschijnen. */
  delay?: number
  /** Afstand in px waarover het element omhoog schuift. */
  offset?: number
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const

/**
 * Laat de inhoud infaden zodra die in beeld scrolt.
 * MotionConfig reducedMotion="user" (in App) schakelt de verschuiving uit voor wie dat wil.
 */
export default function Reveal({ delay = 0, offset = 24, children, ...rest }: RevealProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
      {...rest}
    >
      {children}
    </m.div>
  )
}
