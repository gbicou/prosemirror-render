# Vue plugin

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

This adds the [`ProsemirrorRender`](prosemirror-render.md) component to the Vue application with defaults types map configuration.

## Configuration

The output of the `ProsemirrorRender` component can be customized with the plugin's options.

The `types` key defines a map from Prosemirror types to Vnode names :

```ts
createApp(App).use(ProsemirrorPlugin, {
  types: {
    // maps nodes with 'doc' type to HTML <article />      
    doc: "article", 
  },
});
```

```html
<article><p>The line.</p></article>
```

## Options composable

You can modify the types map locally with the `provideProsemirrorOptions` composable :

```vue
<script setup lang="ts">
import { provideProsemirrorOptions } from "@bicou/prosemirror-render-vue";

provideProsemirrorOptions({
  types: {
    doc: "article",
  },
});
</script>

<template>
  <prosemirror-render node="node" />
</template>
```

The `types` is merged with the current map and defined for descendant components.

## Vnode attributes

You can define additional attributes or properties by using a tuple of the element and the attributes :

```ts
provideProsemirrorOptions({
  types: {
    // every node of type 'doc' will have the lang attribute set to 'en'
    doc: ["article", { lang: "en" }],
  },
});
```

```html
<article lang="en"><p>The line.</p></article>
```

This is useful when using CSS utilities framework like tailwind or unocss :

```ts
provideProsemirrorOptions({
  types: {
    // adds 'my-10' class to all paragraphs      
    paragraph: ["p", { class: "my-10" }],
  },
});
```

## ProseMirror attributes

The ProseMirror attributes of the node or mark data are available when you use a function :

```ts
provideProsemirrorOptions({
  types: {
    // use the 'level' attribute from nodes of type 'header' to generate the tag name 
    header: ({ level }) => `h${level}`,
  },
});
```

An example for the Tiptap FontFamily extension which generate TextStyle marks :

```ts
provideProsemirrorOptions({
  types: {
    // pass 'fontFamily' attribute to the 'font-family' CSS property of a span
    textStyle: ({ fontFamily }) => ["span", { style: { fontFamily } }],
  },
});
```

## Custom components

You can even use your components, but you will still have to use a function definition :

```ts
import { MyComponent } from "...";

provideProsemirrorOptions({
  types: {
    paragraph: () => MyComponent,
    // paragraph: MyComponent, // [WON'T WORK]  
  },
});
```

The node or mark attributes will be available to the component as properties.

## Default options

The default `types` map consist of the following HTML tag names :

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
