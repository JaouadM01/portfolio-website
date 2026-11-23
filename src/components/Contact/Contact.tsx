import { useEffect, useState } from 'react'
import { Check, Copy, Mail } from 'lucide-react'
import portrait1 from '../../assets/projecten/portret1.webp'
import portrait2 from '../../assets/projecten/portret2.webp'
import { site, socials } from '../../data/site'
import BrandIcon from '../BrandIcons'
import Reveal from '../Reveal'
import SectionHeader from '../SectionHeader'
import ContactForm from './ContactForm'
import './Contact.css'

type CopyState = 'idle' | 'copied' | 'failed'
const COPY_RESET_MS = 2200

export default function Contact() {
  const [copyState, setCopyState] = useState<CopyState>('idle')

  useEffect(() => {
    if (copyState === 'idle') return undefined
    const timer = window.setTimeout(() => setCopyState('idle'), COPY_RESET_MS)
    return () => window.clearTimeout(timer)
  }, [copyState])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
  }

  const copyLabel =
    copyState === 'copied' ? 'Gekopieerd' : copyState === 'failed' ? 'Kopiëren lukte niet' : 'Kopieer'

  return (
    <section className="section section--alt contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeader num="05" title="Contact" titleId="contact-title" />

        <div className="contact__layout">
          <Reveal className="contact__main">
            <p className="contact__label">Laten we samenwerken</p>
            <p className="contact__heading">Vacature, stage of freelance project? Stuur me een bericht.</p>
            <p className="contact__intro">
              Ik studeer af in {site.graduation} en sta open voor een junior-functie en freelance opdrachten. Ik
              reageer meestal binnen een paar dagen.
            </p>
            <ContactForm />
          </Reveal>

          <Reveal className="contact__aside" delay={0.12}>
            <div className="contact__photos">
              <img src={portrait1} alt={`Portret van ${site.name}`} loading="lazy" decoding="async" />
              <img src={portrait2} alt="" loading="lazy" decoding="async" />
            </div>

            <div className="contact__card">
              <p className="contact__card-label">Liever direct?</p>
              <div className="contact__email-row">
                <a href={`mailto:${site.email}`} className="contact__email">
                  <Mail aria-hidden="true" />
                  {site.email}
                </a>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={copyEmail}
                  aria-label={`E-mailadres kopiëren: ${copyLabel}`}
                  title={copyLabel}
                >
                  {copyState === 'copied' ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                </button>
              </div>
              <p className="sr-only" aria-live="polite">
                {copyState === 'copied' ? 'E-mailadres gekopieerd' : ''}
                {copyState === 'failed' ? 'Kopiëren lukte niet' : ''}
              </p>

              <ul className="contact__socials">
                {socials.map(social => (
                  <li key={social.label}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer" className="social-link">
                      <BrandIcon name={social.icon} />
                      <span className="social-link__text">
                        <span className="social-link__label">{social.label}</span>
                        <span className="social-link__handle">{social.handle}</span>
                      </span>
                      <span className="sr-only">(opent in nieuw tabblad)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
