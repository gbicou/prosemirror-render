import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.ts";
import { install } from "./index.ts";

createApp(App).use(router).use(install).mount("#app");
