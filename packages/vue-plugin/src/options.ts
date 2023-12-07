import { type Component, type InjectionKey, inject, provide } from "vue";
import type { ProsemirrorJSONAttributes } from "./prosemirror-json";
import defu from "defu";

export type VueProsemirrorComponent = string | Component | false;
export type VueProsemirrorComponentAndProperties = [VueProsemirrorComponent, Record<string, unknown>];
export type VueProsemirrorComponentReturns = VueProsemirrorComponent | VueProsemirrorComponentAndProperties;
export type VueProsemirrorComponentFunction = (attributes: ProsemirrorJSONAttributes) => VueProsemirrorComponentReturns;
export type VueProsemirrorComponentOption =
  | string
  | VueProsemirrorComponentAndProperties
  | VueProsemirrorComponentFunction
  | false;

export type VueProsemirrorTypes = Record<string, VueProsemirrorComponentOption>;

export interface VueProsemirrorOptions {
  /** Map ProseMirror node and mark types to Vue components and properties */
  types: VueProsemirrorTypes;
}

export const VueProsemirrorOptionsKey: InjectionKey<VueProsemirrorOptions> = Symbol("prosemirror-options");

export const defaultOptions: VueProsemirrorOptions = {
  types: {
    doc: "div",
    heading: ({ level }) => [level ? `h${level}` : "header", { level: undefined }],
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

/**
 * Updates the ProseMirror plugin options.
 * @param options - The new options to merge with current.
 */
export function provideProsemirrorOptions(options: Partial<VueProsemirrorOptions>) {
  provide(VueProsemirrorOptionsKey, defu(options, inject(VueProsemirrorOptionsKey, defaultOptions)));
}
