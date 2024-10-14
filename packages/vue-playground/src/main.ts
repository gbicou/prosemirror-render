import { createApp } from 'vue'
import App from './app.vue'
import router from './router.ts'
import VueProsemirrorPlugin from '@bicou/prosemirror-render-vue'

createApp(App).use(router).use(VueProsemirrorPlugin).mount('#app')
