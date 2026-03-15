import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "storybook-addon-changelog-viewer",
  ],
  "framework": "@storybook/vue3-vite"
};
export default config;