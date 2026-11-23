import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { projects } from '../../data/projects'
import { projectKindLabels, projectKindOrder } from '../../data/labels'
import { getProjectIdFromHash, projectHash } from '../../lib/projectHash'
import type { ProjectKind } from '../../types'
import Reveal from '../Reveal'
import SectionHeader from '../SectionHeader'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import './Projects.css'

type Filter = 'all' | ProjectKind

const SECTION_HASH = '#projecten'
const CARD_STAGGER_S = 0.05
const MAX_STAGGERED = 6

const filters: readonly { value: Filter; label: string; count: number }[] = [
  { value: 'all', label: 'Alles', count: projects.length },
  ...projectKindOrder
    .map(kind => ({
      value: kind,
      label: projectKindLabels[kind],
      count: projects.filter(project => project.kind === kind).length,
    }))
    .filter(option => option.count > 0),
]

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('all')
  const [selectedId, setSelectedId] = useState<string | null>(() =>
    getProjectIdFromHash(window.location.hash),
  )

  // Een met de hand aangepaste hash opent of sluit het juiste project. Openen en sluiten zelf
  // gebruiken replaceState, zodat de modal geen extra stappen in de browsergeschiedenis maakt.
  useEffect(() => {
    const onHashChange = () => setSelectedId(getProjectIdFromHash(window.location.hash))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const openProject = useCallback((id: string) => {
    setSelectedId(id)
    window.history.replaceState(null, '', projectHash(id))
  }, [])

  const closeProject = useCallback(() => {
    setSelectedId(null)
    window.history.replaceState(null, '', SECTION_HASH)
  }, [])

  const visible = filter === 'all' ? projects : projects.filter(project => project.kind === filter)
  const selected = projects.find(project => project.id === selectedId) ?? null
  const activeLabel = filters.find(option => option.value === filter)?.label ?? 'Alles'

  return (
    <section className="section projects" id="projecten" aria-labelledby="projecten-title">
      <div className="container">
        <SectionHeader
          num="02"
          title="Projecten"
          titleId="projecten-title"
          subtitle="Een selectie van wat ik heb gebouwd: freelance, tijdens stages, vrijwillig, persoonlijk en op school."
        />

        <Reveal>
          <div className="projects__filters" role="group" aria-label="Filter projecten op type">
            {filters.map(option => (
              <button
                key={option.value}
                type="button"
                className="filter-btn"
                aria-pressed={filter === option.value}
                onClick={() => setFilter(option.value)}
              >
                {option.label}
                <span className="filter-btn__count">{option.count}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <p className="sr-only" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'project' : 'projecten'} in {activeLabel}
        </p>

        <ul className="projects__grid" key={filter}>
          {visible.map((project, i) => {
            const featured = filter === 'all' && Boolean(project.featured)
            return (
              <m.li
                key={project.id}
                className={featured ? 'projects__item--featured' : undefined}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                transition={{ duration: 0.5, delay: Math.min(i, MAX_STAGGERED) * CARD_STAGGER_S }}
              >
                <ProjectCard project={project} featured={featured} onOpen={openProject} />
              </m.li>
            )
          })}
        </ul>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal key={selected.id} project={selected} onClose={closeProject} />}
      </AnimatePresence>
    </section>
  )
}
