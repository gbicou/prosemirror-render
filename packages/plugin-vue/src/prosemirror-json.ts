/**
 * JSON ProseMirror attributes
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Attrs = Record<string, any>;

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
