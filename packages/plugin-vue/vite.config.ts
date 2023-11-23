/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import nodeExternals from "rollup-plugin-node-externals";
import GithubActionsReporter from "vitest-github-actions-reporter";

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
  test: {
    globals: true,
    environment: "happy-dom",
    reporters: process.env.GITHUB_ACTIONS ? ["default", new GithubActionsReporter()] : "default",
  },
});
