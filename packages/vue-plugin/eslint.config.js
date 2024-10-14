/* eslint-env node */

import local from '@bicou/eslint-config'

export default [
  {
    ignores: ['dist/', 'coverage/'],
  },
  ...local,
]
