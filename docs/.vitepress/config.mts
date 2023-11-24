import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vue-prosemirror-render/',
  title: "Vue ProseMirror render",
  description: "A Vue3 plugin to render ProseMirror json data with components",
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
  }
})
