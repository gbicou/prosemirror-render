<script setup lang="ts">
import { provideProsemirrorOptions, ProsemirrorRender } from "@bicou/prosemirror-render-vue";
import document from "#examples/documents/emoji.json";
import TiptapEmoji from "../components/tiptap-emoji.vue";

provideProsemirrorOptions({
  types: {
    emoji: () => TiptapEmoji,
  },
});
</script>

<template>
  <div>
    <prosemirror-render :node="document" />
  </div>
</template>
