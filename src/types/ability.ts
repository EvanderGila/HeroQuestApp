export interface Ability {
  id: number
  name: string
  description: string | null
  type: 'passive' | 'active'
}