import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { setup, $fetch } from "@nuxt/test-utils/e2e";

describe("module ProsemirrorRender", async () => {
  await setup({
    rootDir: fileURLToPath(new URL("fixtures/options", import.meta.url)),
  });

  it("accepts custom options", async () => {
    expect.hasAssertions();

    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch("/");

    expect(html).toContain('<span data-testid="italic" class="italic">basic</span>');
  });
});
