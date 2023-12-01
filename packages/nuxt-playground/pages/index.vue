<template>
  <div>
    <prosemirror-render :node="helloWorld" />
    <prosemirror-render :node="link" />
    <prosemirror-render :node="basic" />
  </div>
</template>

<script setup lang="ts">
import basic from "#examples/basic.json";
import helloWorld from "#examples/hello-world.json";

const link = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        { type: "text", text: "This is a link to " },
        { type: "link", attrs: { href: "https://nuxt.com", target: "_blank" }, content: [{ type: "text", text: "Nuxt" }] },
      ],
    },
  ],
};
</script>
