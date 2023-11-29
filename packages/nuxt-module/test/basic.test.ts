import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { setup, $fetch } from "@nuxt/test-utils";

describe("module ProsemirrorRender", async () => {
  await setup({
    rootDir: fileURLToPath(new URL("fixtures/basic", import.meta.url)),
  });

  it("renders the hello world document", async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch("/");
    expect(html).toContain("<p>Hello world!</p>");
  });
});
