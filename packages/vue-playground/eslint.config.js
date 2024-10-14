/* eslint-env node */

import local from '@bicou/eslint-config'

export default [
  {
    ignores: ['dist/', 'coverage/', 'typed-router.d.ts'],
  },
  ...local,
  {
    files: ['src/pages/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
]
