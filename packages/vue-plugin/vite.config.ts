/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve, dirname } from "node:path";
import nodeExternals from "rollup-plugin-node-externals";
import GithubActionsReporter from "vitest-github-actions-reporter";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts(),
    {
      ...nodeExternals(),
      enforce: "pre",
    },
  ],
  build: {
    target: "esnext",
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: "index",
    },
  },
  test: {
    reporters: process.env.GITHUB_ACTIONS ? ["default", new GithubActionsReporter()] : "default",
  },
});
