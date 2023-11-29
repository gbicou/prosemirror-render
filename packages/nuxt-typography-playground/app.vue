<script setup lang="ts">
import basic from "#examples/basic.json";
</script>

<template>
  <prosemirror-render id="basic" :node="basic" />
</template>

<style>
#basic {
  margin: 0 auto;
  max-width: 80ch;
  padding: 2em;
}
</style>
