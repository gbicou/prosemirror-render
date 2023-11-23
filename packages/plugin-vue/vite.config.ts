import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import nodeExternals from "rollup-plugin-node-externals";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ["src"],
    }),
    {
      ...nodeExternals(),
      enforce: "pre",
    },
  ],
  build: {
    target: "esnext",
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "src/plugin.ts"),
      formats: ["es"],
      fileName: "plugin",
    },
    rollupOptions: {},
  },
});
