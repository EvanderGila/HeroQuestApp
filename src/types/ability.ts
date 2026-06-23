import type { RaceAbility } from './race'
import type { ClassAbility } from './class'

export interface Ability {
  id: number
  img: string
  name: string
  description: string | null
  type: 'passive' | 'active'
  race_abilities: RaceAbility[]
  class_abilities: ClassAbility[]
}
