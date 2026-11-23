import { describe, expect, it, vi } from 'vitest'
import {
  MESSAGE_MAX,
  buildMailtoUrl,
  getEmailConfig,
  sendWithEmailJs,
  validateContact,
  type ContactValues,
} from './contact'

const VALID: ContactValues = {
  name: 'Sanne de Vries',
  email: 'sanne@bedrijf.nl',
  topic: 'freelance',
  message: 'Hoi Jaouad, we zoeken iemand voor een React-project.',
}

describe('validateContact', () => {
  it('accepteert geldige invoer en trimt spaties', () => {
    const result = validateContact({ ...VALID, name: '  Sanne de Vries  ', email: ' sanne@bedrijf.nl ' })

    expect(result).toEqual({ success: true, data: VALID })
  })

  it('geeft per veld een begrijpelijke foutmelding', () => {
    const result = validateContact({ name: 'J', email: 'geen-email', topic: 'baan', message: 'kort' })

    expect(result.success).toBe(false)
    if (result.success) return
    expect(result.errors.name).toMatch(/naam/i)
    expect(result.errors.email).toMatch(/geldig e-mailadres/i)
    expect(result.errors.message).toMatch(/minimaal 10 tekens/i)
    expect(result.errors.topic).toBeUndefined()
  })

  it('weigert een onbekend onderwerp', () => {
    const result = validateContact({ ...VALID, topic: 'spam' })

    expect(result.success).toBe(false)
    if (!result.success) expect(result.errors.topic).toBeDefined()
  })

  it('weigert een bericht dat te lang is', () => {
    const result = validateContact({ ...VALID, message: 'a'.repeat(MESSAGE_MAX + 1) })

    expect(result.success).toBe(false)
    if (!result.success) expect(result.errors.message).toMatch(/maximaal/)
  })

  it('kan niet-object-invoer aan zonder te crashen', () => {
    expect(validateContact(null).success).toBe(false)
  })
})

describe('getEmailConfig', () => {
  it('geeft null als niet alle variabelen gezet zijn', () => {
    expect(getEmailConfig({})).toBeNull()
    expect(getEmailConfig({ VITE_EMAILJS_SERVICE_ID: 'svc', VITE_EMAILJS_TEMPLATE_ID: 'tpl' })).toBeNull()
    expect(
      getEmailConfig({
        VITE_EMAILJS_SERVICE_ID: 'svc',
        VITE_EMAILJS_TEMPLATE_ID: 'tpl',
        VITE_EMAILJS_PUBLIC_KEY: '   ',
      }),
    ).toBeNull()
  })

  it('leest en trimt de configuratie', () => {
    const config = getEmailConfig({
      VITE_EMAILJS_SERVICE_ID: ' svc ',
      VITE_EMAILJS_TEMPLATE_ID: 'tpl',
      VITE_EMAILJS_PUBLIC_KEY: 'pub',
    })

    expect(config).toEqual({ serviceId: 'svc', templateId: 'tpl', publicKey: 'pub' })
  })
})

describe('buildMailtoUrl', () => {
  it('codeert onderwerp en bericht correct', () => {
    const url = buildMailtoUrl({ ...VALID, message: 'Regel 1 & regel 2?' }, 'jaouad@example.com')

    expect(url.startsWith('mailto:jaouad@example.com?subject=')).toBe(true)
    const params = new URLSearchParams(url.split('?')[1])
    expect(params.get('subject')).toBe('Freelance project: bericht van Sanne de Vries')
    expect(params.get('body')).toContain('Regel 1 & regel 2?')
    expect(params.get('body')).toContain('sanne@bedrijf.nl')
  })
})

describe('sendWithEmailJs', () => {
  const config = { serviceId: 'svc', templateId: 'tpl', publicKey: 'pub' }

  it('stuurt de juiste template-parameters naar EmailJS', async () => {
    const send = vi.fn().mockResolvedValue({ status: 200 })

    await sendWithEmailJs(VALID, config, send)

    expect(send).toHaveBeenCalledWith(
      'svc',
      'tpl',
      {
        from_name: 'Sanne de Vries',
        reply_to: 'sanne@bedrijf.nl',
        topic: 'Freelance project',
        message: VALID.message,
      },
      expect.objectContaining({ publicKey: 'pub' }),
    )
  })

  it('geeft een fout van EmailJS door aan de aanroeper', async () => {
    const send = vi.fn().mockRejectedValue({ status: 400, text: 'Bad request' })

    await expect(sendWithEmailJs(VALID, config, send)).rejects.toEqual({ status: 400, text: 'Bad request' })
  })

  it('laadt de EmailJS-SDK pas als er geen sender is meegegeven', async () => {
    const send = vi.fn().mockResolvedValue({ status: 200 })
    vi.doMock('@emailjs/browser', () => ({ send }))

    await sendWithEmailJs(VALID, config)

    expect(send).toHaveBeenCalledOnce()
    vi.doUnmock('@emailjs/browser')
  })
})
