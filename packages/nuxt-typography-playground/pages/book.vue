<template>
  <div>
    <prosemirror-render :node="book" />
  </div>
</template>

<script setup lang="ts">
import book from "#examples/documents/book.json";
</script>
