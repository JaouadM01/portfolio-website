import { useEffect, useState } from 'react'
import './Projects.css'

const badgeLabels = {
  personal: 'Persoonlijk',
  freelance: 'Freelance',
  school: 'Schoolproject',
}

export default function ProjectModal({ project, onClose }) {
  const { name, description, tech, badge, images, github, live, period, note } = project
  const [imgIndex, setImgIndex] = useState(0)

  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">

        <button className="modal__close" onClick={onClose} aria-label="Sluiten">&#x2715;</button>

        <div className="modal__layout">

          {images.length > 0 && (
            <div className="modal__gallery">
              <div className="modal__img-wrap">
                <img
                  src={images[imgIndex]}
                  alt={`Screenshot ${imgIndex + 1} van ${name}`}
                  className="modal__main-img"
                />
              </div>
              {images.length > 1 && (
                <div className="modal__thumbs">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      className={`modal__thumb${i === imgIndex ? ' modal__thumb--active' : ''}`}
                      onClick={() => setImgIndex(i)}
                      aria-label={`Afbeelding ${i + 1}`}
                    >
                      <img src={src} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="modal__content">
            <span className={`project-card__badge project-card__badge--${badge} modal__badge`}>
              {badgeLabels[badge]}
            </span>
            <h2 className="modal__title">{name}</h2>
            <span className="modal__period">{period}</span>

            <p className="modal__description">{description}</p>

            <div className="modal__tags">
              {tech.map(t => (
                <span className="tag tag--tech" key={t}>{t}</span>
              ))}
            </div>

            {note && (
              <div className="modal__note">
                <span className="modal__note-icon">&#x1F512;</span> {note}
              </div>
            )}

            <div className="modal__actions">
              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer" className="btn btn--secondary">
                  GitHub
                </a>
              )}
              {live && (
                <a href={live} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                  Live demo
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
