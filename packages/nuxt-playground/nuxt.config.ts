export default defineNuxtConfig({
  extends: "../nuxt-module",
  modules: ["../nuxt-module/src/module"],
  prosemirrorRender: {},
  devtools: { enabled: true },
});
