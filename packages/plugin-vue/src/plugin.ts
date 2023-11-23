import ProseMirrorNode from "./components/ProseMirrorNode";
import { type App } from "vue";
import { type VueProseMirrorOptions, defaultOptions, VueProseMirrorOptionsKey } from "./options";
import defu from "defu";

const VueProseMirrorPlugin = {
  install: (app: App, options: Partial<VueProseMirrorOptions> = {}) => {
    app.provide(VueProseMirrorOptionsKey, defu(options, defaultOptions));
    app.component("ProseMirrorNode", ProseMirrorNode);
  },
};

// export { ProseMirrorNode };

export default VueProseMirrorPlugin;
