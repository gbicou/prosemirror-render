import type { Component } from "vue";

interface Config {
  /** Map node types to component names */
  typeMap: Record<string, string | Component>;
  /** Use shiki code highlighter for code block, requires shiki-es to be installed as dependencies */
  shiki:
    | false
    | {
        theme: string;
      };
}

export const typographyProsemirror: Config = {
  typeMap: {
    doc: "ProseMirrorDocument",
    paragraph: "ProseMirrorParagraph",
    code: "prose-code-inline",
    code_block: "prose-mirror-code-block",
    link: "prose-a",
    horizontal_rule: "prose-hr",
    bold: "prose-strong",
    strong: "prose-strong",
    italic: "prose-em",
    em: "prose-em",
    blockquote: "prose-blockquote",
    bullet_list: "prose-ul",
    ordered_list: "prose-ol",
    list_item: "prose-li",
    image: "prose-img",
    table_row: "prose-tr",
    table_header: "prose-th",
    table_cell: "prose-td",
  },
  shiki: false,
};

export const defaultConfig: Config = {
  typeMap: {
    doc: "div",
    heading: "h[level]",
    paragraph: "p",
    code: "code",
    code_block: "pre",
    link: "a",
    horizontal_rule: "hr",
    hard_break: "br",
    bold: "b",
    strong: "strong",
    italic: "i",
    em: "em",
    subscript: "sub",
    superscript: "sup",
    blockquote: "blockquote",
    bullet_list: "ul",
    ordered_list: "ol",
    list_item: "li",
    image: "img",
    table: "table",
    table_row: "tr",
    table_header: "th",
    table_cell: "td",
  },
  shiki: false,
};
