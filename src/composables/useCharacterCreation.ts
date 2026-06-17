// composables/useCharacterCreation.ts

import { computed } from 'vue'

import { useCharacterCreationStore } from '@/store/characterCreationStore'
import { useCharacterStore } from '@/store/characterStore'
import { useAuthStore } from '@/store/authStore'
import { characterService } from '@/services/characterService'

import type { Race } from '@/types/race'
import type { Class } from '@/types/class'

export function useCharacterCreation() {

  const authStore = useAuthStore()
  const creationStore = useCharacterCreationStore()
  const characterStore = useCharacterStore()


  // ==============================
  // COMPUTED
  // ==============================

  const draft = computed(() => creationStore.draft)
  const currentStep = computed(() => creationStore.currentStep)
  const isLoading = computed(() => creationStore.isLoading)


  const calculatedStats = computed(() => {

    const race = creationStore.draft.race
    const cls = creationStore.draft.class

    if (!race || !cls) {
      return {
        hp: 0,
        atk: 0,
        def: 0,
        mp: 0,
        mov: 0
      }
    }

    return {
      hp: race.hp_base + cls.hp_mod,
      atk: race.atk_base + cls.atk_mod,
      def: race.def_base + cls.def_mod,
      mp: race.mp_base + cls.mp_mod,
      mov: race.mov_base + cls.mov_mod
    }
  })

  const canContinue = computed(() => {

    switch (creationStore.currentStep) {
      case 1:
        return !!creationStore.draft.race
      case 2:
        return !!creationStore.draft.class
      case 3:
        return creationStore.draft.name.trim().length > 0
      default:
        return true
    }
  })

  const isReadyToCreate = computed(() => {

    return (
      creationStore.draft.race &&
      creationStore.draft.class &&
      creationStore.draft.name.trim().length > 0
    )
  })

  // ==============================
  // ACTIONS
  // ==============================

  function selectRace(race: Race) {
    creationStore.draft.race = race
  }

  function selectClass(cls: Class) {
    creationStore.draft.class = cls
  }

  function setName(name: string) {
    creationStore.draft.name = name
  }

  function setImage(img: string) {
    creationStore.draft.img = img
  }

  function nextStep() {
    if (creationStore.currentStep < 4) {
      creationStore.currentStep++
    }
  }

  function previousStep() {
    if (creationStore.currentStep > 1) {
      creationStore.currentStep--
    }
  }


  function resetDraft() {
    creationStore.draft = {
      race: null,
      class: null,
      name: '',
      img: null
    }
    creationStore.currentStep = 1
  }


  // ==============================
  // CREAR PERSONAJE
  // ==============================

  async function createCharacter() {

    const userId = authStore.user?.id

    if (!userId) {
      throw new Error('Usuario no autenticado')
    }

    if (!isReadyToCreate.value) {
      return false
    }

    creationStore.isLoading = true

    try {

      const payload = {
        user_id: userId,
        race_id: creationStore.draft.race!.id,
        class_id: creationStore.draft.class!.id,

        name: creationStore.draft.name,
        img: creationStore.draft.img,
        lvl: 1,
        current_xp: 0,
        available_points: 0,

        hp: calculatedStats.value.hp,
        atk: calculatedStats.value.atk,
        def: calculatedStats.value.def,
        mp: calculatedStats.value.mp,
        mov: calculatedStats.value.mov
      }
      const newCharacter = await characterService.createCharacter(payload)
      characterStore.myCharacters.push(newCharacter)
      resetDraft()
      return true
    }
    catch(error){
      console.error(error)
      return false
    }
    finally{
      creationStore.isLoading = false
    }
  }


  return {
    draft,
    currentStep,
    isLoading,
    calculatedStats,
    canContinue,
    isReadyToCreate,
    selectRace,
    selectClass,
    setName,
    setImage,
    nextStep,
    previousStep,
    resetDraft,
    createCharacter
  }
}