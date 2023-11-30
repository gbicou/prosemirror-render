<script setup lang="ts">
import { provideProsemirrorOptions, ProsemirrorRender, type ProsemirrorJSONNode } from "@bicou/prosemirror-render-vue";

provideProsemirrorOptions({
  types: {
    link: "router-link",
  },
});

const node: ProsemirrorJSONNode = {
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
                to: "/etc",
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
                to: "/table",
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
    <prosemirror-render :node="node" />
  </div>
</template>
