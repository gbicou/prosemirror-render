// @ts-check

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

  // jsdoc
  jsdoc.configs['flat/recommended-typescript'],

  // style
  stylistic.configs['recommended'],

  // vitest
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

export default ts.config(
  // javascript
  js.configs.recommended,

  // typescript
  ts.configs.recommended,

  // vue
  vue.configs['flat/recommended'],
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

  forNuxt,
)
