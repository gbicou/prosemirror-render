<script setup lang="ts">
import { ProsemirrorRender } from "@bicou/prosemirror-render-vue";
import link from "#examples/documents/link.json";
</script>

<template>
  <div>
    <prosemirror-render :node="link" />
  </div>
</template>
