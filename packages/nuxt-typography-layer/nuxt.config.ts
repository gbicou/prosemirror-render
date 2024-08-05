// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["@nuxt-themes/typography"],
  modules: ["@bicou/prosemirror-render-nuxt", "@nuxt/eslint"],
});
