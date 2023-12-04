# Nuxt typography layer

Nuxt layer combining [Nuxt module](../nuxt-module/index.md) and [@nuxt-themes/typography](https://typography.nuxt.space/)

## Installation

To install the layer, you can run the following command with your preferred package manager :

```shell
pnpm install @bicou/prosemirror-render-nuxt-typography
```

## Usage

To use the layer, extends your `nuxt.config`:

::: code-group

```ts {4} [nuxt.config]
export default defineNuxtConfig({
  extends: [
    "@bicou/prosemirror-render-nuxt-typography",
    // ...
  ],
});
```

:::

## Configuration

You can override the types map the same way as for the [Nuxt module configuration](../nuxt-module/index.md#configuration).

You can configure the typography layer as described in [its documentation](https://typography.nuxt.space/#configuration).

## Example

::: code-group

```json [document]
{
  "type": "doc",
  "content": [
    {
      "type": "heading",
      "attrs": { "level": 2 },
      "content": [{ "type": "text", "text": "Simple" }]
    },
    {
      "type": "paragraph",
      "content": [
        { "type": "text", "text": "This is a " },
        { "type": "text", "marks": [{ "type": "strong" }], "text": "basic" },
        { "type": "text", "text": " example." }
      ]
    }
  ]
}
```

```vue [output equivalent]
<template>
  <div>
    <prose-h2>Simple</prose-h2>
    <prose-p>This is a <prose-strong>basic</prose-strong> example.</prose-p>
  </div>
</template>
```

### Demo

The playground of this layer is deployed at vercel here:

https://prosemirror-render-nuxt-typography.vercel.app

