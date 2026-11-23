import { defineConfig, devices } from '@playwright/test'

const PORT = 4173
const BASE_URL = `http://localhost:${PORT}`

/**
 * E2E-tests draaien tegen de productiebuild (vite preview).
 * Standaard met de lokaal geïnstalleerde Chrome, zodat er geen extra browserdownload nodig is.
 * In CI: `npx playwright install chromium` en PW_CHANNEL leeg laten.
 */
const channel = process.env.PW_CHANNEL ?? (process.env.CI ? undefined : 'chrome')

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    ...(channel ? { channel } : {}),
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], ...(channel ? { channel } : {}) } },
    { name: 'mobile', use: { ...devices['Pixel 7'], ...(channel ? { channel } : {}) } },
  ],
  webServer: {
    command: `npm run build && npx vite preview --port ${PORT} --strictPort`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
})
