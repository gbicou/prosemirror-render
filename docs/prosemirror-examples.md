<script setup lang="ts">
import { p1 } from "./documents";
</script>

# ProseMirror Examples

This page demonstrates the basics of ProsemirrorRender component.

## Basic document

**Input**

```js-vue
const node = {{ p1 }};
```

```vue
<prosemirror-render :node="node" />
```

**Output**

```html
<div>
    <p>a paragraph</p>
</div>
```

<prosemirror-render :node="p1" />
