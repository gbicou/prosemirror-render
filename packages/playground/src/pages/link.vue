<script setup lang="ts">
import { ProseMirrorNode, type ProseMirrorJSONNode } from "@bicou/vue-prosemirror-render";

const node: ProseMirrorJSONNode = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Wow, this has support for links to the whole ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://en.wikipedia.org/wiki/World_Wide_Web",
                class: null,
              },
            },
          ],
          text: "world wide web",
        },
        {
          type: "text",
          text: ". We tested a lot of URLs and I think you can add *every URL* you want. Isn’t that cool? Let’s try ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://google.com",
                target: "_blank",
              },
            },
          ],
          text: "another one!",
        },
        {
          type: "text",
          text: " Yep, seems to work.",
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
