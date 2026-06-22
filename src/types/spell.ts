export interface Spell {
  id: number
  name: string
  img: string | null
  mana_cost: number
  description: string
  class_spells:ClassSpell[]
}

export interface ClassSpell {
  required_lvl: number
  spells: Spell
  classes?: { 
    id: number
    name: string
  } | null
}