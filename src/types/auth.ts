import type { User as SupabaseUser } from '@supabase/supabase-js'

export interface UserProfile {
  id: string
  nickname: string
}

// El usuario que se usa en toda la App (Auth + Perfil Público)
export interface AppUser extends SupabaseUser {
  profile: UserProfile
}