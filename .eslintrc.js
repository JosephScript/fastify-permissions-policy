module.exports = {
  env: {
    node: true,
    browser: true,
    jest: true,
    es6: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: 'false',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['**/*.ts'],
      plugins: ['prettier'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/ban-types': 'warn',
        '@typescript-eslint/prefer-optional-chain': 'error',
        'no-console': ['error', { allow: ['info', 'warn', 'error', 'debug'] }],
        'prettier/prettier': 'error',
      },
    },
  ],
}
