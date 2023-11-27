<template>
  <div>
    <prosemirror-render :node="helloWorld" />
  </div>
</template>

<script setup lang="ts">
const helloWorld = { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Hello world!" }] }] };
</script>
