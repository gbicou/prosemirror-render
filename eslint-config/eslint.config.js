/* eslint-env node */

import js from '@eslint/js'
import ts from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import unicorn from 'eslint-plugin-unicorn'
import jsdoc from 'eslint-plugin-jsdoc'
import vitest from '@vitest/eslint-plugin'
import stylistic from '@stylistic/eslint-plugin'

export const forNuxt = [
  // unicorn
  unicorn.configs['flat/recommended'],
  {
    rules: {
      // "unicon/no-unused-vars": "warn",
    },
  },

  // jsdoc
  jsdoc.configs['flat/recommended-typescript'],
  {
    rules: {
      // "jsdoc/check-alignment": "warn",
    },
  },

  // style
  stylistic.configs['recommended-flat'],

  {
    files: ['**/*.test.ts'], // or any other pattern
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.all.rules, // you can also use vitest.configs.all.rules to enable all rules
    },
  },
]

export default [
  // javascript
  js.configs.recommended,
  {
    rules: {

      /*
             * "no-unused-vars": "off",
             * "no-undef": "off",
             */
    },
  },

  // typescript
  ...ts.configs.recommended,
  {
    rules: {

      /*
             * "@typescript-eslint/no-unused-vars": "warn",
             * "@typescript-eslint/no-explicit-any": "warn",
             */
    },
  },

  // vue
  ...vue.configs['flat/recommended'],
  {
    files: [
      '*.vue',
      '**/*.vue',
    ],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },

  ...forNuxt,
]
