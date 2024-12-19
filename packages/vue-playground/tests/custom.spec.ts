import { test, expect } from '@playwright/test'

test('render custom document', async ({ page }) => {
  await page.goto('/custom-component')

  const mention = page.getByTestId('jennifer-grey')

  await expect(mention).not.toBeEmpty()
  await expect(mention).toContainText('@Jennifer Grey')
})
