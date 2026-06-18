import { createRouter, createWebHistory } from 'vue-router'
import { routes as authRoutes } from '@/router/routes/auth-routes'
import { routes as charRoutes } from '@/router/routes/character-routes'
import { routes as shopRoutes } from '@/router/routes/shop-routes'

import { setupGuards } from '@/router/guard'

const appRoutes = [
  ...authRoutes,
  ...charRoutes,
  ...shopRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes : appRoutes,  // Usamos las rutas importadas
})

// Aplicamos la lógica de seguridad
setupGuards(router)

export default router