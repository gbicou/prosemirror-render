import type { ProsemirrorJSONNode } from "@bicou/vue-prosemirror-render";

export const p1: ProsemirrorJSONNode = {
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
