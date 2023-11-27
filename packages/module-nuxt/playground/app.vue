<template>
  <div>
    <h1>Nuxt module playground!</h1>
    <prosemirror-render :node="helloWorld" />
    <prosemirror-render :node="link" />
    <prosemirror-render :node="basic" />
  </div>
</template>

<script setup lang="ts">
import basic from "../../examples/basic.json";

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
