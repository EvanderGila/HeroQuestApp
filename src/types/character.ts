export interface BaseStats {
  hp: number
  atk: number
  def: number
  mp: number
  mov: number
}

export interface Race extends BaseStats {
  id: number
  name: string
  img?: string
}

export interface Class extends BaseStats {
  id: number
  name: string
  img?: string
  class?: string 
  init_equip?: string
  obj_limit?: string
}

export interface Character extends BaseStats {
  id: number
  user_id: string
  name: string
  race_id: number
  class_id: number
  lvl: number
  current_xp: number
  available_points: number
  img?: string
  // Relaciones (para cuando hacemos JOIN en Supabase)
  races?: Race
  classes?: Class
}