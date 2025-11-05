import { createApp } from 'vue'
import App from './app.vue'
import router from './router.ts'
import VueProsemirrorPlugin from '@bicou/prosemirror-render-vue'
import './main.css'

createApp(App).use(router).use(VueProsemirrorPlugin as never).mount('#app')
