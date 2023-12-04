<script setup lang="ts">
import helloWorld from "#examples/documents/hello-world.json";
</script>

# ProseMirror Examples

This page demonstrates the basics of ProsemirrorRender component.

## Basic document

**Input**

```js-vue
const helloWorld = {{ helloWorld }};
```

```vue
<prosemirror-render :node="helloWorld" />
```

**Output**

```html
<div>
    <p>Hello world!</p>
</div>
```

<prosemirror-render :node="helloWorld" />
