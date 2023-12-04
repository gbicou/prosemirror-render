<template>
  <div>
    <prosemirror-render :node="basic" />
  </div>
</template>

<script setup lang="ts">
import basic from "#examples/documents/basic.json";
</script>
