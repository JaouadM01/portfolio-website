import { describe, expect, it } from 'vitest'
import { projects } from './projects'
import { projectImages } from './projectImages'
import { experience } from './experience'
import { skills } from './skills'
import { certificates, education } from './education'
import { navItems } from './navigation'
import { projectKindLabels, projectKindOrder } from './labels'
import { socials } from './site'

const unique = <T,>(values: readonly T[]) => new Set(values).size === values.length

describe('projectdata', () => {
  it('heeft unieke, URL-veilige ids', () => {
    expect(unique(projects.map(p => p.id))).toBe(true)
    for (const project of projects) expect(project.id).toMatch(/^[a-z0-9-]+$/)
  })

  it('heeft precies één uitgelicht project', () => {
    expect(projects.filter(p => p.featured)).toHaveLength(1)
  })

  it('gebruikt alleen bekende projecttypen, elk met een filtervolgorde', () => {
    for (const project of projects) {
      expect(projectKindLabels[project.kind]).toBeDefined()
      expect(projectKindOrder).toContain(project.kind)
    }
  })

  it('heeft alleen https-links naar code en live demo', () => {
    for (const project of projects) {
      for (const url of [project.github, project.live].filter(Boolean)) {
        expect(url).toMatch(/^https:\/\//)
      }
    }
  })

  it('heeft voor elk project een beschrijving, tech-stack en highlights', () => {
    for (const project of projects) {
      expect(project.description.length).toBeGreaterThan(40)
      expect(project.tech.length).toBeGreaterThan(0)
      expect(project.highlights.length).toBeGreaterThan(0)
    }
  })

  it('koppelt screenshots alleen aan bestaande projecten, elk met alt-tekst', () => {
    const ids = new Set(projects.map(p => p.id))
    for (const [id, images] of Object.entries(projectImages)) {
      expect(ids.has(id)).toBe(true)
      for (const image of images) expect(image.alt.trim().length).toBeGreaterThan(10)
    }
  })
})

describe('overige data', () => {
  it('heeft unieke ids voor ervaring, opleiding en certificaten', () => {
    expect(unique(experience.map(e => e.id))).toBe(true)
    expect(unique(education.map(e => e.id))).toBe(true)
    expect(unique(certificates.map(c => c.id))).toBe(true)
  })

  it('heeft geen lege skillgroepen of dubbele skills binnen een groep', () => {
    for (const group of skills) {
      expect(group.items.length).toBeGreaterThan(0)
      expect(unique(group.items)).toBe(true)
    }
  })

  it('heeft unieke navigatie-ankers', () => {
    expect(unique(navItems.map(n => n.id))).toBe(true)
  })

  it('linkt socials via https', () => {
    for (const social of socials) expect(social.href).toMatch(/^https:\/\//)
  })
})
