import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Character } from '@/types/character'

export const useCharacterStore = defineStore('characters', () => {
  const myCharacters = ref<Character[]>([])
  const isLoading = ref(false)

  // Actions para llenar el estado
  function setMyCharacters(chars: Character[]) {
    myCharacters.value = chars
  }
  function setLoading(status: boolean) {
    isLoading.value = status
  }

  return {
    myCharacters,
    isLoading,
    setMyCharacters,
    setLoading
  }
})
