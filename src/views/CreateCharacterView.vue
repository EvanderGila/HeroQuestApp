<template>
  <VContainer fluid class="hq-creation-bg fill-height pa-0 bg-grey-darken-4">
    <VOverlay :model-value="isLoading" class="align-center justify-center" persistent>
      <VProgressCircular color="warning" indeterminate size="64" />
    </VOverlay>

    <VRow>
      <VCol cols="12" md="8" lg="8" class="pa-2">
        <VCard variant="flat" class="border-thin bg-surface elevation-12 rounded-xl overflow-hidden">
          
          <VCardTitle class="bg-grey-darken-3 text-white py-2 px-6 d-flex justify-space-between align-center">
            <div class="d-flex align-center">
              <VIcon icon="mdi-anvil" class="me-2 text-warning" />
              <span class="font-weight-black text-uppercase tracking-wide">Forjar Héroe</span>
            </div>
            <VBtn variant="text" color="grey-lighten-1" prepend-icon="mdi-arrow-left" @click="abortAndGoBack">
              Cancelar
            </VBtn>
          </VCardTitle>

          <VStepper
            :model-value="currentStep"
            :items="['Raza', 'Clase', 'Identidad', 'Resumen']"
            hide-actions
            class="bg-transparent"
          >
            <template v-slot:item.1>
              <RaceSelectionCreation />
            </template>

            <template v-slot:item.2>
              <ClassSelectionCreation />
            </template>

            <template v-slot:item.3>
              <IdentityAssignCreation />
            </template>

            <template v-slot:item.4>
              <CharacterConfirmCreation @save="handleSave" />
            </template>
          </VStepper>

        </VCard>
      </VCol>
      <VCol cols="12" md="4" lg="4">
        <div class="d-flex justify-center align-center pa-2 h-100">
          <PreviewCharacterCard />
        </div>
        
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCharacterCreation } from '@/composables/useCharacterCreation'
import { useCharacters } from '@/composables/useCharacters'
import RaceSelectionCreation from '@/components/characters/creation/RaceSelectionCreation.vue'
import ClassSelectionCreation from '@/components/characters/creation/ClassSelectionCreation.vue'
import IdentityAssignCreation from '@/components/characters/creation/IdentityAssignCreation.vue'
import CharacterConfirmCreation from '@/components/characters/creation/CharacterConfirmCreation.vue'
import PreviewCharacterCard from '@/components/characters/creation/PreviewCharacterCard.vue'


const router = useRouter()
const { currentStep, isLoading, resetDraft, createCharacter } = useCharacterCreation()
const { loadCreationData } = useCharacters()

// Precargamos el catálogo de Razas y Clases al montar la pantalla
onMounted(async () => {
  await loadCreationData()
})

function abortAndGoBack() {
  resetDraft()
  router.push('/characters')
}

async function handleSave() {
  
  const success = await createCharacter()
  if (success) {
    router.push('/characters')
  } else {
    alert('Ocurrió un error mágico al forjar al personaje.')
  }
}
</script>