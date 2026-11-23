import type { ExperienceKind, ProjectKind } from '../types'

export const projectKindLabels: Record<ProjectKind, string> = {
  freelance: 'Freelance',
  personal: 'Persoonlijk',
  internship: 'Stage',
  school: 'Schoolproject',
  volunteer: 'Vrijwillig',
}

/** Volgorde waarin de projectfilters verschijnen. */
export const projectKindOrder: readonly ProjectKind[] = [
  'freelance',
  'internship',
  'volunteer',
  'personal',
  'school',
]

export const experienceKindLabels: Record<ExperienceKind, string> = {
  internship: 'Stage',
  freelance: 'Freelance',
  developer: 'Developer',
  volunteer: 'Vrijwillig',
  job: 'Werkervaring',
}
