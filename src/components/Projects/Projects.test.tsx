import { screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { projects } from '../../data/projects'
import { renderWithMotion } from '../../test/render'
import { getProjectIdFromHash } from '../../lib/projectHash'
import Projects from './Projects'

const featured = projects.find(project => project.featured)!
const withGallery = projects.find(project => project.id === 'remindly')!

function cardTitles(): string[] {
  return screen
    .getAllByRole('button', { name: /.+/ })
    .filter(button => button.classList.contains('project-card__open'))
    .map(button => button.textContent ?? '')
}

describe('Projects', () => {
  afterEach(() => {
    window.history.replaceState(null, '', '/')
  })

  it('toont alle projecten en markeert het uitgelichte project', () => {
    renderWithMotion(<Projects />)

    expect(cardTitles()).toHaveLength(projects.length)
    expect(screen.getByText('Uitgelicht')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^Alles/ })).toHaveAttribute('aria-pressed', 'true')
  })

  it('filtert op type en kondigt het aantal aan voor schermlezers', async () => {
    const { user } = renderWithMotion(<Projects />)
    const freelanceCount = projects.filter(project => project.kind === 'freelance').length

    await user.click(screen.getByRole('button', { name: /^Freelance/ }))

    expect(cardTitles()).toHaveLength(freelanceCount)
    expect(screen.getByRole('button', { name: /^Freelance/ })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText(`${freelanceCount} projecten in Freelance`)).toBeInTheDocument()
    expect(screen.queryByText('Uitgelicht')).not.toBeInTheDocument()
  })

  it('opent een project in een dialoog, zet de URL-hash en sluit weer', async () => {
    const { user } = renderWithMotion(<Projects />)

    await user.click(screen.getByRole('button', { name: featured.name }))

    const dialog = screen.getByRole('dialog', { name: featured.name })
    expect(dialog).toHaveAttribute('open')
    expect(window.location.hash).toBe(`#project-${featured.id}`)
    expect(within(dialog).getByRole('link', { name: /Live bekijken/ })).toHaveAttribute('href', featured.live)

    await user.click(within(dialog).getByRole('button', { name: 'Sluiten' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(window.location.hash).toBe('#projecten')
  })

  it('sluit de dialoog met Escape (cancel-event)', async () => {
    const { user } = renderWithMotion(<Projects />)
    await user.click(screen.getByRole('button', { name: featured.name }))

    screen.getByRole('dialog').dispatchEvent(new Event('cancel', { cancelable: true }))

    expect(await screen.findByRole('heading', { name: 'Projecten' }, {})).toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('bladert door de screenshots met knoppen en pijltjestoetsen', async () => {
    const { user } = renderWithMotion(<Projects />)
    await user.click(screen.getByRole('button', { name: withGallery.name }))
    const dialog = screen.getByRole('dialog')

    expect(within(dialog).getByText('1 / 4')).toBeInTheDocument()
    await user.click(within(dialog).getByRole('button', { name: 'Volgende afbeelding' }))
    expect(within(dialog).getByText('2 / 4')).toBeInTheDocument()
    await user.keyboard('{ArrowLeft}{ArrowLeft}')
    expect(within(dialog).getByText('4 / 4')).toBeInTheDocument()
    await user.click(within(dialog).getByRole('button', { name: /^Afbeelding 2:/ }))
    expect(within(dialog).getByText('2 / 4')).toBeInTheDocument()
  })

  it('opent direct het project uit een gedeelde link', () => {
    window.history.replaceState(null, '', `/#project-${withGallery.id}`)

    renderWithMotion(<Projects />)

    expect(screen.getByRole('dialog', { name: withGallery.name })).toBeInTheDocument()
  })

  it('toont een placeholder en notitie voor projecten zonder screenshots', async () => {
    const { user } = renderWithMotion(<Projects />)

    await user.click(screen.getByRole('button', { name: 'Gatekeeper' }))

    const dialog = screen.getByRole('dialog')
    expect(within(dialog).queryByRole('img')).not.toBeInTheDocument()
    expect(within(dialog).getByText('Privé GitLab-repository')).toBeInTheDocument()
  })
})

describe('getProjectIdFromHash', () => {
  it('herkent alleen bestaande projecten', () => {
    expect(getProjectIdFromHash('#project-remindly')).toBe('remindly')
    expect(getProjectIdFromHash('#project-bestaat-niet')).toBeNull()
    expect(getProjectIdFromHash('#contact')).toBeNull()
  })

  it('crasht niet op ongeldige percent-encoding in een gedeelde link', () => {
    expect(getProjectIdFromHash('#project-%')).toBeNull()
    expect(getProjectIdFromHash('#project-%E0%A4%A')).toBeNull()
  })

  it('laat de pagina werken bij een kapotte projectlink', () => {
    window.history.replaceState(null, '', '/#project-%E0%A4%A')

    renderWithMotion(<Projects />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Projecten' })).toBeInTheDocument()
  })
})
