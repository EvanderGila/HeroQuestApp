import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Character, Race, Class } from '@/types/character'

export const useCharacterStore = defineStore('characters', () => {
  const myCharacters = ref<Character[]>([])
  const availableRaces = ref<Race[]>([])
  const availableClasses = ref<Class[]>([])
  const isLoading = ref(false)

  // Actions para llenar el estado
  function setRaces(races: Race[]) { availableRaces.value = races }
  function setClasses(classes: Class[]) { availableClasses.value = classes }
  function setMyCharacters(chars: Character[]) { myCharacters.value = chars }
  function setLoading(status: boolean) { isLoading.value = status }

  return { 
    myCharacters, availableRaces, availableClasses, isLoading,
    setRaces, setClasses, setMyCharacters, setLoading 
  }
})