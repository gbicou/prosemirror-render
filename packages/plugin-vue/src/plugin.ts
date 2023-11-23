import ProseMirrorNode from "./components/ProseMirrorNode";
import { type App, inject, provide } from "vue";
import { type VueProseMirrorOptions, defaultOptions, VueProseMirrorOptionsKey } from "./options";
import defu from "defu";

const VueProseMirrorPlugin = {
  install: (app: App, options: Partial<VueProseMirrorOptions> = {}) => {
    app.provide(VueProseMirrorOptionsKey, defu(options, defaultOptions));
    app.component("ProseMirrorNode", ProseMirrorNode);
  },
};

/**
 * Updates the ProseMirror plugin options.
 * @param options - The new options to merge with current.
 */
export function useProseMirrorOptions(options: Partial<VueProseMirrorOptions>) {
  provide(VueProseMirrorOptionsKey, defu(options, inject(VueProseMirrorOptionsKey, defaultOptions)));
}

export { ProseMirrorNode };

export { type ProseMirrorJSONNode } from "./prosemirror-json";

export default VueProseMirrorPlugin;
