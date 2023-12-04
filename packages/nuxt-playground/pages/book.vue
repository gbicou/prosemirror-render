<template>
  <div>
    <prosemirror-render :node="node" />
  </div>
</template>

<script setup lang="ts">
import node from "#examples/documents/book.json";
</script>
