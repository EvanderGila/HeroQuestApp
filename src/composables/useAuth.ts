import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authStore'
import { authService } from '@/services/authService'
import type { AppUser } from '@/types/auth'
import supabase from '@/lib/supabase'

let isFetching = false

export function useAuth() {
  const router = useRouter()
  const authStore = useAuthStore()

  async function resolveFullUser(authUser: any): Promise<AppUser> {
    const publicData = await authService.getCurrentUserData(authUser.id)

    return {
      ...authUser,
      profile: {
        ...publicData
      }
    }
  }

  // ✅ INIT GLOBAL (solo una vez)
  async function initAuth() {
    if (authStore.isInitialized) return

    authStore.setLoading(true)

    try {
      const {
        data: { session }
      } = await supabase.auth.getSession()

      if (session?.user) {
        await fetchFullUserProfile(session.user)
      } else {
        authStore.setUser(null)
      }

      // 👇 listener limpio
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN') {
          await fetchFullUserProfile(session?.user)
        }

        if (event === 'SIGNED_OUT') {
          authStore.setUser(null)
        }
      })
    } catch (e) {
      console.error('Init auth error:', e)
      authStore.setUser(null)
    } finally {
      authStore.setLoading(false)
      authStore.setInitialized(true)
    }
  }

  async function fetchFullUserProfile(authUser?: any) {
    if (isFetching) return
    isFetching = true

    try {
      const user = authUser || (await authService.getCurrentAuthUser())
      if (!user) {
        authStore.setUser(null)
        return
      }

      const fullUser = await resolveFullUser(user)
      authStore.setUser(fullUser)
    } catch (e) {
      console.error('Profile error:', e)
      authStore.setUser(null)
    } finally {
      isFetching = false
    }
  }

  async function login(email: string, pass: string) {
    authStore.setLoading(true)

    try {
      const { user } = await authService.login({ email, password: pass })

      if (!user) throw new Error('No user')

      await fetchFullUserProfile(user)

      router.push('/')
    } catch (e: any) {
      authStore.setError(e.message)
    } finally {
      authStore.setLoading(false)
    }
  }

  async function logout() {
    await authService.logout()
    authStore.setUser(null)
    router.push('/login')
  }

  return { initAuth, login, logout }
}
