import local from '@bicou/eslint-config'

export default [
  {
    ignores: ['dist/', 'coverage/'],
  },
  ...local,
  {
    files: ['**/*.test.ts'],
    rules: {
      'unicorn/no-null': 'off',
    },
  },
]
