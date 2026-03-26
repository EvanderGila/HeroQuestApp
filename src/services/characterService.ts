import supabase from '@/lib/supabase'

export const characterService = {
  // 1. Obtener los personajes del usuario (con JOIN a tablas maestras)
  async getCharactersByUserId(userId: string) {
    const { data, error } = await supabase
      .from('characters')
      .select(`
        *,
        races (id, name, img),
        classes (id, name, img)
      `)
      .eq('user_id', userId)
    
    if (error) throw error
    return data
  },

  // 2. Obtener el catálogo de clases
  async getClasses() {
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .order('name', { ascending: true })
    
    if (error) throw error
    return data
  },

  // 3. Obtener el catálogo de razas
  async getRaces() {
    const { data, error } = await supabase
      .from('races')
      .select('*')
      .order('name', { ascending: true })
    
    if (error) throw error
    return data
  }
}