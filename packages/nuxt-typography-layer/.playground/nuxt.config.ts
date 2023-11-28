export default defineNuxtConfig({
  extends: ['..'],
  alias: {
    "@bicou/prosemirror-render-vue": "../../vue-plugin/src/plugin.ts",
    "#examples": "../../examples",
  }
})
