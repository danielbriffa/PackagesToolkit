/// <reference types="vite/client" />
import type { Component } from 'vue'

import.meta.glob('./*/*.style*.scss', { eager: true })

const modules = import.meta.glob<{ default: Component }>('./*/*.vue', { eager: true })

export default Object.fromEntries(
  Object.entries(modules)
    .filter(([path]) => {
      const [, folder, file] = path.split('/')
      return file === `${folder}.vue`
    })
    .map(([path, mod]) => [path.split('/')[1], mod.default])
) as Record<string, Component>
