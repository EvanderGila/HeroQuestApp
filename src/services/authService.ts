import supabase from '@/lib/supabase'
import type { SignInWithPasswordCredentials } from '@supabase/supabase-js'

export const authService = {
  async login(credentials: SignInWithPasswordCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword(credentials)
    if (error) throw error
    return data
  },

  async logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Obtiene el usuario de la capa de Autenticación (Email, ID, etc.)
  async getCurrentAuthUser() {
    const {
      data: { user },
      error
    } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  // Obtiene los datos públicos de la tabla 'users' (Nickname, etc.)
  async getCurrentUserData(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('nickname')
      .eq('id', userId)
      .maybeSingle()

    if (error) throw error
    return data
  }
}
