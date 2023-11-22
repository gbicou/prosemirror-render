import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.ts";
import { VueProseMirrorPlugin } from "./index.ts";

createApp(App).use(router).use(VueProseMirrorPlugin).mount("#app");
