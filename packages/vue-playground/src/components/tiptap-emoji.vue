<script setup lang="ts">
import emojis from "emojibase-data/en/compact.json";
import shortcodes from "emojibase-data/en/shortcodes/emojibase.json";
import { joinShortcodes } from "emojibase";
import { toRefs, computed } from "vue";

const emojisCodes = joinShortcodes(emojis, [shortcodes]);

const properties = defineProps<{
  name: string;
}>();

const { name } = toRefs(properties);

const emoji = computed(() => {
  return emojisCodes.find((emoji) => {
    return emoji.shortcodes?.includes(name.value) || emoji.tags?.includes(name.value);
  });
});
</script>

<template>
  <template v-if="emoji">{{ emoji.unicode }}</template>
  <template v-else>:{{ name }}:</template>
</template>
