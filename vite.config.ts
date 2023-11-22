import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import nodeExternals from "rollup-plugin-node-externals";
import VueRouter from 'unplugin-vue-router/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter(),
    vue(),
    dts({
      include: ["src"],
      exclude: ["src/main.ts", "src/App.vue", "src/router.ts"],
      cleanVueFileName: true,
      insertTypesEntry: true,
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
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.ts"),
      name: "VueProsemirrorRender",
      // the proper extensions will be added
      fileName: "vue-prosemirror-render",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      // plugins: [nodeExternals({})],
      // external: ['vue', 'change-case'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
