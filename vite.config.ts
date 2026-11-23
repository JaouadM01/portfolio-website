/// <reference types="vitest/config" />
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { projects } from './src/data/projects'
import { experience } from './src/data/experience'
import { site, socials } from './src/data/site'
import vercelConfig from './vercel.json' with { type: 'json' }

// Lokale preview krijgt dezelfde security-headers als productie (vercel.json is de bron),
// zodat CSP-problemen al in `npm run preview` en de E2E-tests zichtbaar worden.
// HSTS en upgrade-insecure-requests horen niet op http://localhost.
const PREVIEW_ONLY_SKIP = new Set(['Strict-Transport-Security'])
const previewHeaders: Record<string, string> = Object.fromEntries(
  (vercelConfig.headers[0]?.headers ?? [])
    .filter(header => !PREVIEW_ONLY_SKIP.has(header.key))
    .map(header => [header.key, header.value.replace(/;\s*upgrade-insecure-requests/, '')]),
)

const SITE_URL_PLACEHOLDER = /__SITE_URL__/g
const LOCAL_PREVIEW_URL = 'http://localhost:4173'

/**
 * Absolute URL van de site, nodig voor canonical, Open Graph en de sitemap.
 * Volgorde: VITE_SITE_URL > het productiedomein dat Vercel tijdens de build meegeeft > lokale preview.
 */
function resolveSiteUrl(env: Record<string, string>, isProductionBuild: boolean): string {
  const explicit = env.VITE_SITE_URL?.trim()
  const vercel = env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  const candidate = explicit || (vercel ? `https://${vercel}` : '')

  if (!candidate) {
    if (isProductionBuild) {
      console.warn(
        `\n⚠  Geen VITE_SITE_URL ingesteld: canonical, Open Graph en sitemap wijzen naar ${LOCAL_PREVIEW_URL}.\n` +
          '   Zet VITE_SITE_URL (of deploy op Vercel) voordat je live gaat.\n',
      )
    }
    return LOCAL_PREVIEW_URL
  }

  // Alleen een geldige http(s)-origin komt in de HTML, XML en JSON-LD terecht.
  const url = new URL(candidate)
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error(`VITE_SITE_URL moet met https:// beginnen, kreeg: ${candidate}`)
  }
  return url.origin
}

function buildLlmsTxt(siteUrl: string): string {
  const projectLines = projects.map(project => {
    const link = project.live ?? project.github ?? `${siteUrl}/#project-${project.id}`
    return `- [${project.name}](${link}): ${project.tagline} (${project.tech.join(', ')})`
  })
  const experienceLines = experience
    .filter(item => !item.sideJob)
    .map(item => `- ${item.role}, ${item.company} (${item.period})`)
  const socialLines = socials.map(social => `- ${social.label}: ${social.href}`)

  return [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    '## Contact',
    `- E-mail: ${site.email}`,
    ...socialLines,
    '',
    '## Projecten',
    ...projectLines,
    '',
    '## Ervaring',
    ...experienceLines,
    '',
  ].join('\n')
}

/** Genereert robots.txt, sitemap.xml en llms.txt bij de build, met de juiste absolute URL. */
function seoFiles(siteUrl: string): Plugin {
  return {
    name: 'portfolio-seo-files',
    // Functie als vervanger, zodat tekens als `$&` in de URL niet speciaal geïnterpreteerd worden.
    transformIndexHtml: html => html.replace(SITE_URL_PLACEHOLDER, () => siteUrl),
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          `  <url><loc>${siteUrl}/</loc><lastmod>${today}</lastmod></url>`,
          '</urlset>',
          '',
        ].join('\n'),
      })
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: buildLlmsTxt(siteUrl) })
    },
  }
}

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = resolveSiteUrl(env, command === 'build' && mode === 'production')

  return {
    plugins: [react(), seoFiles(siteUrl)],
    preview: { headers: previewHeaders },
    build: {
      target: 'es2022',
      // Assets onder 4 kB inline; screenshots blijven losse, cachebare bestanden.
      assetsInlineLimit: 4096,
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.ts'],
      css: false,
      include: ['src/**/*.test.{ts,tsx}'],
      restoreMocks: true,
      coverage: {
        provider: 'v8',
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['src/main.tsx', 'src/**/*.test.{ts,tsx}', 'src/test/**', 'src/types.ts'],
        thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
      },
    },
  }
})
