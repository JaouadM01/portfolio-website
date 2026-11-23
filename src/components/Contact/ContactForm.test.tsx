import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { renderWithMotion } from '../../test/render'
import { site } from '../../data/site'
import ContactForm from './ContactForm'

const CONFIG = { serviceId: 'svc', templateId: 'tpl', publicKey: 'pub' }

async function fillValidForm(user: ReturnType<typeof renderWithMotion>['user']) {
  await user.click(screen.getByRole('radio', { name: 'Freelance project' }))
  await user.type(screen.getByLabelText('Naam'), 'Sanne de Vries')
  await user.type(screen.getByLabelText('E-mail'), 'sanne@bedrijf.nl')
  await user.type(screen.getByLabelText('Bericht'), 'We zoeken een developer voor een React-project.')
}

describe('ContactForm', () => {
  it('toont foutmeldingen, markeert velden als ongeldig en focust het eerste foute veld', async () => {
    const send = vi.fn()
    const { user } = renderWithMotion(<ContactForm emailConfig={CONFIG} send={send} />)

    await user.click(screen.getByRole('button', { name: /Bericht sturen/ }))

    const name = screen.getByLabelText('Naam')
    expect(name).toHaveAttribute('aria-invalid', 'true')
    expect(name).toHaveAccessibleDescription(/naam/i)
    expect(name).toHaveFocus()
    expect(screen.getByLabelText('E-mail')).toHaveAttribute('aria-invalid', 'true')
    expect(send).not.toHaveBeenCalled()
  })

  it('wist de foutmelding van een veld zodra je het aanpast', async () => {
    const { user } = renderWithMotion(<ContactForm emailConfig={CONFIG} send={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: /Bericht sturen/ }))

    await user.type(screen.getByLabelText('Naam'), 'S')

    expect(screen.getByLabelText('Naam')).toHaveAttribute('aria-invalid', 'false')
  })

  it('verstuurt via EmailJS, toont een succesmelding en leegt het formulier', async () => {
    const send = vi.fn().mockResolvedValue({ status: 200 })
    const { user } = renderWithMotion(<ContactForm emailConfig={CONFIG} send={send} />)

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: /Bericht sturen/ }))

    expect(await screen.findByText(/Bericht verzonden/)).toBeInTheDocument()
    expect(send).toHaveBeenCalledWith(
      'svc',
      'tpl',
      expect.objectContaining({ from_name: 'Sanne de Vries', topic: 'Freelance project' }),
      expect.objectContaining({ publicKey: 'pub' }),
    )
    expect(screen.getByLabelText('Naam')).toHaveValue('')
  })

  it('toont een vriendelijke foutmelding als versturen mislukt', async () => {
    const send = vi.fn().mockRejectedValue({ status: 500, text: 'Server error' })
    const { user } = renderWithMotion(<ContactForm emailConfig={CONFIG} send={send} />)

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: /Bericht sturen/ }))

    expect(await screen.findByText(/Versturen is niet gelukt/)).toBeInTheDocument()
    expect(screen.getByLabelText('Naam')).toHaveValue('Sanne de Vries')
  })

  it('legt uit dat je even moet wachten als EmailJS de throttle raakt', async () => {
    const send = vi.fn().mockRejectedValue({ status: 429, text: 'Too Many Requests' })
    const { user } = renderWithMotion(<ContactForm emailConfig={CONFIG} send={send} />)

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: /Bericht sturen/ }))

    expect(await screen.findByText(/Wacht even/)).toBeInTheDocument()
    expect(screen.queryByText(/Versturen is niet gelukt/)).not.toBeInTheDocument()
  })

  it('haalt een oude melding weg zodra je verder typt', async () => {
    const send = vi.fn().mockRejectedValue({ status: 500 })
    const { user } = renderWithMotion(<ContactForm emailConfig={CONFIG} send={send} />)
    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: /Bericht sturen/ }))
    expect(await screen.findByText(/Versturen is niet gelukt/)).toBeInTheDocument()

    await user.type(screen.getByLabelText('Bericht'), '!')

    expect(screen.queryByText(/Versturen is niet gelukt/)).not.toBeInTheDocument()
  })

  it('valt zonder EmailJS-configuratie terug op een mailto-link', async () => {
    const openMailto = vi.fn()
    const { user } = renderWithMotion(<ContactForm emailConfig={null} openMailto={openMailto} />)

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: /Bericht sturen/ }))

    expect(openMailto).toHaveBeenCalledWith(expect.stringMatching(new RegExp(`^mailto:${site.email}\\?subject=`)))
    expect(screen.getByText(/mailprogramma is geopend/)).toBeInTheDocument()
  })

  it('verstuurt niets als het honeypot-veld is ingevuld', async () => {
    const send = vi.fn()
    const { user, container } = renderWithMotion(<ContactForm emailConfig={CONFIG} send={send} />)
    const honeypot = container.querySelector<HTMLInputElement>('.contact-form__honeypot input')!

    await user.type(honeypot, 'https://spam.example')
    await user.click(screen.getByRole('button', { name: /Bericht sturen/ }))

    expect(send).not.toHaveBeenCalled()
    expect(screen.getByText(/Bericht verzonden/)).toBeInTheDocument()
  })

  it('telt het aantal tekens in het bericht', async () => {
    const { user } = renderWithMotion(<ContactForm emailConfig={CONFIG} send={vi.fn()} />)

    await user.type(screen.getByLabelText('Bericht'), 'Hallo')

    expect(screen.getByText('5 / 2000')).toBeInTheDocument()
  })
})
