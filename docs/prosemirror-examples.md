<script setup lang="ts">
import { p1 } from "./documents";
</script>

# ProseMirror Examples

This page demonstrates the basics of ProseMirrorNode component.

## Basic document

**Input**

```js-vue
const node = {{ p1 }};
```

```vue
<prose-mirror-node :node="node" />
```

**Output**

```html
<div>
    <p>a paragraph</p>
</div>
```

<prose-mirror-node :node="p1" />
