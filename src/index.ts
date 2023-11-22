import ProseMirrorNode from "./components/ProseMirrorNode.ts";
import { type App, type Plugin } from "vue";
import { type VueProseMirrorOptions, defaultOptions, VueProseMirrorOptionsKey } from "./options.ts";
import defu from "defu";

export const VueProseMirrorPlugin: Plugin = (app: App, options?: VueProseMirrorOptions) => {
  app.provide(VueProseMirrorOptionsKey, defu(options, defaultOptions));
  app.component("ProseMirrorNode", ProseMirrorNode);
};

export { ProseMirrorNode, VueProseMirrorPlugin as default };
