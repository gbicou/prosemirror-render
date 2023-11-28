<script setup lang="ts">
import { ProsemirrorRender } from "@bicou/prosemirror-render-vue";
import link from "#examples/link.json";
</script>

<template>
  <div>
    <prosemirror-render :node="link" />
  </div>
</template>

<style scoped></style>
