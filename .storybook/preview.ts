import.meta.glob('../src/designTokens/**/*.css', { eager: true })
import.meta.glob('../src/components/**/*.style*.scss', { eager: true })

import type { Preview } from '@storybook/vue3-vite'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;