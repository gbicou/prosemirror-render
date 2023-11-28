import ProsemirrorRender from "./components/prosemirror-render";
import { type App, inject, provide } from "vue";
import { type VueProsemirrorOptions, defaultOptions, VueProsemirrorOptionsKey } from "./options";
import defu from "defu";

const VueProsemirrorPlugin = {
  install: (app: App, options: Partial<VueProsemirrorOptions> = {}) => {
    app.provide(VueProsemirrorOptionsKey, defu(options, defaultOptions));
    app.component("ProsemirrorRender", ProsemirrorRender);
  },
};

export default VueProsemirrorPlugin;

/**
 * Updates the ProseMirror plugin options.
 * @param options - The new options to merge with current.
 */
export function useProsemirrorOptions(options: Partial<VueProsemirrorOptions>) {
  provide(VueProsemirrorOptionsKey, defu(options, inject(VueProsemirrorOptionsKey, defaultOptions)));
}

export { type ProsemirrorJSONNode } from "./prosemirror-json";
export { type VueProsemirrorOptions, type VueProsemirrorComponents } from "./options";

export { default as ProsemirrorRender } from "./components/prosemirror-render";
