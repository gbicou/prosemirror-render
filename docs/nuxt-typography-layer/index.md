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
