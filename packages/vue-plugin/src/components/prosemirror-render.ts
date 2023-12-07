import {
  type Component,
  type PropType,
  type VNodeChild,
  type VNode,
  computed,
  defineComponent,
  h,
  inject,
  mergeProps,
  resolveComponent,
  toRefs,
  Text,
  Comment,
} from "vue";
import { camelCase, kebabCase, snakeCase } from "change-case";
import type { ProsemirrorJSONElement, ProsemirrorJSONNode } from "../prosemirror-json";
import {
  VueProsemirrorOptionsKey,
  defaultOptions,
  type VueProsemirrorComponentAndProperties,
  type VueProsemirrorOptions,
} from "../options";

/**
 * Resolves the component for the given ProseMirror node or mark.
 * @param element - The ProseMirror node or mark.
 * @param options - Plugin options.
 * @returns - The component to render the node or mark and its properties.
 */
export function resolveProseComponent(
  element: ProsemirrorJSONElement,
  options: VueProsemirrorOptions,
): VueProsemirrorComponentAndProperties {
  // try to find a match in types map by snake or camel case
  const option = options.types[snakeCase(element.type)] ?? options.types[camelCase(element.type)];

  // call option with node attributes if it's a function
  const result = typeof option === "function" ? option(element.attrs ?? {}) : option;

  // not match found and global skipping is enabled or skipped from types map
  if (result === false || (result === undefined && options.skipUnknown)) {
    return [false, {}];
  }

  const component = (Array.isArray(result) ? result[0] : result) ?? kebabCase(element.type);

  // merge element and returned properties
  const properties = mergeProps(element.attrs ?? {}, Array.isArray(result) ? result[1] : {});

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
    const options = inject(VueProsemirrorOptionsKey, defaultOptions);

    const { node, mark } = toRefs(properties);

    // point to the mark
    const markItem = computed(() => node.value.marks?.at(mark.value));

    const render = (element: ProsemirrorJSONElement, children: () => VNodeChild): (() => VNode) => {
      // resolve component and properties
      const [component, properties] = resolveProseComponent(element, options);

      // skip when false
      if (component === false) {
        return () => h(Comment, ` prosemirror type '${element.type}' skipped `);
      }

      // call children function if it's not a component
      if (typeof component === "string") {
        return () => h(component, properties, children() ?? undefined);
      }

      // render the component with element as a property
      return () => h(component, mergeProps(properties, { node: element }), children);
    };

    // render the current mark
    if (markItem.value) {
      // recurse the next mark for child
      const child = () => h(ProsemirrorRender, { node: node.value, mark: mark.value + 1 });
      return render(markItem.value, child);
    }
    // render text as is
    else if (node.value.type === "text") {
      return () => h(Text, node.value.text);
    }
    // render the current node when marks are done
    else {
      // children are the content of the node built by self
      const children = () => node.value.content?.map((child) => h(ProsemirrorRender, { node: child }));
      return render(node.value, children);
    }
  },
});

export default ProsemirrorRender;
