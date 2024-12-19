import { test, expect } from '@playwright/test'

test('render text style', async ({ page }) => {
  await page.goto('/text-style')

  const inter = page.getByTestId('inter')

  await expect(inter).toHaveCSS('font-family', 'Inter')
})
