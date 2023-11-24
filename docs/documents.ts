import type { ProseMirrorJSONNode } from "@bicou/vue-prosemirror-render";

export const p1: ProseMirrorJSONNode = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "a paragraph",
        },
      ],
    },
  ],
};

export default {};
