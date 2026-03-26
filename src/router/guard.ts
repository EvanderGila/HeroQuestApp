import { watch } from 'vue'
import type { Router } from 'vue-router'
import { useAuthStore } from '@/store/authStore'

export const setupGuards = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()

    // Esperar a que initAuth termine
    if (!authStore.isInitialized) {
      await new Promise(resolve => {
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

    if (authRequired && !authStore.isAuthenticated) {
      return next('/login')
    }

    if (to.path === '/login' && authStore.isAuthenticated) {
      return next('/')
    }

    next()
  })
}