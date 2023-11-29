import { defineNuxtPlugin } from "#app";
import VueProsemirrorPlugin from "@bicou/prosemirror-render-vue";
import { options } from "#prosemirror-options";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueProsemirrorPlugin, options);
});
