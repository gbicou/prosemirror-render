/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve, dirname } from "node:path";
import nodeExternals from "rollup-plugin-node-externals";
import GithubActionsReporter from "vitest-github-actions-reporter";
import { fileURLToPath } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ["src"],
      exclude: ["**/*.test.ts"],
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
      entry: resolve(dirname(fileURLToPath(import.meta.url)), "src/plugin.ts"),
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
