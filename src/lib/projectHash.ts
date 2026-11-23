import { projects } from '../data/projects'

export const PROJECT_HASH_PREFIX = '#project-'

export function projectHash(id: string): string {
  return `${PROJECT_HASH_PREFIX}${id}`
}

/** Haalt het project-id uit een hash als #project-mooiprijsje, alleen als dat project bestaat. */
export function getProjectIdFromHash(hash: string): string | null {
  if (!hash.startsWith(PROJECT_HASH_PREFIX)) return null

  let id: string
  try {
    id = decodeURIComponent(hash.slice(PROJECT_HASH_PREFIX.length))
  } catch {
    // Ongeldige percent-encoding (bv. "#project-%"): behandel als onbekend project in plaats van te crashen.
    return null
  }
  return projects.some(project => project.id === id) ? id : null
}
