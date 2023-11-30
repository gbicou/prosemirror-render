# @bicou/prosemirror-render-nuxt-typography

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt layer to render [ProseMirror](https://prosemirror.net/) JSON data (from [Tiptap](https://tiptap.dev/) editor for example) through [Nuxt Typography](https://typography.nuxt.space/)

## Setup

Make sure to install the dependencies:

```bash
pnpm install @bicou/prosemirror-render-nuxt-typography
```

## Usage

Then add the dependency to their `extends` in `nuxt.config`:

```ts
defineNuxtConfig({
  extends: ['@bicou/prosemirror-render-nuxt-typography']
})
```

Use the `ProsemirrorRender` component to render the prosemirror node:

```vue
<script setup lang="ts">
// prosemirror document
const document = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Simple" }],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "This is a " },
        { type: "text", marks: [{ type: "strong" }], text: "basic" },
        { type: "text", text: " example." },
      ],
    },
    // ...
  ],
};
</script>

<template>
  <!-- render document through nuxt typography -->
  <prosemirror-render :node="document" />
</template>
```

This example translates to:

```html 
<div>
  <prose-h2>Simple</prose-h2>
  <prose-p>This is a <prose-strong>basic</prose-strong> example.</prose-p>
</div>
```

Consult online demo : https://prosemirror-render-nuxt-typography.vercel.app

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@bicou/prosemirror-render-nuxt-typography/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@bicou/prosemirror-render-nuxt-typography

[npm-downloads-src]: https://img.shields.io/npm/dm/@bicou/prosemirror-render-nuxt-typography.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@bicou/prosemirror-render-nuxt-typography

[license-src]: https://img.shields.io/npm/l/@bicou/prosemirror-render-nuxt-typography.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@bicou/prosemirror-render-nuxt-typography

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
