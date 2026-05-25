import { useState } from 'react'
import { projects } from '../../data/projects'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
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

        <div className="section-header">
          <span className="section-num">04</span>
          <h2 className="section-title">Projecten</h2>
          <div className="section-line" />
        </div>

        <div className="projects__filters">
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

        <div className="projects__grid">
          {filtered.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
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
