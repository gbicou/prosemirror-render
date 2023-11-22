<script setup lang="ts">
// import ProseMirrorNode from "../components/ProseMirrorNode.ts";

const node = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This is a paragraph.",
        },
      ],
    },
    {
      type: "horizontalRule",
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "And this is another paragraph.",
        },
      ],
    },
    {
      type: "horizontalRule",
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "But between those paragraphs are horizontal rules.",
        },
      ],
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
