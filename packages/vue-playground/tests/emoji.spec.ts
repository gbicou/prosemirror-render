import { test, expect } from '@playwright/test'

test('renders emoji', async ({ page }) => {
  await page.goto('/emoji')

  await expect(page.getByTestId('emoji-smile')).toContainText('😄')
})
