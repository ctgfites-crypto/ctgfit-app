// @ts-check
import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:5199'

// ─── 1. HOME ─────────────────────────────────────────────────────────────────
test('home: carga y titular visible', async ({ page }) => {
  await page.goto(BASE)
  await expect(page).toHaveTitle(/CTG FIT/)
  const h1 = page.locator('h1')
  await expect(h1).toContainText('El sistema que te dice exactamente qué comer')
})

test('home: nav con los 4 enlaces', async ({ page }) => {
  await page.goto(BASE)
  await expect(page.locator('nav a[href="#plan"]')).toBeVisible()
  await expect(page.locator('nav a[href="#recursos"]')).toBeVisible()
  await expect(page.locator('nav a[href="#sobre"]')).toBeVisible()
})

test('home: sección Plan visible con 3 pasos', async ({ page }) => {
  await page.goto(BASE)
  await page.locator('#plan').scrollIntoViewIfNeeded()
  await expect(page.locator('.paso')).toHaveCount(3)
})

test('home: sección Recursos con 3 tarjetas', async ({ page }) => {
  await page.goto(BASE)
  await page.locator('#recursos').scrollIntoViewIfNeeded()
  await expect(page.locator('.prod')).toHaveCount(3)
})

// ─── 2. CALCULADORA ──────────────────────────────────────────────────────────
test('calculadora: carga con título correcto', async ({ page }) => {
  await page.goto(`${BASE}/calculadora`)
  await expect(page).toHaveTitle(/Calculadora de Macros/)
  await expect(page.locator('h1')).toContainText('Calculadora de Macros')
})

test('calculadora: flujo completo de 6 pasos', async ({ page }) => {
  await page.goto(`${BASE}/calculadora`)

  // Paso 1 — edad
  await page.locator('input[type="number"]').fill('22')
  await page.locator('.btn-primary').click()

  // Paso 2 — sexo
  await page.locator('.option', { hasText: 'Hombre' }).click()
  await page.locator('.btn-primary').click()

  // Paso 3 — peso
  await page.locator('input[type="number"]').fill('75')
  await page.locator('.btn-primary').click()

  // Paso 4 — altura
  await page.locator('input[type="number"]').fill('178')
  await page.locator('.btn-primary').click()

  // Paso 5 — actividad
  await page.locator('.option', { hasText: 'Moderado' }).click()
  await page.locator('.btn-primary').click()

  // Paso 6 — objetivo
  await page.locator('.option', { hasText: 'Definición' }).click()
  await page.locator('.btn-primary').click()

  // Resultado
  await expect(page.locator('.result-card')).toBeVisible()
  await expect(page.locator('.result-kcal')).toBeVisible()
  // Las 3 macros
  await expect(page.locator('.macro')).toHaveCount(3)
})

test('calculadora: validación edad inválida', async ({ page }) => {
  await page.goto(`${BASE}/calculadora`)
  await page.locator('input[type="number"]').fill('5')
  await page.locator('.btn-primary').click()
  await expect(page.locator('.field-error')).toBeVisible()
})

test('calculadora: botón Recalcular vuelve al inicio', async ({ page }) => {
  await page.goto(`${BASE}/calculadora`)
  // Completar flujo rápido con Enter en campos numéricos
  await page.locator('input[type="number"]').fill('25')
  await page.keyboard.press('Enter')
  await page.locator('.option').first().click()
  await page.locator('.btn-primary').click()
  await page.locator('input[type="number"]').fill('70')
  await page.keyboard.press('Enter')
  await page.locator('input[type="number"]').fill('175')
  await page.keyboard.press('Enter')
  await page.locator('.option').first().click()
  await page.locator('.btn-primary').click()
  await page.locator('.option').first().click()
  await page.locator('.btn-primary').click()
  await expect(page.locator('.result-card')).toBeVisible()
  await page.locator('button', { hasText: 'Recalcular' }).click()
  // Debe volver al paso 1
  await expect(page.locator('.step-label')).toContainText('Paso 1')
})

// ─── 3. MAILERLITE ───────────────────────────────────────────────────────────
test('home: div ml-embedded presente en sección lista', async ({ page }) => {
  await page.goto(BASE)
  const embed = page.locator('#lista .ml-embedded')
  await expect(embed).toBeAttached()
  // Verificar que no tiene display:none aplicado directamente
  const display = await embed.evaluate(el => getComputedStyle(el).display)
  expect(display).not.toBe('none')
})

// ─── 4. /legal ───────────────────────────────────────────────────────────────
test('legal: carga con título correcto', async ({ page }) => {
  await page.goto(`${BASE}/legal`)
  await expect(page).toHaveTitle(/Aviso legal/)
  await expect(page.locator('h1, h2').first()).toBeVisible()
})

test('legal: enlace de vuelta a home', async ({ page }) => {
  await page.goto(`${BASE}/legal`)
  // Hacer clic en el logo o enlace de vuelta
  await page.locator('a[href="/"]').first().click()
  await expect(page).toHaveURL(`${BASE}/`)
})
