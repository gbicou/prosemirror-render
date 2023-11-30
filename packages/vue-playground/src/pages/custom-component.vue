<script setup lang="ts">
import { provideProsemirrorOptions, ProsemirrorRender, type ProsemirrorJSONNode } from "@bicou/prosemirror-render-vue";
import PmMention from "../components/pm-mention.vue";

provideProsemirrorOptions({
  types: {
    mention: () => PmMention,
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
          text: "Hi everyone! Don’t forget the daily stand up at 8 AM.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "mention",
          attrs: {
            id: "Jennifer Grey",
          },
        },
        {
          type: "text",
          text: " Would you mind to share what you’ve been working on lately? We fear not much happened since Dirty Dancing.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "mention",
          attrs: {
            id: "Winona Ryder",
          },
        },
        {
          type: "text",
          text: " ",
        },
        {
          type: "mention",
          attrs: {
            id: "Axl Rose",
          },
        },
        {
          type: "text",
          text: " Let’s go through your most important points quickly.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "I have a meeting with ",
        },
        {
          type: "mention",
          attrs: {
            id: "Christina Applegate",
          },
        },
        {
          type: "text",
          text: " and don’t want to come late.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "– Thanks, your big boss",
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
