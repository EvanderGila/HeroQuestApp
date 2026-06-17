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