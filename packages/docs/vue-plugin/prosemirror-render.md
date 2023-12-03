# ProsemirrorRender component

When you have to render a ProseMirror JSON content, you call the component with the `node` property :

```vue
<script setup>
// retrieved from where you stored the editor content  
const node = {...};
</script>

<template>
  <prosemirror-render :node="node" />
</template>
```
