<script setup lang="ts">
import { ProsemirrorRender } from "@bicou/prosemirror-render-vue";
import basic from "#examples/basic.json";
</script>

<template>
  <div>
    <prosemirror-render :node="basic" />
  </div>
</template>

<style scoped></style>
