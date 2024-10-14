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
  | undefined

/**
 * JSON ProseMirror attributes
 */
export type ProsemirrorJSONAttributes = Record<string, ProsemirrorJSONValue>

/**
 * JSON ProseMirror common properties for Mark & Node
 */
export interface ProsemirrorJSONElement {
  // The type of element that this is.
  type: string
  // An object mapping attribute names to values.
  attrs?: ProsemirrorJSONAttributes
}

/**
 * JSON ProseMirror Mark
 */
export type ProsemirrorJSONMark = ProsemirrorJSONElement & {
  [other: string]: unknown
}

/**
 * JSON ProseMirror Node
 */
export type ProsemirrorJSONNode = ProsemirrorJSONElement & {
  // The marks applied to this node.
  marks?: ProsemirrorJSONMark[]
  // A fragment holding the node's children.
  content?: ProsemirrorJSONNode[]
  // For text nodes, this contains the node's text content.
  text?: string
  [other: string]: unknown
}
