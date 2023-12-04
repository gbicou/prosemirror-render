import { defineConfig } from 'vitepress'
import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/prosemirror-render/',
  title: "ProsemirrorRender",
  description: "A Vue plugin and Nuxt module to render ProseMirror json data with components",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Vue plugin', link: '/vue-plugin/' },
      { text: 'Nuxt module', link: '/nuxt-module/' },
      { text: 'Nuxt typography layer', link: '/nuxt-typography-layer/' },
    ],

    sidebar: [
      { text: 'Introduction', link: '/introduction' },
      { text: 'Vue plugin', link: '/vue-plugin/' },
      { text: 'Configuration', link: '/vue-plugin/configuration' },
      { text: 'Nuxt module', link: '/nuxt-module/' },
      { text: 'Nuxt typography layer', link: '/nuxt-typography-layer/' },
      /*
      {
        text: 'Examples',
        items: [
          { text: 'Examples', link: '/prosemirror-examples' },
        ]
      }
      */
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/gbicou/prosemirror-render' }
    ],

    search: {
      provider: 'local'
    }
  },
  vite: {
    resolve: {
      alias: {
        "@bicou/prosemirror-render-vue": resolve(__dirname, "../../packages/vue-plugin/src/index.ts"),
        "#examples": resolve(__dirname, "../../examples"),
      }
    }
  }
})
