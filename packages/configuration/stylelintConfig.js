/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'color-no-invalid-hex': true,
    'declaration-block-no-duplicate-properties': true,
    'no-duplicate-selectors': true,
    'scss/no-duplicate-dollar-variables': true,
    'scss/dollar-variable-pattern': '^[a-z][a-z0-9-]*$',
    'selector-class-pattern': '^[a-z][a-z0-9-]*(__[a-z0-9-]+)?(--[a-z0-9-]+)?$',
    'max-nesting-depth': 3,
    'color-named': 'never',
  },
  ignoreFiles: ['dist/**', 'node_modules/**'],
};
