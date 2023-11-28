import MyModule from '../../../src/module'

export default defineNuxtConfig({
  extends: '../../..',
  modules: [
    [MyModule, {
      components: {
          italic: () => ['span', { class: "italic" }],
      }
    }]
  ]
})
