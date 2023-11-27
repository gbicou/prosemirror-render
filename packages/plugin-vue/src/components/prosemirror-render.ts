import { computed, defineComponent, h, inject, mergeProps, type PropType, resolveComponent, toRefs } from "vue";
import { camelCase, kebabCase, snakeCase } from "change-case";
import type { ProsemirrorJSONCommon, ProsemirrorJSONNode } from "../prosemirror-json";
import {
  defaultOptions,
  VueProsemirrorComponentAndProperties,
  VueProsemirrorComponentOption,
  VueProsemirrorComponentReturns,
  VueProsemirrorComponents,
  VueProsemirrorOptionsKey,
} from "../options";

/**
 * Resolves the component for the given ProseMirror node or mark.
 * @param node - The ProseMirror node or mark.
 * @param components - Mapping from node type to element or component.
 * @returns - The component to render the node or mark.
 */
export function resolveProseComponent(
  node: ProsemirrorJSONCommon,
  components: VueProsemirrorComponents,
): VueProsemirrorComponentAndProperties {
  // translate type to component or element
  const option: VueProsemirrorComponentOption =
    components[snakeCase(node.type)] ?? components[camelCase(node.type)] ?? kebabCase(node.type);

  // call option with node attributes if it's a function
  const r: VueProsemirrorComponentReturns = typeof option === "function" ? option(node.attrs ?? {}) : option;

  const component = Array.isArray(r) ? r[0] : r;
  const properties = Array.isArray(r) ? r[1] : {};

  // don't try to resolve the component if it looks like a DOM element name
  if (typeof component === "string" && !component.includes("-") && component === component.toLowerCase()) {
    return [component, properties];
  }

  return typeof component === "string" ? [resolveComponent(component), properties] : [component, properties];
}

const ProsemirrorRender = defineComponent({
  name: "ProsemirrorRender",
  props: {
    // curent prosemirror node
    node: { type: Object as PropType<ProsemirrorJSONNode>, required: true },
    // mark index to render
    mark: { type: Number, default: 0 },
  },
  setup(properties) {
    const self = resolveComponent("ProsemirrorRender", true);

    const { components } = inject(VueProsemirrorOptionsKey, defaultOptions);

    const { node, mark } = toRefs(properties);

    // point to the mark
    const markItem = computed(() => node.value.marks?.at(mark.value));

    return () => {
      // render the current mark
      if (markItem.value) {
        const [component, properties_] = resolveProseComponent(markItem.value, components);
        const children = () => h(self, { node: node.value, mark: mark.value + 1 });
        return h(
          component,
          mergeProps(markItem.value.attrs ?? {}, properties_),
          // recurse the next mark for child
          typeof component === "string" ? children() : children,
        );
      }
      // render text as is
      else if (node.value.type === "text") {
        return node.value.text;
      }
      // render the current node when marks are done
      else {
        const [component, properties_] = resolveProseComponent(node.value, components);
        const children = () => node.value.content?.map((child) => h(self, { node: child }));
        return h(
          component,
          mergeProps(node.value.attrs ?? {}, properties_, typeof component === "string" ? {} : { node: node.value }),
          // node content build the children
          typeof component === "string" ? children() : children,
        );
      }
    };
  },
});

export default ProsemirrorRender;
