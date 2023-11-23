import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
// import { resolve } from "path";
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
      entry: "",
      formats: ["es"],
    },
    rollupOptions: {
      input: ["src/plugin.ts", "src/components.ts"],

      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name][extname]",
        preserveModules: true,
        preserveModulesRoot: "src",
      },
      treeshake: false,
      preserveEntrySignatures: "strict",
    },
  },
});
