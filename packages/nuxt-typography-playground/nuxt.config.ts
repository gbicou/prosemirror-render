export default defineNuxtConfig({
  extends: ['@bicou/prosemirror-render-nuxt-typography'],

  alias: {
    '@bicou/prosemirror-render-vue': '../vue-plugin/src/index.ts',
    '@bicou/prosemirror-render-nuxt': '../nuxt-module/src/module.ts',
    '#examples': '../../examples',
  },

  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
})
