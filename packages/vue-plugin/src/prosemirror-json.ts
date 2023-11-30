/**
 * JSON scalar values
 */
export type ProsemirrorJSONValue =
  | string
  | number
  | boolean
  | { [name: string]: ProsemirrorJSONValue }
  | ProsemirrorJSONValue[]
  | null
  | undefined;

/**
 * JSON ProseMirror attributes
 */
export type ProsemirrorJSONAttributes = Record<string, ProsemirrorJSONValue>;

/**
 * JSON ProseMirror common properties for Mark & Node
 */
export interface ProsemirrorJSONCommon {
  type: string;
  attrs?: ProsemirrorJSONAttributes;
}

/**
 * JSON ProseMirror Mark
 */
export type ProsemirrorJSONMark = ProsemirrorJSONCommon & {
  [other: string]: unknown;
};

/**
 * JSON ProseMirror Node
 */
export type ProsemirrorJSONNode = ProsemirrorJSONCommon & {
  marks?: ProsemirrorJSONMark[];
  content?: ProsemirrorJSONNode[];
  text?: string;
  [other: string]: unknown;
};
