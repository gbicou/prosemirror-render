<template>
  <div>
    <prosemirror-render :node="helloWorld" />
  </div>
</template>

<script setup lang="ts">
import helloWorld from '../../../../../examples/documents/hello-world.json'
</script>
