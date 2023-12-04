<script setup lang="ts">
import { ProsemirrorRender } from "@bicou/prosemirror-render-vue";
import basic from "#examples/documents/basic.json";
</script>

<template>
  <div>
    <prosemirror-render :node="basic" />
  </div>
</template>
