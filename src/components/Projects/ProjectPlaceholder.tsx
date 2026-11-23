import type { Project } from '../../types'

interface ProjectPlaceholderProps {
  project: Project
}

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join('')
}

/** Vervangt een screenshot bij projecten zonder afbeeldingen (bv. een privé-repository). */
export default function ProjectPlaceholder({ project }: ProjectPlaceholderProps) {
  return (
    <div className="project-placeholder" aria-hidden="true">
      <span className="project-placeholder__initials">{initialsOf(project.name)}</span>
      <span className="project-placeholder__label">{project.tech.slice(0, 3).join(' · ')}</span>
    </div>
  )
}
