import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { AppUser } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AppUser | null>(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)
  const isInitialized = ref(false)
  const authError = ref<string | null>(null)

  function setUser(newUser: AppUser | null) {
    user.value = newUser
    isAuthenticated.value = !!newUser
    // Limpiamos errores al cambiar de usuario con éxito
    authError.value = null
  }

  function setLoading(status: boolean) {
    isLoading.value = status
  }

  function setError(message: string | null) {
    authError.value = message
  }

  function setInitialized(value: boolean) {
    isInitialized.value = value
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    authError,
    isInitialized,
    setUser,
    setLoading,
    setError,
    setInitialized
  }
})
