export interface Ability {
  id: number
  img: string
  name: string
  description: string | null
  type: 'passive' | 'active'
}