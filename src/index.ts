import ProseMirrorNode from "./components/ProseMirrorNode.ts";
import { type App, type Plugin } from "vue";
import { type Config, defaultConfig, key } from "./config.ts";

const install: Plugin = (app: App, options?: Config) => {
  app.provide(key, options ?? defaultConfig);
  app.component("ProseMirrorNode", ProseMirrorNode);
};

export { ProseMirrorNode, install };
