export default defineNuxtConfig({
  extends: "../nuxt-module",
  modules: ["../nuxt-module/src/module", "@nuxt/eslint"],
  devtools: { enabled: true },
  postcss: {
    plugins: {
      "postcss-nesting": {},
    },
  },
});
