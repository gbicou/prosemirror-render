import { defineConfig } from 'vitepress'
import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/prosemirror-render/',
  title: "Prosemirror render",
  description: "A Vue3+Nuxt plugin to render ProseMirror json data with components",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/prosemirror-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Examples', link: '/prosemirror-examples' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/gbicou/vue-prosemirror-render' }
    ]
  },
  vite: {
    resolve: {
      alias: {
        "@bicou/prosemirror-render-vue": resolve(__dirname, "../../vue-plugin/src/index.ts"),
        "#examples": resolve(__dirname, "../../examples"),
      }
    }
  }
})
