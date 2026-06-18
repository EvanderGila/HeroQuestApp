<template>
  <VContainer fluid class="fill-height pa-1 bg-grey-darken-4">
    <VOverlay :model-value="isLoading" class="align-center justify-center" persistent>
      <VProgressCircular color="warning" indeterminate size="64" />
    </VOverlay>

        <VCard variant="flat" class="border-thin bg-surface elevation-12 rounded-xl overflow-hidden ma-2">
          
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
            class="bg-transparent elevation-0 v-theme--surface"
          >
            <template v-slot:item.1>
              <VRow>
                <VCol cols="12" md="8"><RaceSelectionCreation /></VCol>
                <VCol cols="12" md="4"><PreviewCharacterCard /></VCol>
              </VRow>
            </template>

            <template v-slot:item.2>
              <VRow>
                <VCol cols="12" md="8"><ClassSelectionCreation /></VCol>
                <VCol cols="12" md="4"><PreviewCharacterCard /></VCol>
              </VRow>
            </template>

            <template v-slot:item.3>
              <VRow>
                <VCol cols="12" md="8"><IdentityAssignCreation /></VCol>
                <VCol cols="12" md="4"><PreviewCharacterCard /></VCol>
              </VRow>
            </template>

            <template v-slot:item.4>
              <VRow>
                <VCol cols="12" md="6"><CharacterConfirmCreation @save="handleSave" /></VCol>
                <VCol cols="12" md="4"><PreviewCharacterCard /></VCol>
              </VRow>
            </template>
          </VStepper>
          <VDivider class="mt-4 mb-2" />
      <div class="d-flex justify-space-between align-center px-4 py-2">
        
        <div>
          <VBtn 
            v-if="currentStep > 1"
            variant="text" 
            color="grey-darken-1" 
            prepend-icon="mdi-arrow-left" 
            class="font-weight-bold" 
            @click="previousStep"
          >
            Atrás
          </VBtn>
          <VBtn 
            v-else
            variant="text" 
            color="error" 
            prepend-icon="mdi-close" 
            class="font-weight-bold" 
            @click="abortAndGoBack"
          >
            Cancelar
          </VBtn>
        </div>

        <div>
          <VBtn 
            v-if="currentStep < 4"
            color="primary" 
            :disabled="!canContinue" 
            append-icon="mdi-arrow-right" 
            class="font-weight-bold px-6" 
            @click="nextStep"
          >
            {{ currentStep === 3 ? 'Revisar Ficha' : 'Siguiente' }}
          </VBtn>
          <VBtn 
            v-else
            color="success" 
            append-icon="mdi-anvil" 
            class="font-weight-bold px-6 elevation-2" 
            @click="handleSave"
          >
            Forjar Personaje
          </VBtn>
        </div>

      </div>
        </VCard>
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
const { currentStep, isLoading, canContinue, previousStep, nextStep, resetDraft, createCharacter } = useCharacterCreation()
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
<style scoped>
.min-card-height {
  min-height: 290px;
}
.custom-create-btn {
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.custom-create-btn:hover {
  background-color: rgba(var(--v-theme-primary), 0.05);
}

</style>