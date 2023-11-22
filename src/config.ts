import type { Component } from "vue";
import type { InjectionKey } from "vue";

export interface Config {
  /** Map node types to component names */
  typeMap: Record<string, string | Component>;
}

export const key: InjectionKey<Config> = Symbol("prosemirror-config");

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
};
