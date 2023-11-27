<script setup lang="ts">
import { ProsemirrorRender } from "@bicou/vue-prosemirror-render";
import basic from "../../../examples/basic.json";
</script>

<template>
  <div>
    <prosemirror-render :node="basic" />
  </div>
</template>

<style scoped></style>
