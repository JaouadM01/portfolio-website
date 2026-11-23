import { expect, test } from '@playwright/test'

test.describe('portfolio', () => {
  test('laadt zonder console-fouten en toont de hero', async ({ page }) => {
    const errors: string[] = []
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text())
    })
    page.on('pageerror', error => errors.push(error.message))

    await page.goto('/')

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Jaouad')
    await expect(page.getByRole('link', { name: 'Bekijk mijn projecten' })).toBeVisible()
    expect(errors).toEqual([])
  })

  test('onthoudt het gekozen thema na herladen', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

    await page.getByRole('button', { name: 'Schakel over naar licht thema' }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')

    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  })

  test('opent een project, deelt de link via de URL en sluit met Escape', async ({ page }) => {
    await page.goto('/#projecten')

    await page.getByRole('button', { name: 'mooiprijsje.nl', exact: true }).click()
    const dialog = page.getByRole('dialog', { name: 'mooiprijsje.nl' })
    await expect(dialog).toBeVisible()
    await expect(page).toHaveURL(/#project-mooiprijsje$/)

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(page).toHaveURL(/#projecten$/)
  })

  test('opent direct het project uit een gedeelde link', async ({ page }) => {
    await page.goto('/#project-3ilm')

    await expect(page.getByRole('dialog', { name: '3ilm' })).toBeVisible()
  })

  test('filtert projecten op type', async ({ page }) => {
    await page.goto('/#projecten')

    await page.getByRole('button', { name: /^Freelance/ }).click()

    await expect(page.locator('.project-card')).toHaveCount(3)
  })

  test('valideert het contactformulier', async ({ page }) => {
    await page.goto('/#contact')

    await page.getByRole('button', { name: 'Bericht sturen' }).click()

    await expect(page.getByLabel('Naam')).toHaveAttribute('aria-invalid', 'true')
    await expect(page.getByLabel('Naam')).toBeFocused()
  })

  test('levert SEO-bestanden mee in de build', async ({ request }) => {
    for (const path of ['/robots.txt', '/sitemap.xml', '/llms.txt', '/og-image.png']) {
      const response = await request.get(path)
      expect(response.ok(), path).toBe(true)
    }
    expect(await (await request.get('/llms.txt')).text()).toContain("# Jaouad M'chichi")
  })
})

test.describe('mobiel', () => {
  test('navigeert via het hamburgermenu', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Alleen relevant op mobiel')
    await page.goto('/')

    await page.getByRole('button', { name: 'Menu openen' }).click()
    await page.locator('#mobile-menu').getByRole('link', { name: /Contact/ }).click()

    await expect(page.locator('#mobile-menu')).toBeHidden()
    await expect(page).toHaveURL(/#contact$/)
  })

  test('heeft geen elementen die buiten het scherm vallen', async ({ page }) => {
    await page.goto('/')

    // body heeft overflow-x: hidden, dus scrollWidth zegt niets: controleer de elementen zelf.
    const offenders = await page.evaluate(() => {
      const viewport = window.innerWidth
      return [...document.querySelectorAll('main *')]
        .filter(el => !el.closest('.code-card__body'))
        .filter(el => {
          const rect = el.getBoundingClientRect()
          return rect.width > 0 && rect.right > viewport + 1
        })
        .map(el => el.className || el.tagName)
        .slice(0, 5)
    })
    expect(offenders).toEqual([])
  })
})
