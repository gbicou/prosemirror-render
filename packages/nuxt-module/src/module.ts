import { defineNuxtModule, addPlugin, createResolver, addTemplate, addComponent } from "@nuxt/kit";
import serialize from "serialize-javascript";
import type { VueProsemirrorComponents } from "@bicou/prosemirror-render-vue";

// Module options TypeScript interface definition
export interface ModuleOptions {
  components: VueProsemirrorComponents;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "prosemirror-render",
    configKey: "prosemirrorRender",
  },
  // Default configuration options of the Nuxt module
  defaults: {
    components: {},
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    addComponent({
      name: "ProsemirrorRender",
      export: "ProsemirrorRender",
      filePath: "@bicou/prosemirror-render-vue",
    });

    nuxt.options.alias["#prosemirror-options"] = addTemplate({
      filename: "prosemirror-options.mjs",
      getContents: () => {
        return `export const options = ${serialize(options)};`;
      },
    }).dst;

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve("./runtime/plugin"));
  },
});
