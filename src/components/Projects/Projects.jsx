import { useState } from 'react'
import { projects } from '../../data/projects'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import SectionHeader from '../SectionHeader'
import './Projects.css'

const filters = ['Alles', 'Persoonlijk', 'Freelance', 'Schoolproject']

export default function Projects() {
  const [active, setActive] = useState('Alles')
  const [selected, setSelected] = useState(null)

  const filtered = active === 'Alles'
    ? projects
    : projects.filter(p => p.type === active)

  return (
    <section className="projects" id="projecten">
      <div className="projects__inner">

        <SectionHeader
          num="04"
          title="Projecten"
          subtitle="Een selectie van wat ik heb gebouwd — persoonlijk, freelance en op school."
        />

        <div className="projects__filters" data-reveal>
          {filters.map(f => (
            <button
              key={f}
              className={`filter-btn${active === f ? ' filter-btn--active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="projects__grid" data-reveal>
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              featured={active === 'Alles' && i === 0}
              index={i}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>

      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
