# @bicou/prosemirror-render-vue

This plugin allows you to render ProseMirror JSON data in your Vue applications.
It provides a Vue component that translates ProseMirror nodes and marks to customizable Vue components or HTML elements.

- _From ProseMirror JSON :_

```json
{
  "type": "doc",
  "content": [
    {
      "type": "paragraph",
      "attrs": {
        "id": "the-line"
      },
      "content": [
        {
          "type": "text",
          "text": "The line."
        }
      ]
    }
  ]
}
```

- _Through Vue Vnodes :_

```ts
h("div", [h("p", { id: "the-line" }, "The line.")]);
```

- _To DOM :_

```html
<div><p id="the-line">The line.</p></div>
```

## Installation

To install the plugin, you can run the following command with your preferred package manager :

```shell
npm install @bicou/prosemirror-render-vue
```

## Usage

### Vue plugin

To use the plugin, you first need to import it into your Vue application.
You can do this by adding the following lines to your file :

```ts
import { createApp } from "vue";
import App from "./app.vue";
import ProsemirrorPlugin from "@bicou/prosemirror-render-vue";

createApp(App).use(ProsemirrorPlugin).mount("#app");
```

This adds the `ProsemirrorRender` component to the Vue application with defaults components configuration.

### ProsemirrorRender component

When you have to render a ProseMirror JSON content, you call the component with the `node` property :

```vue
<script setup>
const node = {...}; // retrieved from where you stored the editor content
</script>

<template>
  <prosemirror-render node="node" />
</template>
```

## Configuration

The output of the `ProsemirrorRender` component can be customized with the plugin's options.

The `components` key defines a map from Prosemirror types to Vnode names :

```ts
createApp(App).use(ProsemirrorPlugin, {
  components: {
    doc: "article", // maps nodes with 'doc' type to HTML <article> 
  },
});
```

```html
<article><p>The line.</p></article>
```

## Options composable

You can modify the components map locally with the `useProsemirrorOptions` composable :

```vue
<script setup lang="ts">
import { useProsemirrorOptions } from "@bicou/prosemirror-render-vue";

useProsemirrorOptions({
  components: {
    doc: "article",
  },
});
</script>

<template>
  <prosemirror-render node="node" />
</template>
```

## Vnode attributes

You can define additional attributes or properties by using a tuple of the element and the attributes :

```ts
useProsemirrorOptions({
  components: {
    doc: ["article", { lang: "en" }],
  },
});
```

```html
<article lang="en"><p>The line.</p></article>
```

This is useful when using CSS utilities framework like tailwind or unocss :

```ts
useProsemirrorOptions({
  components: {
    paragraph: ["p", { class: "my-10" }],
  },
});
```

## ProseMirror attributes

The ProseMirror attributes of the node or mark data are available when you use a function :

```ts
useProsemirrorOptions({
  components: {
    header: ({ level }) => `h${level}`,
  },
});
```

An example for the Tiptap FontFamily extension which generate TextStyle marks :

```ts
useProsemirrorOptions({
  components: {
    // pass fontFamily attribute to font-family style of a span
    textStyle: ({ fontFamily }) => ["span", { style: { fontFamily } }],
  },
});
```

## Custom components

You can even use your components, but you will still have to use a function :

```ts
import { MyComponent } from "...";

useProsemirrorOptions({
  components: {
    paragraph: () => MyComponent,
  },
});
```

The node or mark attributes will be available to your component as properties.

## Default options

The `components` is merged with the following default type to element map :

| ProseMirror type  | Vue vnode name         |
|-------------------|------------------------|
| `doc`             | `div`                  |
| `heading`         | `h[level]` or `header` |
| `paragraph`       | `p`                    |
| `code`            | `code`                 |
| `code_block`      | `pre`                  |
| `link`            | `a`                    |
| `horizontal_rule` | `hr`                   |
| `hard_break`      | `br`                   |
| `bold`            | `b`                    |
| `strong`          | `strong`               |
| `italic`          | `i`                    |
| `em`              | `em`                   |
| `strike`          | `s`                    |
| `underline`       | `u`                    |
| `subscript`       | `sub`                  |
| `superscript`     | `sup`                  |
| `highlight`       | `mark`                 |
| `blockquote`      | `blockquote`           |
| `bullet_list`     | `ul`                   |
| `ordered_list`    | `ol`                   |
| `list_item`       | `li`                   |
| `image`           | `img`                  |
| `table`           | `table`                |
| `table_row`       | `tr`                   |
| `table_header`    | `th`                   |
| `table_cell`      | `td`                   |
