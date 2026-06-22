import type { Ability } from './ability'

export interface RaceAbility {
  required_lvl:number
  abilities:Ability
  races?: {
    id: number
    name: string
  } | null
}

export interface Race {
  id:number
  name:string
  img:string | null
  hp_base:number
  atk_base:number
  def_base:number
  mp_base:number
  mov_base:number
  race_abilities:RaceAbility[]
}