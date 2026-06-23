import { defineStore } from 'pinia'

import { ref } from 'vue'

import type { CharacterCreationDraft } from '@/types/characterCreation'

export const useCharacterCreationStore = defineStore('characterCreation', () => {
  const draft = ref<CharacterCreationDraft>({
    race: null,
    class: null,
    name: '',
    img: null
  })

  const currentStep = ref(1)
  const isLoading = ref(false)

  return {
    draft,
    currentStep,
    isLoading
  }
})
