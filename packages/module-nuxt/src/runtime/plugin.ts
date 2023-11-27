import { defineNuxtPlugin } from '#app'
import VueProsemirrorPlugin from '@bicou/vue-prosemirror-render';
import {NuxtLink} from "#components";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueProsemirrorPlugin, {
    components: {
      link: (attrs) => [NuxtLink, { to: attrs.href ?? attrs.to }],
    }
  });
})
