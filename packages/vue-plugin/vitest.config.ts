import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import GithubActionsReporter from "vitest-github-actions-reporter";

export default defineConfig({
  plugins: [vue()],
  test: {
    reporters: process.env.GITHUB_ACTIONS ? ["default", new GithubActionsReporter()] : "default",
  },
});
