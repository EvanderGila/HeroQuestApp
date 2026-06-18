import type { Race } from './race'
import type { Class } from './class'

export interface Character {
  id:number
  name:string
  lvl:number
  current_xp:number
  available_points:number
  img: string

  hp:number
  atk:number
  def:number
  mp:number
  mov:number

  hp_mod?:number
  atk_mod?:number
  def_mod?:number
  mp_mod?:number
  mov_mod?:number

  races?:Race | null
  classes?:Class | null
  
  character_equipment?:EquippedItem[]
}

export interface EquippedItem {
  id: number
  character_id: number
  slot: string
  name: string
  // Añade aquí los campos de stats si los tienes (atk_mod, def_mod, etc.)
}