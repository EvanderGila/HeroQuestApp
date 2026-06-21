import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Character } from '@/types/character'
import type { Race } from '@/types/race'
import type { Class } from '@/types/class'

export const useCharacterStore = defineStore('characters', () => {
  const myCharacters = ref<Character[]>([])
  const isLoading = ref(false)

  // Actions para llenar el estado
  function setMyCharacters(chars: Character[]) { myCharacters.value = chars }
  function setLoading(status: boolean) { isLoading.value = status }

  return { 
    myCharacters, isLoading,
    setMyCharacters, setLoading 
  }
})