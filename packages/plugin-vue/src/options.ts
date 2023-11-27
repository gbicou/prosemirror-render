import type { Component } from "vue";
import type { InjectionKey } from "vue";
import { ProsemirrorJSONAttributes } from "./prosemirror-json";

export type VueProsemirrorComponent = string | Component;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VueProsemirrorComponentAndProperties = [VueProsemirrorComponent, Record<string, any>];
export type VueProsemirrorComponentReturns = VueProsemirrorComponent | VueProsemirrorComponentAndProperties;
export type VueProsemirrorComponentFunction = (attributes: ProsemirrorJSONAttributes) => VueProsemirrorComponentReturns;
export type VueProsemirrorComponentOption = string | VueProsemirrorComponentAndProperties | VueProsemirrorComponentFunction;

export type VueProsemirrorComponents = Record<string, VueProsemirrorComponentOption>;

export interface VueProsemirrorOptions {
  /** Map node types to component names */
  components: VueProsemirrorComponents;
}

export const VueProsemirrorOptionsKey: InjectionKey<VueProsemirrorOptions> = Symbol("prosemirror-options");

export const defaultOptions: VueProsemirrorOptions = {
  components: {
    doc: "div",
    heading: ({ level }) => (level ? `h${level}` : "header"),
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
    strike: "s",
    underline: "u",
    subscript: "sub",
    superscript: "sup",
    highlight: "mark",
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
