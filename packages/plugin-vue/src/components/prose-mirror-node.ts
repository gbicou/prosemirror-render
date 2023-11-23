import { type Component, computed, defineComponent, h, inject, type PropType, resolveComponent, toRefs } from "vue";
import { kebabCase, snakeCase } from "change-case";
import type { ProseMirrorJSONAttributes, ProseMirrorJSONCommon, ProseMirrorJSONNode } from "../prosemirror-json";
import { defaultOptions, VueProseMirrorOptionsKey } from "../options";

/**
 * Replaces attribute placeholders in an element name with their corresponding values.
 * @param name - The name of the element.
 * @param attributes - An optional object containing attribute values.
 * @returns - The string with attribute placeholders replaced by their values.
 */
export function substituteAttributes(name: string, attributes?: ProseMirrorJSONAttributes): string {
  const regex = /\[([A-Z_a-z]\w*)]/g;

  return name.replaceAll(regex, (_match: string, variable: string) => {
    return attributes?.[variable]?.toString() ?? variable;
  });
}

/**
 * Resolves the component for the given ProseMirror node or mark.
 * @param node - The ProseMirror node or mark.
 * @param components - Mapping from node type to element or component.
 * @returns - The component to render the node or mark.
 */
export function resolveProseComponent(
  node: ProseMirrorJSONCommon,
  components: Record<string, string | Component>,
): string | Component {
  const type = snakeCase(node.type);

  // translate type to component or element
  const name: string | Component = components[type] ?? kebabCase(node.type);

  // replace placeholders in the component name
  const parsed: string | Component = typeof name === "string" ? substituteAttributes(name, node.attrs) : name;

  // don't try to resolve the component if it looks like a DOM element name
  if (typeof parsed === "string" && !parsed.includes("-")) {
    return parsed;
  }

  return typeof parsed === "string" ? resolveComponent(parsed) : parsed;
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
        const markComponent = resolveProseComponent(markItem.value, components);
        return h(
          markComponent,
          markItem.value.attrs,
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
        const proseComponent = resolveProseComponent(node.value, components);
        return h(
          proseComponent,
          { ...node.value.attrs, node: node.value },
          // node content build the children
          node.value.content?.map((child) => h(self, { node: child })),
        );
      }
    };
  },
});

export default ProseMirrorNode;
