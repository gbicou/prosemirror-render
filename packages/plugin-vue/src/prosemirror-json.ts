/**
 * JSON scalar values
 */
export type ProseMirrorJSONValue =
  | string
  | number
  | boolean
  | { [x: string]: ProseMirrorJSONValue }
  | Array<ProseMirrorJSONValue>
  | null
  | undefined;

/**
 * JSON ProseMirror attributes
 */
export type ProseMirrorJSONAttrs = Record<string, ProseMirrorJSONValue>;

/**
 * JSON ProseMirror common properties for Mark & Node
 */
export type ProseMirrorJSONCommon = {
  type: string;
  attrs?: ProseMirrorJSONAttrs;
};

/**
 * JSON ProseMirror Mark
 */
export type ProseMirrorJSONMark = ProseMirrorJSONCommon;

/**
 * JSON ProseMirror Node
 */
export type ProseMirrorJSONNode = ProseMirrorJSONCommon & {
  marks?: ProseMirrorJSONMark[];
  content?: ProseMirrorJSONNode[];
  text?: string;
};
