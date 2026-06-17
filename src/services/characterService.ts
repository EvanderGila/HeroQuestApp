import supabase from '@/lib/supabase'

export const characterService = {
  // 1. Obtener los personajes del usuario (con JOIN a tablas maestras)
  async getCharactersByUserId(userId: string) {
    const { data, error } = await supabase
      .from('characters')
      .select(`
        *,
        races (
          id, name, img, hp_base, atk_base, def_base, mp_base, mov_base,
          race_abilities (
            required_lvl,
            abilities (*)
          )
        ),
        classes (
          id, name, img, hp_mod, atk_mod, def_mod, mp_mod, mov_mod, class, init_equip, obj_limit,
          class_abilities (
            required_lvl,
            abilities (*)
          ),
          class_spells (
            required_lvl,
            spells (*)
          )
        ),
        character_equipment(
          slot,
          items(*)
        )
      `)
      .eq('user_id', userId)
    
    if (error) throw error
    return data
  },

  // 2. Obtener el catálogo de clases con sus habilidades y hechizos iniciales
async getClasses() {
  const { data, error } = await supabase
    .from('classes')
    .select(`
      *,
      class_abilities (
        required_lvl,
        abilities (*)
      ),
      class_spells (
        required_lvl,
        spells (*)
      )
    `)
    .order('name', { ascending: true })
  
  if (error) throw error
  return data
},

  // 3. Obtener el catálogo de razas con sus rasgos nativos
async getRaces() {
  const { data, error } = await supabase
    .from('races')
    .select(`
      *,
      race_abilities (
        required_lvl,
        abilities (*)
      )
    `)
    .order('name', { ascending: true })
  
  if (error) throw error
  return data
},

  // 4. Subir de nivel los stats
  async updateCharacterStats(characterId: number, currentHp: number, currentMp: number, currentPoints: number, hpAdded: number, mpAdded: number, totalSpent: number) {
    const finalHp = currentHp + hpAdded
    const finalMp = currentMp + mpAdded
    const finalPoints = currentPoints - totalSpent

    const { data, error } = await supabase
      .from('characters')
      .update({
        hp: finalHp,
        mp: finalMp,
        available_points: finalPoints
      })
      .eq('id', characterId)
      .select() // Súper importante para que nos devuelva el personaje actualizado completo
      .single()

    if (error) throw error
    return data
  },

  // 5. Añadir un nuevo personaje trayéndose TODAS sus relaciones al nacer
async createCharacter(characterData: any) {
  const { data, error } = await supabase
    .from('characters')
    .insert(characterData)
    .select(`
      *,
      races (
        id, name, img, hp_base, atk_base, def_base, mp_base, mov_base,
        race_abilities (required_lvl, abilities (*))
      ),
      classes (
        id, name, img, hp_mod, atk_mod, def_mod, mp_mod, mov_mod, class, init_equip, obj_limit,
        class_abilities (required_lvl, abilities (*)),
        class_spells (required_lvl, spells (*))
      ),
      character_equipment (slot, items(*))
    `)
  
  if (error) throw error
  return data[0]
}
}