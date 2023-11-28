import { defineNuxtPlugin } from '#app'
import VueProsemirrorPlugin from '@bicou/vue-prosemirror-render';
import { options } from "#prosemirror-options";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueProsemirrorPlugin, options);
})
