import { computed, defineComponent, h, inject, type PropType, resolveComponent, toRefs } from "vue";
import { camelCase, kebabCase, snakeCase } from "change-case";
import type { ProseMirrorJSONCommon, ProseMirrorJSONNode } from "../prosemirror-json";
import {
  defaultOptions,
  VueProseMirrorComponentAndProperties,
  VueProseMirrorComponentOption,
  VueProseMirrorComponentReturns,
  VueProseMirrorComponents,
  VueProseMirrorOptionsKey,
} from "../options";

/**
 * Resolves the component for the given ProseMirror node or mark.
 * @param node - The ProseMirror node or mark.
 * @param components - Mapping from node type to element or component.
 * @returns - The component to render the node or mark.
 */
export function resolveProseComponent(
  node: ProseMirrorJSONCommon,
  components: VueProseMirrorComponents,
): VueProseMirrorComponentAndProperties {
  // translate type to component or element
  const option: VueProseMirrorComponentOption =
    components[snakeCase(node.type)] ?? components[camelCase(node.type)] ?? kebabCase(node.type);

  // call option with node attributes if it's a function
  const r: VueProseMirrorComponentReturns = typeof option === "function" ? option(node.attrs ?? {}) : option;

  const component = Array.isArray(r) ? r[0] : r;
  const properties = Array.isArray(r) ? r[1] : {};

  // don't try to resolve the component if it looks like a DOM element name
  if (typeof component === "string" && !component.includes("-") && component === component.toLowerCase()) {
    return [component, properties];
  }

  return typeof component === "string" ? [resolveComponent(component), properties] : [component, properties];
}

const ProseMirrorNode = defineComponent({
  name: "ProseMirrorNode",
  props: {
    // curent prosemirror node
    node: { type: Object as PropType<ProseMirrorJSONNode>, required: true },
    // mark index to render
    mark: { type: Number, default: 0 },
  },
  setup(properties) {
    const self = resolveComponent("ProseMirrorNode", true);

    const { components } = inject(VueProseMirrorOptionsKey, defaultOptions);

    const { node, mark } = toRefs(properties);

    // point to the mark
    const markIndex = computed(() => mark.value ?? 0);
    const markItem = computed(() => node.value.marks?.at(markIndex.value));

    return () => {
      // render the current mark
      if (markItem.value) {
        const [component, properties_] = resolveProseComponent(markItem.value, components);
        return h(
          component,
          { ...markItem.value.attrs, ...properties_ },
          // recurse the next mark for child
          h(self, { node: node.value, mark: markIndex.value + 1 }),
        );
      }
      // render text as is
      else if (node.value.type === "text") {
        return node.value.text;
      }
      // render the current node when marks are done
      else {
        const [component, properties_] = resolveProseComponent(node.value, components);
        return h(
          component,
          { ...node.value.attrs, ...properties_, node: typeof component === "string" ? undefined : node.value },
          // node content build the children
          node.value.content?.map((child) => h(self, { node: child })),
        );
      }
    };
  },
});

export default ProseMirrorNode;
