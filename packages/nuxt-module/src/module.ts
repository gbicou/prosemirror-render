import { defineNuxtModule, addPlugin, createResolver, addComponent, addImports } from "@nuxt/kit";
import type { VueProsemirrorOptions } from "@bicou/prosemirror-render-vue";

declare module "nuxt/schema" {
  interface AppConfigInput {
    prosemirror?: Partial<VueProsemirrorOptions>;
  }
}

export default defineNuxtModule({
  meta: {
    name: "prosemirror-render",
    configKey: "prosemirrorRender",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup() {
    const resolver = createResolver(import.meta.url);

    addComponent({
      name: "ProsemirrorRender",
      export: "ProsemirrorRender",
      filePath: "@bicou/prosemirror-render-vue",
    });

    addImports({
      name: "provideProsemirrorOptions",
      from: "@bicou/prosemirror-render-vue",
    });

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve("./runtime/plugin"));
  },
});
