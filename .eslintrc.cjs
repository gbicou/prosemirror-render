/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-typescript/recommended",
    "plugin:unicorn/recommended",
    "@vue/eslint-config-prettier",
    "plugin:jsdoc/recommended-typescript",
  ],
  plugins: [],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ["**/src/pages/*.vue"],
      rules: {
        "vue/multi-word-component-names": "off",
      },
    },
    {
      files: ["**/*.test.ts"],
      extends: ["plugin:vitest/all"],
    },
  ],
};
