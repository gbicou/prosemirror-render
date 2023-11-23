/**
 * JSON scalar values
 */
type JSONValue = string | number | boolean | { [x: string]: JSONValue } | Array<JSONValue> | null | undefined;

/**
 * JSON ProseMirror attributes
 */
export type Attrs = Record<string, JSONValue>;

/**
 * JSON ProseMirror common properties for Mark & Node
 */
export type Common = {
  readonly type: string;
  readonly attrs?: Attrs;
};

/**
 * JSON ProseMirror Mark
 */
export type Mark = Common;

/**
 * JSON ProseMirror Node
 */
export type Node = Common & {
  readonly marks?: Mark[];
  readonly content?: Node[];
  readonly text?: string;
};
