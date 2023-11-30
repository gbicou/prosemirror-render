import {
  type Component,
  type PropType,
  computed,
  defineComponent,
  h,
  inject,
  mergeProps,
  resolveComponent,
  toRefs,
  Text,
} from "vue";
import { camelCase, kebabCase, snakeCase } from "change-case";
import type { ProsemirrorJSONCommon, ProsemirrorJSONNode } from "../prosemirror-json";
import {
  VueProsemirrorOptionsKey,
  defaultOptions,
  type VueProsemirrorComponentAndProperties,
  type VueProsemirrorTypes,
} from "../options";

/**
 * Resolves the component for the given ProseMirror node or mark.
 * @param node - The ProseMirror node or mark.
 * @param types - Mapping from node type to element or component.
 * @returns - The component to render the node or mark.
 */
export function resolveProseComponent(
  node: ProsemirrorJSONCommon,
  types: VueProsemirrorTypes,
): VueProsemirrorComponentAndProperties {
  // translate type to component or element
  const option = types[snakeCase(node.type)] ?? types[camelCase(node.type)] ?? kebabCase(node.type);

  // call option with node attributes if it's a function
  const result = typeof option === "function" ? option(node.attrs ?? {}) : option;

  const component = Array.isArray(result) ? result[0] : result;
  const properties = Array.isArray(result) ? result[1] : {};

  // don't try to resolve the component if it looks like a DOM element name
  if (typeof component === "string" && !component.includes("-") && component === component.toLowerCase()) {
    return [component, properties];
  }

  return [typeof component === "string" ? resolveComponent(component) : component, properties];
}

interface ProsemirrorRenderProperties {
  // curent prosemirror node
  node: ProsemirrorJSONNode;
  // mark index to render
  mark?: number;
}

/**
 * Render a ProseMirror document.
 */
const ProsemirrorRender: Component<ProsemirrorRenderProperties> = defineComponent({
  name: "ProsemirrorRender",
  props: {
    // curent prosemirror node
    node: { type: Object as PropType<ProsemirrorRenderProperties["node"]>, required: true },
    // mark index to render
    mark: { type: Number, default: 0 },
  },
  setup(properties) {
    const { types } = inject(VueProsemirrorOptionsKey, defaultOptions);

    const { node, mark } = toRefs(properties);

    // point to the mark
    const markItem = computed(() => node.value.marks?.at(mark.value));

    // render the current mark
    if (markItem.value) {
      const [component, properties_] = resolveProseComponent(markItem.value, types);
      const markProperties = mergeProps(markItem.value.attrs ?? {}, properties_);
      // recurse the next mark for child
      const children = () => h(ProsemirrorRender, { node: node.value, mark: mark.value + 1 });
      return () => h(component, markProperties, typeof component === "string" ? children() : children);
    }
    // render text as is
    else if (node.value.type === "text") {
      return () => h(Text, node.value.text);
    }
    // render the current node when marks are done
    else {
      const [component, properties_] = resolveProseComponent(node.value, types);
      const nodeProperties = mergeProps(
        node.value.attrs ?? {},
        properties_,
        typeof component === "string" ? {} : { node: node.value },
      );
      // children are the content of the node built by self
      const children = () => node.value.content?.map((child) => h(ProsemirrorRender, { node: child }));
      return () => h(component, nodeProperties, typeof component === "string" ? children() : children);
    }
  },
});

export default ProsemirrorRender;
