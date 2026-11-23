import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type SyntheticEvent } from 'react'
import { m } from 'motion/react'
import { ArrowUpRight, ChevronLeft, ChevronRight, Lock, X } from 'lucide-react'
import { projectKindLabels } from '../../data/labels'
import { getProjectImages } from '../../data/projectImages'
import type { Project } from '../../types'
import BrandIcon from '../BrandIcons'
import ProjectPlaceholder from './ProjectPlaceholder'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const

/**
 * Projectdetails in een native <dialog>: de browser regelt de focus-trap,
 * maakt de rest van de pagina inert en sluit met Escape (via onCancel).
 */
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState(0)
  const images = getProjectImages(project.id)
  const current = images[index]
  const titleId = `project-modal-title-${project.id}`
  const hasGallery = images.length > 1

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null

    // Scrollen blokkeren gebeurt in CSS: html:has(.modal-dialog[open]) in global.css.
    if (!dialog.open) dialog.showModal()

    return () => {
      if (dialog.open) dialog.close()
      previouslyFocused?.focus()
    }
  }, [])

  const showImage = (next: number) => {
    if (images.length === 0) return
    setIndex((next + images.length) % images.length)
  }

  const onCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault()
    onClose()
  }

  // Klik op de achtergrond (het dialog-element zelf, buiten het paneel) sluit de modal.
  const onBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (!hasGallery) return
    if (event.key === 'ArrowRight') showImage(index + 1)
    if (event.key === 'ArrowLeft') showImage(index - 1)
  }

  return (
    <dialog
      ref={dialogRef}
      className="modal-dialog"
      aria-labelledby={titleId}
      onCancel={onCancel}
      onClick={onBackdropClick}
      onKeyDown={onKeyDown}
    >
      <m.div
        className="modal"
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
      >
        <button type="button" className="icon-btn modal__close" onClick={onClose} aria-label="Sluiten">
          <X aria-hidden="true" />
        </button>

        <div className="modal__layout">
          <div className="modal__gallery">
            <div className="modal__img-wrap">
              {current ? (
                <img src={current.src} alt={current.alt} className="modal__main-img" />
              ) : (
                <ProjectPlaceholder project={project} />
              )}

              {hasGallery && (
                <>
                  <button
                    type="button"
                    className="icon-btn modal__nav modal__nav--prev"
                    onClick={() => showImage(index - 1)}
                    aria-label="Vorige afbeelding"
                  >
                    <ChevronLeft aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="icon-btn modal__nav modal__nav--next"
                    onClick={() => showImage(index + 1)}
                    aria-label="Volgende afbeelding"
                  >
                    <ChevronRight aria-hidden="true" />
                  </button>
                  <span className="modal__counter" aria-live="polite">
                    {index + 1} / {images.length}
                  </span>
                </>
              )}
            </div>

            {hasGallery && (
              <div className="modal__thumbs">
                {images.map((image, i) => (
                  <button
                    key={image.src}
                    type="button"
                    className="modal__thumb"
                    onClick={() => showImage(i)}
                    aria-label={`Afbeelding ${i + 1}: ${image.alt}`}
                    aria-current={i === index ? 'true' : undefined}
                  >
                    <img src={image.src} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="modal__content">
            <div className="modal__meta">
              <span className={`badge badge--${project.kind}`}>{projectKindLabels[project.kind]}</span>
              <span className="modal__period">{project.period}</span>
            </div>

            <h2 className="modal__title" id={titleId}>
              {project.name}
            </h2>
            <p className="modal__description">{project.description}</p>

            {project.highlights.length > 0 && (
              <div className="modal__block">
                <h3 className="modal__subheading">Wat ik heb gebouwd</h3>
                <ul className="modal__highlights">
                  {project.highlights.map(highlight => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="modal__block">
              <h3 className="modal__subheading">Technologie</h3>
              <ul className="modal__tags">
                {project.tech.map(t => (
                  <li className="tag" key={t}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {project.note && (
              <p className="modal__note">
                <Lock aria-hidden="true" />
                {project.note}
              </p>
            )}

            {(project.live || project.github) && (
              <div className="modal__actions">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                    Live bekijken
                    <ArrowUpRight aria-hidden="true" />
                    <span className="sr-only">(opent in nieuw tabblad)</span>
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn--secondary">
                    <BrandIcon name="github" />
                    Code op GitHub
                    <span className="sr-only">(opent in nieuw tabblad)</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </m.div>
    </dialog>
  )
}
