import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { ProsemirrorRender } from "@bicou/prosemirror-render-vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // register your custom global components
    app.component("ProsemirrorRender", ProsemirrorRender);
  },
} satisfies Theme;
