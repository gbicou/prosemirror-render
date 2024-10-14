<script setup lang="ts">
defineProps<{
  id: string
}>()
</script>

<template>
  <span>@{{ id }}</span>
</template>

<style scoped>
span {
  border: 1px solid #999;
  border-radius: 5px;
  padding: 2px 4px;
}
</style>
