<template>
  <div>
    <h1>Nuxt module playground!</h1>
    <prosemirror-render :node="helloWorld" />
    <prosemirror-render :node="link" />
  </div>
</template>

<script setup lang="ts">
const helloWorld = { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Hello world!" }] }] };

const link = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        { type: "text", text: "This is a link to " },
        { type: "link", attrs: { to: "https://nuxt.com", "target": "_blank" }, content: [{ type: "text", text: "Nuxt" }] },
      ],
    },
  ],
};
</script>
