import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import ProsemirrorRenderVue from "@bicou/prosemirror-render-vue";
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(ProsemirrorRenderVue);
  },
} satisfies Theme;
