export default defineNuxtConfig({
  alias: {
    '@bicou/prosemirror-render-vue': '../vue-plugin/src/index.ts',
    '#examples': '../../examples',
  },

  modules: ['@nuxt/eslint'],
})
