export interface Ability {
  id: number
  name: string
  description: string | null
  type: 'passive' | 'active'
}

export interface RaceAbility {
  required_lvl: number
  abilities: Ability
}

export interface Race {
  id: number
  name: string
  img: string | null
  race_abilities: RaceAbility[]
}

export interface ClassAbility {
  required_lvl: number
  abilities: Ability
}

export interface Class {
  id: number
  name: string
  class_abilities: ClassAbility[]
  class_spells: ClassSpell[]
}

export interface Spell {
  id: number
  name: string
  img: string | null
  mana_cost: number
  description: string
}

export interface ClassSpell {
  required_lvl: number
  spells: Spell
}

export interface EquippedItem {
  id: number
  character_id: number
  slot: string
  name: string
  // Añade aquí los campos de stats si los tienes (atk_mod, def_mod, etc.)
}

// 👑 La interfaz maestra que representa a tu personaje completo
export interface Character {
  id: number
  name: string
  lvl: number
  current_xp: number
  available_points: number
  hp: number
  mp: number
  atk: number
  def: number
  mov: number
  hp_mod?: number
  mp_mod?: number
  atk_mod?: number
  def_mod?: number
  mov_mod?: number
  races?: Race | null
  classes?: Class | null
  character_equipment?: EquippedItem[]
}