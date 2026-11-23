import type { SkillGroup } from '../types'

export const skills: readonly SkillGroup[] = [
  {
    category: 'Talen',
    color: 'cyan',
    items: ['C#', 'Java', 'Go', 'TypeScript', 'JavaScript', 'Python', 'SQL', 'HTML / CSS'],
  },
  {
    category: 'Frameworks',
    color: 'cyan',
    items: ['.NET / ASP.NET Core', 'Spring Boot', 'React', 'Next.js', 'Angular', 'React Native', 'Axon Framework', 'Shopify / Liquid'],
  },
  {
    category: 'Data & backend',
    color: 'purple',
    items: ['PostgreSQL', 'SQLite', "REST API's", 'CQRS & Event Sourcing', 'JWT / Spring Security'],
  },
  {
    category: 'DevOps & testen',
    color: 'purple',
    items: ['Docker', 'GitLab CI/CD', 'Vercel', 'XUnit', 'JUnit 5'],
  },
  {
    category: 'AI & integraties',
    color: 'green',
    items: ['Claude', 'Gemini API', 'Chatbots', 'Shopify Storefront API', 'Mailpit'],
  },
  {
    category: 'Design & toegankelijkheid',
    color: 'muted',
    items: ['UI/UX-design', 'WCAG', 'Responsive design', 'Design systems', 'UML'],
  },
]
