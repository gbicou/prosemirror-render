---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  # name: "ProsemirrorRender"
  text: "ProsemirrorRender"
  tagline: "Render ProseMirror JSON state data with Vue components or in a Nuxt application"
  actions:
    - theme: alt
      text: Introduction
      link: /introduction
    - theme: brand
      text: Vue plugin
      link: /vue-plugin/
    - theme: brand
      text: Nuxt module
      link: /nuxt-module/
#    - theme: alt
#      text: Examples
#      link: /prosemirror-examples
      
features:
  - title: Low dependencies
    details: Do not require to load an editor instance or a schema to render
  - title: Configurable
    details: Customize with your components for any node or mark type
  - title: SSR
    details: Compatible with Vue or Nuxt server-side rendering modes
---

