import { useId, useState, type ChangeEvent, type FormEvent } from 'react'
import { CircleAlert, CircleCheck, Info, LoaderCircle, Send } from 'lucide-react'
import { site } from '../../data/site'
import {
  CONTACT_TOPICS,
  MESSAGE_MAX,
  buildMailtoUrl,
  getEmailConfig,
  isRateLimitError,
  sendWithEmailJs,
  topicLabels,
  validateContact,
  type ContactField,
  type ContactTopic,
  type EmailConfig,
  type FieldErrors,
  type SendFn,
} from '../../lib/contact'

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error' | 'throttled'

interface FormState {
  name: string
  email: string
  topic: ContactTopic
  message: string
  /** Honeypot: onzichtbaar voor mensen, bots vullen het wel in. */
  website: string
}

const EMPTY_FORM: FormState = { name: '', email: '', topic: 'baan', message: '', website: '' }

interface ContactFormProps {
  /** Te overschrijven in tests; standaard uit de VITE_EMAILJS_*-variabelen. */
  emailConfig?: EmailConfig | null
  send?: SendFn
  /** Opent de mailto-link; te vervangen in tests. */
  openMailto?: (url: string) => void
}

const defaultOpenMailto = (url: string) => {
  window.location.href = url
}

export default function ContactForm({
  emailConfig = getEmailConfig(),
  send,
  openMailto = defaultOpenMailto,
}: ContactFormProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const idPrefix = useId()
  const fieldId = (field: string) => `${idPrefix}-${field}`

  const update =
    (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target
      setForm(prev => ({ ...prev, [field]: value }))
      if (field in errors) setErrors(prev => ({ ...prev, [field]: undefined }))
      // Een oude melding (verzonden/mislukt) hoort niet bij een nieuw bericht.
      if (status !== 'idle' && status !== 'sending') setStatus('idle')
    }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return

    // Bot gedetecteerd: doe alsof het gelukt is, maar verstuur niets.
    if (form.website.trim() !== '') {
      setStatus('sent')
      return
    }

    const result = validateContact(form)
    if (!result.success) {
      setErrors(result.errors)
      setStatus('idle')
      const firstInvalid = (Object.keys(result.errors) as ContactField[])[0]
      if (firstInvalid) document.getElementById(fieldId(firstInvalid))?.focus()
      return
    }

    setErrors({})

    if (!emailConfig) {
      openMailto(buildMailtoUrl(result.data, site.email))
      setStatus('mailto')
      return
    }

    setStatus('sending')
    try {
      await sendWithEmailJs(result.data, emailConfig, send)
      setStatus('sent')
      setForm(EMPTY_FORM)
    } catch (error: unknown) {
      // De bezoeker krijgt een begrijpelijke melding; technische details horen niet in de UI.
      setStatus(isRateLimitError(error) ? 'throttled' : 'error')
    }
  }

  const describedBy = (field: ContactField) => (errors[field] ? fieldId(`${field}-error`) : undefined)

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate aria-label="Contactformulier">
      <fieldset className="contact-form__topics">
        <legend className="form-label">Waar gaat het over?</legend>
        <div className="segmented">
          {CONTACT_TOPICS.map(topic => (
            <label className="segmented__option" key={topic}>
              <input
                type="radio"
                name="topic"
                value={topic}
                checked={form.topic === topic}
                onChange={() => setForm(prev => ({ ...prev, topic }))}
              />
              <span>{topicLabels[topic]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="contact-form__row">
        <div className="form-group">
          <label className="form-label" htmlFor={fieldId('name')}>
            Naam
          </label>
          <input
            id={fieldId('name')}
            className="form-input"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={update('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy('name')}
            placeholder="Je naam"
          />
          {errors.name && (
            <p className="form-error" id={fieldId('name-error')}>
              {errors.name}
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor={fieldId('email')}>
            E-mail
          </label>
          <input
            id={fieldId('email')}
            className="form-input"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={form.email}
            onChange={update('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email')}
            placeholder="naam@bedrijf.nl"
          />
          {errors.email && (
            <p className="form-error" id={fieldId('email-error')}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="form-group">
        <div className="form-label-row">
          <label className="form-label" htmlFor={fieldId('message')}>
            Bericht
          </label>
          <span className="form-counter" aria-hidden="true">
            {form.message.length} / {MESSAGE_MAX}
          </span>
        </div>
        <textarea
          id={fieldId('message')}
          className="form-input form-textarea"
          rows={5}
          maxLength={MESSAGE_MAX}
          value={form.message}
          onChange={update('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy('message')}
          placeholder="Vertel kort waar je aan denkt: de functie, het project of je vraag."
        />
        {errors.message && (
          <p className="form-error" id={fieldId('message-error')}>
            {errors.message}
          </p>
        )}
      </div>

      <div className="contact-form__honeypot" aria-hidden="true">
        <label htmlFor={fieldId('website')}>Website</label>
        <input
          id={fieldId('website')}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={update('website')}
        />
      </div>

      <button type="submit" className="btn btn--primary contact-form__submit" disabled={status === 'sending'}>
        {status === 'sending' ? (
          <>
            <LoaderCircle className="spin" aria-hidden="true" />
            Versturen…
          </>
        ) : (
          <>
            <Send aria-hidden="true" />
            Bericht sturen
          </>
        )}
      </button>

      <div aria-live="polite" className="contact-form__status">
        {status === 'sending' && <p className="sr-only">Bericht wordt verstuurd…</p>}
        {status === 'throttled' && (
          <p className="alert alert--info">
            <Info aria-hidden="true" />
            Je bericht is net al verstuurd. Wacht even voordat je opnieuw verstuurt.
          </p>
        )}
        {status === 'sent' && (
          <p className="alert alert--success">
            <CircleCheck aria-hidden="true" />
            Bericht verzonden! Ik neem zo snel mogelijk contact met je op.
          </p>
        )}
        {status === 'mailto' && (
          <p className="alert alert--info">
            <Info aria-hidden="true" />
            Je mailprogramma is geopend met je bericht erin. Gebeurde er niets? Mail dan direct naar{' '}
            {site.email}.
          </p>
        )}
        {status === 'error' && (
          <p className="alert alert--error">
            <CircleAlert aria-hidden="true" />
            Versturen is niet gelukt. Controleer je verbinding en probeer het opnieuw, of mail direct naar{' '}
            {site.email}.
          </p>
        )}
      </div>
    </form>
  )
}
