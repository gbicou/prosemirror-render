import {Component, computed, defineComponent, h, PropType, resolveComponent, toRefs} from "vue";
import { snakeCase, kebabCase } from "change-case";
import type {Base, Node} from "../prosemirror-json.ts";

import { defaultConfig as config} from "../config.ts";

/*
interface ProseMirrorNodeProperties {
    // curent prosemirror node
    node: Node;
    // mark index to render
    mark?: number;
}
*/

function substituteAttributes(name: string, attrs?: Record<string, any>): string {
    const regex = /\[([a-zA-Z_]\w*)]/g;

    return name.replace(regex, (_match: string, variable: string) => {
        return attrs ? attrs[variable] ?? variable : variable;
    });
}

const resolveProseComponent = (el: Base, typeMap: Record<string, string | Component>) => {
    const type = snakeCase(el.type);
    const name: string | Component = typeMap[type] ?? "prose-mirror-" + kebabCase(el.type);
    const component: string | Component = typeof name === "string" ? resolveComponent(name) : name;
    const parsed: string | Component = typeof component === "string" ? substituteAttributes(component, el.attrs) : component;

    return parsed;
}

const ProseMirrorNode = defineComponent({
    name: "ProseMirrorNode",
    props: {
        node: { type: Object as PropType<Node>, required: true },
        mark: Number,
    },
    setup(properties) {
        const me= resolveComponent("ProseMirrorNode", true);

        const { typeMap } = config;

        const { node, mark } = toRefs(properties);

        // point to the mark
        const markIndex = computed(() => mark.value ?? 0);
        const markItem = computed(() => node.value.marks?.at(markIndex.value));

        return () => {
            // render the current mark
            if (markItem.value) {
                const markComponent = resolveProseComponent(markItem.value, typeMap);
                return h(
                    markComponent,
                    markItem.value.attrs,
                    // recurse the next mark for child
                    h(me, { node: node.value, mark: markIndex.value + 1 }),
                );
            }
            // render text as is
            else if (node.value.type === "text") {
                return node.value.text;
            }
            // render the current node when marks are done
            else {
                const proseComponent = resolveProseComponent(node.value, typeMap);
                return h(
                    proseComponent,
                    { ...node.value.attrs, node: node.value },
                    // node content build the children
                    node.value.content?.map((child) => h(me, { node: child })),
                );
            }
        };
    },
});

export default ProseMirrorNode;
