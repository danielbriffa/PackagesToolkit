import vue from '@vitejs/plugin-vue'
import { existsSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const atomsDir = resolve(import.meta.dirname, 'src/components/atoms')
const atomEntries = Object.fromEntries(
  readdirSync(atomsDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && existsSync(resolve(atomsDir, d.name, `${d.name}.vue`)))
    .map(d => [d.name, resolve(atomsDir, d.name, `${d.name}.vue`)])
)

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: {
        index: resolve(import.meta.dirname, 'src/main.ts'),
        ...atomEntries,
      },
      name: 'component-toolkit',
      fileName: 'component-toolkit',
    },
    rolldownOptions: {
      external: ['vue'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
          codeSplitting: true,
          globals: { vue: 'Vue' },
        },
        {
          format: 'cjs',
          entryFileNames: '[name].cjs',
          codeSplitting: true,
          globals: { vue: 'Vue' },
        },
      ],
    },
  },
})
