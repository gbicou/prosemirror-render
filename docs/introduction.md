# Introduction

The purpose is to render the ProseMirror state JSON data in your Vue applications without loading a full editor or schema.

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

## Packages

### [@bicou/prosemirror-render-vue](vue-plugin/index.md)

This Vue plugin is the base package which provides the `ProsemirrorRender` component
with a basic configuration to translate the marks and nodes of ProseMirror to basic HTML tags.

### [@bicou/prosemirror-render-nuxt](nuxt-module/index.md)

The Nuxt module which integrates the Vue plugin.

### [@bicou/prosemirror-render-nuxt-typography](nuxt-typography-layer/index.md)

A Nuxt layer combining the Nuxt module and the @nuxt-themes/typography layer 
to render ProseMirror documents with prose components.
