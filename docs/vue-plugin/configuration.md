# Configuration

## Types

The `types` key defines a map from Prosemirror types to Vnode names.

::: code-group

```ts [configuration]
createApp(App).use(ProsemirrorPlugin, {
  types: {
    // maps nodes with 'doc' type to HTML <article />
    doc: "article",
  },
});
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
          "text": "The line."
        }
      ]
    }
  ]
}
```

```html [result]
<article>
  <p>The line.</p>
</article>
```

:::

The key can be in snake_case or camelCase.

Unmatched types are rendered as is.

## Options provider

You can modify the types map locally with the `provideProsemirrorOptions` composable.

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

The `types` is merged with the current map and defined for descendant components like Vue provide / inject.

## Vnode attributes

You can define additional attributes or properties by using a tuple of the element and the attributes.

::: code-group

```ts [configuration]
{
  types: {
    // every node of type 'doc' will have the lang attribute set to 'en'
    doc: ["article", { lang: "en" }], // [element, attributes]
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
          "text": "The line."
        }
      ]
    }
  ]
}
```

```html [result]
<article lang="en">
    <p>The line.</p>
</article>
```

:::

This is useful when using CSS utilities framework like tailwind or unocss.

```ts
{
  types: {
    // adds 'my-10' class to all paragraphs
    paragraph: ["p", { class: "my-10" }],
  },
}
```

## ProseMirror attributes

The ProseMirror attributes of the node or mark data are available as the first argument when you use a function.

::: code-group

```ts [configuration]
{
  types: {
    // use the 'level' attribute from nodes of type 'header' to generate the tag name
    header: ({ level }) => `h${level}`,
  },
}
```

```json [document]
{
  "type": "doc",
  "content": [
    {
      "type": "header",
      "attrs": {
        "level": 1
      },
      "content": [
        {
          "type": "text",
          "text": "The header"
        }
      ]
    }
  ]
}
```

```html [result]
<div>
    <h1>The header</h1>
</div>
```

:::


A use case for the [Tiptap FontFamily extension](https://tiptap.dev/api/extensions/font-family) which generate TextStyle marks.

::: code-group

```ts [configuration]
{
  types: {
    // pass 'fontFamily' attribute to the 'font-family' CSS property of a span
    textStyle: ({ fontFamily }) => ["span", { style: { fontFamily } }],
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
              "type": "textStyle",
              "attrs": {
                "fontFamily": "serif"
              }
            }
          ],
          "text": "Serious people use serif fonts."
        }
      ]
    }
  ]
}
```

```html [result]
<div>
    <p><span style="font-family: serif;">Serious people use serif fonts.</span></p>
</div>
```

:::

## Custom components

You can even use your components, but you still have to use a function definition :

```ts
import { MyComponent } from "...";

provideProsemirrorOptions({
  types: {
    paragraph: () => MyComponent,
    // paragraph: MyComponent, // [WON'T WORK] // [!code error]
  },
});
```

The node or mark attributes will be available to the component as properties.


## Vue-router links

You can render marks of `link` type as `RouterLink` components from `vue-router`.

::: code-group

```ts [configuration]
{
  types: {
    // use 'href' attribute as the 'to' property of RouterLink and unset the href
    link: ({ href }) => ["router-link", { to: href, href: undefined }],
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
    <p><router-link to="/another-page">Go to another page</router-link></p>
</div>
```

Be aware that `RouterLink` warns if the `to` property is not in the router pages.

## Forbidden types

If you work with unsafe documents, you may want to disallow rendering of specific types (like `<script />` for example).

Set value to false in order to skip those types, rendered as HTML comments instead.

::: code-group

```ts [configuration]
{
  types: {
    script: false,
  },
}
```

```json [document]
{
  "type": "doc",
  "content": [
    {
      "type": "script",
      "content": [
        {
          "type": "text",
          "text": "console.log('unsafe code')"
        }
      ]
    }
  ]
}
```

```html [result]
<div>
    <!-- prosemirror type 'script' skipped -->
</div>
```

:::

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
