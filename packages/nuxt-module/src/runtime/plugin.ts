import { defineNuxtPlugin, useAppConfig } from '#app'
import VueProsemirrorPlugin from '@bicou/prosemirror-render-vue'

export default defineNuxtPlugin((nuxtApp) => {
  const { prosemirror } = useAppConfig()
  nuxtApp.vueApp.use(VueProsemirrorPlugin, prosemirror ?? {})
})
