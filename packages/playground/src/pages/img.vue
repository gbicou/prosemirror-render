<script setup lang="ts">
import { ProseMirrorNode } from "@bicou/vue-prosemirror-render";

const node = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This is a basic example of implementing images.",
        },
      ],
    },
    {
      type: "image",
      attrs: {
        src: "https://source.unsplash.com/8xznAGy4HcY/800x400",
      },
    },
    {
      type: "image",
      attrs: {
        src: "https://source.unsplash.com/K9QHL52rE2k/800x400",
      },
    },
  ],
};
</script>

<template>
  <div>
    <prose-mirror-node :node="node" />
  </div>
</template>

<style scoped></style>
