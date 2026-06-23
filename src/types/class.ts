import type { ClassSpell } from './spell'
import type { Ability } from './ability'

export interface ClassAbility {
  required_lvl: number
  abilities: Ability
  classes?: {
    id: number
    name: string
  } | null
}

export interface Class {
  id: number
  name: string
  img: string | null
  hp_mod: number
  atk_mod: number
  def_mod: number
  mp_mod: number
  mov_mod: number
  class: string
  init_equip: number
  obj_limit: number
  class_abilities: ClassAbility[]
  class_spells: ClassSpell[]
}
