export default defineNuxtConfig({
  extends: ['..'],
  alias: {
    "@bicou/prosemirror-render-vue": "../../vue-plugin/src/index.ts",
    "@bicou/prosemirror-render-nuxt": "../../nuxt-module/src/module.ts",
    "#examples": "../../examples",
  },
  devtools: { enabled: true }
})
