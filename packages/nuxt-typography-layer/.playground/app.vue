<script setup lang="ts">
import basic from "#examples/basic.json";
</script>

<template>
  <prosemirror-render :node="basic" id="basic" />
</template>

<style>
#basic {
  margin: 0 auto;
  max-width: 80ch;
  padding: 2em;
}
</style>
