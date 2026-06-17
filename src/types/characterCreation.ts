import type { Race } from './race'
import type { Class } from './class'


export interface CharacterCreationDraft {

  race: Race | null
  class: Class | null
  name: string
  img: string | null
}