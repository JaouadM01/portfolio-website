export type ProjectKind = 'freelance' | 'personal' | 'internship' | 'school' | 'volunteer'

export interface Project {
  /** Stabiele slug, gebruikt als React-key en in de URL (#project-<id>). */
  id: string
  name: string
  tagline: string
  description: string
  highlights: readonly string[]
  kind: ProjectKind
  period: string
  tech: readonly string[]
  github?: string
  live?: string
  note?: string
  featured?: boolean
}

export interface ProjectImage {
  src: string
  alt: string
}

export type ExperienceKind = 'internship' | 'freelance' | 'developer' | 'volunteer' | 'job'

export interface ExperienceItem {
  id: string
  role: string
  company: string
  kind: ExperienceKind
  /** Korte omschrijving van het dienstverband, bv. "Afstudeerstage" of "Parttime". */
  typeLabel: string
  period: string
  location?: string
  bullets: readonly string[]
  /** Bijbanen naast de studie worden ingeklapt weergegeven. */
  sideJob?: boolean
}

export type SkillColor = 'cyan' | 'purple' | 'green' | 'muted'

export interface SkillGroup {
  category: string
  color: SkillColor
  items: readonly string[]
}

export interface EducationItem {
  id: string
  title: string
  institution: string
  period: string
  note?: string
  current?: boolean
}

export interface Certificate {
  id: string
  title: string
  issuer?: string
  year?: string
}

export interface NavItem {
  id: string
  label: string
}

export type SocialIcon = 'linkedin' | 'github' | 'gitlab'

export interface SocialLink {
  label: string
  href: string
  icon: SocialIcon
  handle: string
}
