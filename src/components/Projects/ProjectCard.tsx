import { ArrowUpRight } from 'lucide-react'
import { projectKindLabels } from '../../data/labels'
import { getProjectImages } from '../../data/projectImages'
import type { Project } from '../../types'
import ProjectPlaceholder from './ProjectPlaceholder'

const MAX_TAGS = 5

interface ProjectCardProps {
  project: Project
  featured?: boolean
  onOpen: (id: string) => void
}

export default function ProjectCard({ project, featured = false, onOpen }: ProjectCardProps) {
  const { id, name, tagline, tech, kind, period, live } = project
  const cover = getProjectImages(id)[0]
  const shownTags = tech.slice(0, featured ? tech.length : MAX_TAGS)
  const hiddenCount = tech.length - shownTags.length

  return (
    <article className={`project-card${featured ? ' project-card--featured' : ''}`} id={`project-${id}`}>
      <div className="project-card__thumb">
        {cover ? (
          <img src={cover.src} alt="" loading="lazy" decoding="async" />
        ) : (
          <ProjectPlaceholder project={project} />
        )}
        <span className={`badge badge--${kind} project-card__badge`}>{projectKindLabels[kind]}</span>
      </div>

      <div className="project-card__body">
        {featured && <span className="project-card__featured-label">Uitgelicht</span>}
        <h3 className="project-card__name">
          <button
            type="button"
            className="project-card__open"
            onClick={() => onOpen(id)}
            aria-haspopup="dialog"
          >
            {name}
          </button>
        </h3>
        <p className="project-card__tagline">{tagline}</p>
        <ul className="project-card__tags" aria-label="Gebruikte technologie">
          {shownTags.map(t => (
            <li className="tag" key={t}>
              {t}
            </li>
          ))}
          {hiddenCount > 0 && (
            <li className="tag tag--more" aria-label={`en nog ${hiddenCount}`}>
              +{hiddenCount}
            </li>
          )}
        </ul>
      </div>

      <div className="project-card__footer">
        <span className="project-card__period">{period}</span>
        <div className="project-card__footer-actions">
          {live && (
            <a
              href={live}
              className="project-card__live"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} live bekijken (opent in nieuw tabblad)`}
            >
              Live
              <ArrowUpRight aria-hidden="true" />
            </a>
          )}
          <span className="project-card__cta" aria-hidden="true">
            Details →
          </span>
        </div>
      </div>
    </article>
  )
}
