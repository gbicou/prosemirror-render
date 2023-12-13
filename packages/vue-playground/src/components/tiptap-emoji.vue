<script setup lang="ts">
import { toRefs, computed } from "vue";
import { findEmojiByShortcode } from "../emojis";

const properties = defineProps<{
  name: string;
}>();

const { name } = toRefs(properties);

const emoji = computed(() => findEmojiByShortcode(name.value));
</script>

<template>
  <template v-if="emoji">{{ emoji }}</template>
  <template v-else>:{{ name }}:</template>
</template>
