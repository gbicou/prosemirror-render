import { createApp } from "vue";
import App from "./app.vue";
import router from "./router.ts";
import VueProseMirrorPlugin from "@bicou/vue-prosemirror-render";

createApp(App).use(router).use(VueProseMirrorPlugin).mount("#app");
