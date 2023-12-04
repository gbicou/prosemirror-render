import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import ProsemirrorRenderVue from "@bicou/prosemirror-render-vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(ProsemirrorRenderVue);
  },
} satisfies Theme;
