import ProsemirrorRender from "./components/prosemirror-render";
import { type App } from "vue";
import { type VueProsemirrorOptions, defaultOptions, VueProsemirrorOptionsKey } from "./options";
import defu from "defu";

/**
 * Vue Prosemirror plugin.
 */
export const VueProsemirrorPlugin = {
  install: (app: App, options: Partial<VueProsemirrorOptions> = {}) => {
    app.provide(VueProsemirrorOptionsKey, defu(options, defaultOptions));
    app.component("ProsemirrorRender", ProsemirrorRender);
  },
};
