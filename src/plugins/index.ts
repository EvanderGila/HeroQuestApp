/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Types
import type { App } from 'vue'

// Plugins
import vuetify from './vuetify'
import pinia from './pinia'
import router from '@/router'

export function registerPlugins (app: App) {
  app.use(vuetify)
  app.use(pinia)
  app.use(router)
}
