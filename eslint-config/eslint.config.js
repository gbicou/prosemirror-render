// @ts-check

import unicorn from 'eslint-plugin-unicorn'
import jsdoc from 'eslint-plugin-jsdoc'
import vitest from '@vitest/eslint-plugin'
import stylistic from '@stylistic/eslint-plugin'
import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'

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

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
  },

  globalIgnores(['**/dist/**', '**/.turbo/**', '**/coverage/**']),

  ...pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,

  ...forNuxt,
)
