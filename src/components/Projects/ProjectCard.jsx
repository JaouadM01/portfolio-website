import './Projects.css'

const badgeLabels = {
  personal: 'Persoonlijk',
  freelance: 'Freelance',
  school: 'Schoolproject',
}

export default function ProjectCard({ project, onClick, featured = false, index = 0 }) {
  const { name, tagline, tech, badge, images, period } = project

  return (
    <article
      className={`project-card${featured ? ' project-card--featured' : ''}`}
      onClick={onClick} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      style={{ animationDelay: `${Math.min(index, 5) * 60}ms` }}
    >
      <div className="project-card__thumb">
        {images[0]
          ? <img src={images[0]} alt={`Screenshot van ${name}`} loading="lazy" />
          : <span className="project-card__thumb-label">[ screenshot ]</span>
        }
        <span className={`project-card__badge project-card__badge--${badge}`}>
          {badgeLabels[badge]}
        </span>
      </div>

      <div className="project-card__body">
        {featured && <span className="project-card__featured-label">Uitgelicht</span>}
        <h3 className="project-card__name">{name}</h3>
        <p className="project-card__tagline">{tagline}</p>
        <div className="project-card__tags">
          {tech.map(t => (
            <span className="tag tag--tech" key={t}>{t}</span>
          ))}
        </div>
      </div>

      <div className="project-card__footer">
        <span className="project-card__period">{period}</span>
        <span className="project-card__cta">Bekijk project</span>
      </div>
    </article>
  )
}
