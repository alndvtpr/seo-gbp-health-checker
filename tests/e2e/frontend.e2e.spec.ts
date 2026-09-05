import { test, expect } from '@playwright/test'

test.describe('Frontend Canonical Website Coverage', () => {
  test('homepage renders with accurate SEO title, skip link, and hero heading', async ({ page }) => {
    const response = await page.goto('/')
    expect(response?.status()).toBe(200)

    // Accurate title from metadata
    await expect(page).toHaveTitle(/Alain Dave Tapiru/i)
    await expect(page).toHaveTitle(/SEO Specialist/i)

    // Skip to main content accessibility link
    const skipLink = page.locator('a[href="#main-content"]')
    await expect(skipLink).toBeAttached()

    // Hero H1 heading
    const h1 = page.locator('h1').first()
    await expect(h1).toBeVisible()
    await expect(h1).toContainText(/SEO Specialist & Web Developer in the Philippines/i)
  })

  test('global navigation links are present and accessible', async ({ page }) => {
    await page.goto('/')

    // Verify main navigation landmark exists (Primary navigation in desktop shell)
    const nav = page.locator('nav[aria-label="Primary navigation"]')
    await expect(nav).toBeAttached()

    // Verify key canonical destinations are linked
    await expect(page.locator('a[href="/about/"]').first()).toBeAttached()
    await expect(page.locator('a[href="/services/"]').first()).toBeAttached()
    await expect(page.locator('a[href="/projects/"]').first()).toBeAttached()
    await expect(page.locator('a[href="/tools/"]').first()).toBeAttached()
    await expect(page.locator('a[href="/resume/"]').first()).toBeAttached()
    await expect(page.locator('a[href="/contact/"]').first()).toBeAttached()
  })

  test('canonical pages respond with HTTP 200 and valid semantic headings', async ({ page }) => {
    const routes = ['/about/', '/services/', '/projects/', '/tools/', '/resume/', '/contact/']

    for (const route of routes) {
      const res = await page.goto(route)
      expect(res?.status(), `Route ${route} should return HTTP 200`).toBe(200)
      const heading = page.locator('h1').first()
      await expect(heading, `Route ${route} should have a visible H1`).toBeVisible()
    }
  })

  test('tools suite renders interactive Local SEO & GBP Health Checker card', async ({ page }) => {
    await page.goto('/tools/')
    const gbpCard = page.locator('#gbp-checker')
    await expect(gbpCard).toBeVisible()
    await expect(gbpCard).toContainText(/Local SEO & GBP Health Checker/i)
  })

  test('dual framing security headers match production invariant', async ({ request }) => {
    // 1. General HTML route framing protection: DENY / frame-ancestors 'none'
    const htmlRes = await request.get('/')
    expect(htmlRes.status()).toBe(200)
    const htmlHeaders = htmlRes.headers()
    expect(htmlHeaders['x-frame-options']?.toUpperCase()).toBe('DENY')
    expect(htmlHeaders['content-security-policy']).toContain("frame-ancestors 'none'")

    // 2. Resume PDF same-origin framing exception: SAMEORIGIN / frame-ancestors 'self'
    const pdfRes = await request.get('/Alain_Dave_Tapiru_Resume.pdf')
    expect(pdfRes.status()).toBe(200)
    const pdfHeaders = pdfRes.headers()
    expect(pdfHeaders['x-frame-options']?.toUpperCase()).toBe('SAMEORIGIN')
    expect(pdfHeaders['content-security-policy']).toContain("frame-ancestors 'self'")
  })
})

