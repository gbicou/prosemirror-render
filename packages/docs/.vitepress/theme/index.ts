import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { ProsemirrorRender } from "@bicou/vue-prosemirror-render";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // register your custom global components
    app.component("ProsemirrorRender", ProsemirrorRender);
  },
} satisfies Theme;
