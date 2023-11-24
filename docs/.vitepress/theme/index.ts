import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { ProseMirrorNode } from "@bicou/vue-prosemirror-render";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // register your custom global components
    app.component("ProseMirrorNode", ProseMirrorNode);
  },
} satisfies Theme;
