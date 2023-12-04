# Nuxt module

Integrates the [Vue plugin](../vue-plugin/index.md) in a [Nuxt](https://nuxt.com/) application.

## Installation

To install the module, you can run the following command with your preferred package manager:

```shell
pnpm install @bicou/prosemirror-render-nuxt
```


## Usage

To use the module, add the following options to your `nuxt.config` file:

::: code-group

```ts {3} [nuxt.config]
export default defineNuxtConfig({
  modules: [
    "@bicou/prosemirror-render-nuxt"
    // ...
  ],
});
```

:::


Then you case use ProsemirrorRender component in your nuxt app.

```vue
<script setup>
// retrieved from where you stored the editor content  
const document = {
  type: "doc",
  // ...
};
</script>

<template>
  <prosemirror-render :node="document" />
</template>
```


## Configuration

To configure the module, use the `prosemirror` key in your `app.config`:

::: code-group

```ts [app.config]
export default defineAppConfig({
  // ...
  prosemirror: {
    types: {
      doc: ["section", { class: "prosemirror" }],
    },
  },
});
```

::: 

Please refer to [Vue plugin configuration](../vue-plugin/configuration.md) for more types definitions.


### NuxtLink

You can render marks of `link` type as `NuxtLink` components.

::: code-group

```ts [configuration]
{
  types: {
    // use 'href' attribute as the 'to' property of NuxtLink and unset the href
    link: ({ href }) => ["nuxt-link", { to: href, href: undefined }],
  },
}
```

```json [document]
{
  "type": "doc",
  "content": [
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "marks": [
            {
              "type": "link",
              "attrs": {
                "href": "/another-page"
              }
            }
          ],
          "text": "Go to another page"
        }
      ]
    }
  ]
}
```

```html [result]
<div>
    <p><nuxt-link to="/another-page">Go to another page</nuxt-link></p>
</div>
```
