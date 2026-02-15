import local from '@bicou/eslint-config'

export default [
  {
    ignores: ['typed-router.d.ts'],
  },
  ...local,
  {
    files: ['src/pages/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
]
