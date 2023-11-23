<script setup lang="ts">
import { ProseMirrorNode } from "@bicou/vue-prosemirror-render";

const node = {
  type: "doc",
  content: [
    {
      type: "table",
      content: [
        {
          type: "tableRow",
          content: [
            {
              type: "tableHeader",
              attrs: {
                colspan: 1,
                rowspan: 1,
              },
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Name",
                    },
                  ],
                },
              ],
            },
            {
              type: "tableHeader",
              attrs: {
                colspan: 3,
                rowspan: 1,
              },
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Description",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "tableRow",
          content: [
            {
              type: "tableCell",
              attrs: {
                colspan: 1,
                rowspan: 1,
              },
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Cyndi Lauper",
                    },
                  ],
                },
              ],
            },
            {
              type: "tableCell",
              attrs: {
                colspan: 1,
                rowspan: 1,
              },
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "singer",
                    },
                  ],
                },
              ],
            },
            {
              type: "tableCell",
              attrs: {
                colspan: 1,
                rowspan: 1,
              },
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "songwriter",
                    },
                  ],
                },
              ],
            },
            {
              type: "tableCell",
              attrs: {
                colspan: 1,
                rowspan: 1,
              },
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "actress",
                    },
                  ],
                },
              ],
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
    <prose-mirror-node :node="node" />
  </div>
</template>

<style scoped></style>
