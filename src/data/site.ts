import type { SocialLink } from '../types'

export const site = {
  firstName: 'Jaouad',
  lastName: "M'chichi",
  name: "Jaouad M'chichi",
  role: 'Full-stack Software Developer',
  email: 'jaouadmchichi@hotmail.com',
  graduation: 'januari 2027',
  availability: 'Afstuderend jan. 2027 · open voor een junior-functie & freelance',
  tagline:
    'Van .NET en Java tot React en AI-integraties. Ik bouw het hele project, van ontwerp tot deploy.',
  description:
    "Portfolio van Jaouad M'chichi: full-stack software developer (.NET, Java, React, TypeScript). Afstuderend HBO-ICT in januari 2027, open voor een junior-functie en freelance opdrachten.",
  sourceCode: 'https://github.com/JaouadM01/portfolio-website',
} as const

export const socials: readonly SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jaouadmchichi/',
    icon: 'linkedin',
    handle: 'jaouadmchichi',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/JaouadM01',
    icon: 'github',
    handle: 'JaouadM01',
  },
  {
    label: 'GitLab',
    href: 'https://gitlab.com/Jaouad_M01',
    icon: 'gitlab',
    handle: 'Jaouad_M01',
  },
]

/** Rollen die de typewriter in de hero afwisselt. */
export const heroRoles: readonly string[] = [
  'Full-stack Developer',
  '.NET & Java backend',
  'React & TypeScript',
  'AI-integraties',
]
