<script setup lang="ts">
import { ProsemirrorRender } from "@bicou/vue-prosemirror-render";

const node = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "Hi there,",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "this is a ",
        },
        {
          type: "text",
          marks: [
            {
              type: "italic",
              attrs: {
                "data-testid": "italic",
              },
            },
          ],
          text: "basic",
        },
        {
          type: "text",
          text: " example of ",
        },
        {
          type: "text",
          marks: [
            {
              type: "bold",
              attrs: {
                "data-testid": "bold",
              },
            },
          ],
          text: "tiptap",
        },
        {
          type: "text",
          text: ". Sure, there are all ",
        },
        {
          type: "text",
          marks: [
            {
              type: "code",
            },
          ],
          text: "kind",
        },
        {
          type: "text",
          text: " of basic text styles you’d probably expect from a text editor. But ",
        },
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
            {
              type: "italic",
            },
          ],
          text: "wait",
        },
        {
          type: "text",
          text: " until you see the lists:",
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "That’s a bullet list with one …",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "… or two list items.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Isn’t that great? But wait, there’s more. Let’s try a code block:",
        },
      ],
    },
    {
      type: "codeBlock",
      attrs: {
        language: "css",
      },
      content: [
        {
          type: "text",
          text: "body {\n  display: none;\n}",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.",
        },
      ],
    },
    {
      type: "blockquote",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Wow, that’s amazing. Good work, boy! 👏 ",
            },
            {
              type: "hardBreak",
            },
            {
              type: "text",
              text: "— Mom",
            },
          ],
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
