/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,ts,vue}'],
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
    },
  },
  {
    files: ['**/*.ts', '**/*.vue'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
];
