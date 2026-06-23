import { watch } from 'vue'
import type { Router } from 'vue-router'
import { useAuthStore } from '@/store/authStore'

export const setupGuards = (router: Router) => {
  // 1. Quitamos "next" de los parámetros (ya no hace falta)
  router.beforeEach(async (to, from) => {
    const authStore = useAuthStore()

    // Esperar a que initAuth termine (Tu lógica de inicialización impecable)
    if (!authStore.isInitialized) {
      await new Promise((resolve) => {
        const stop = watch(
          () => authStore.isInitialized,
          (val) => {
            if (val) {
              stop()
              resolve(true)
            }
          }
        )
      })
    }

    const publicPages = ['/login']
    const authRequired = !publicPages.includes(to.path)

    // 2. En vez de "return next('/login')", simplemente retornamos el string '/login'
    if (authRequired && !authStore.isAuthenticated) {
      return '/login'
    }

    // 3. En vez de "return next('/')", retornamos el string '/'
    if (to.path === '/login' && authStore.isAuthenticated) {
      return '/'
    }

    // 4. Eliminamos el "next()". En Vue Router moderno, si no se retorna nada,
    // se asume que la navegación es totalmente válida y continúa.
  })
}
