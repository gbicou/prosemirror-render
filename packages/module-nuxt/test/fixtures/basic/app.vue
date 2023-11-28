<template>
  <div>
    <prosemirror-render :node="helloWorld" />
  </div>
</template>

<script setup lang="ts">
import helloWorld from "#examples/hello-world.json";
</script>
