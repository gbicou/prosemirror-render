# @bicou/prosemirror-render-vue

[📖 &nbsp;Documentation](https://gbicou.github.io/prosemirror-render/vue-plugin/)


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

