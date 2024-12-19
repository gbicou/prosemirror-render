import { test, expect } from '@playwright/test'

test('render basic document', async ({ page }) => {
  await page.goto('/')

  const document = page.getByTestId('doc-basic')

  await expect(document).not.toBeEmpty()

  await expect(document).toHaveScreenshot()
})
