<script setup lang="ts">
import { ProsemirrorRender, useProsemirrorOptions } from "@bicou/prosemirror-render-vue";

useProsemirrorOptions({
  components: {
    // pass fontFamily attribute to font-family style of a span
    textStyle: ({ fontFamily }) => ["span", { style: { fontFamily } }],
  },
});

const node = {
  type: "doc",
  from: 0,
  to: 268,
  content: [
    {
      type: "paragraph",
      from: 0,
      to: 63,
      content: [
        {
          type: "text",
          from: 1,
          to: 62,
          marks: [
            {
              type: "textStyle",
              attrs: {
                fontFamily: "Inter",
              },
            },
          ],
          text: "Did you know that Inter is a really nice font for interfaces?",
        },
      ],
    },
    {
      type: "paragraph",
      from: 63,
      to: 111,
      content: [
        {
          type: "text",
          from: 64,
          to: 110,
          marks: [
            {
              type: "textStyle",
              attrs: {
                fontFamily: "Comic Sans MS, Comic Sans",
              },
            },
          ],
          text: "It doesn’t look as professional as Comic Sans.",
        },
      ],
    },
    {
      type: "paragraph",
      from: 111,
      to: 151,
      content: [
        {
          type: "text",
          from: 112,
          to: 150,
          marks: [
            {
              type: "textStyle",
              attrs: {
                fontFamily: "serif",
              },
            },
          ],
          text: "Serious people use serif fonts anyway.",
        },
      ],
    },
    {
      type: "paragraph",
      from: 151,
      to: 200,
      content: [
        {
          type: "text",
          from: 152,
          to: 199,
          marks: [
            {
              type: "textStyle",
              attrs: {
                fontFamily: "monospace",
              },
            },
          ],
          text: "The cool kids can apply monospace fonts aswell.",
        },
      ],
    },
    {
      type: "paragraph",
      from: 200,
      to: 266,
      content: [
        {
          type: "text",
          from: 201,
          to: 265,
          marks: [
            {
              type: "textStyle",
              attrs: {
                fontFamily: "cursive",
              },
            },
          ],
          text: "But hopefully we all can agree, that cursive fonts are the best.",
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

<style scoped></style>
