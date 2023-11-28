import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch } from '@nuxt/test-utils'

describe('Prosemirror module', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/options', import.meta.url)),
  })

  it('accepts custom options', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch('/')
    expect(html).toContain('<span data-testid="italic" class="italic">basic</span>')
  })
})
