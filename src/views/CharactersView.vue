<template>
  <VContainer class="py-8">
    <div class="mb-6">
      <h1 class="text-h4 font-weight-bold">Tus Héroes</h1>
      <p class="text-subtitle-1 text-medium-emphasis">Gestiona tus fichas de personaje activos.</p>
    </div>

    <div v-if="charStore.isLoading" class="d-flex justify-center align-center py-12">
      <VProgressCircular indeterminate color="primary" size="64" />
    </div>

    <VRow v-else>
      <VCol cols="12" sm="6" md="4" lg="3">
        <VCard
          color="primary"
          class="d-flex flex-column align-center justify-center fill-height min-card-height custom-create-btn"
          to="/character-create"
        >
          <VIcon icon="mdi-plus-circle-outline" size="48" class="mb-2" />
          <span class="text-button font-weight-bold">Crear Personaje</span>
        </VCard>
      </VCol>

      <VCol 
        v-for="character in charStore.myCharacters" 
        :key="character.id" 
        cols="12" 
        sm="6" 
        md="4" 
        lg="3"
      >
        <CharacterSimpleCard 
          :character="character" 
          @inspect="handleInspectCharacter"
        />
      </VCol>
    </VRow>
  </VContainer>

  <VDialog v-model="isDetailsDialogOpen" max-width="900px" transition="dialog-bottom-transition">
  <CharacterDetailedCard 
    v-if="characterSelected"
    :character="liveCharacter" 
    @close="isDetailsDialogOpen = false"
    @saveStats="handleSaveStats"
  />
</VDialog>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authStore'
import { useCharacterStore } from '@/store/characterStore'
import { useCharacters } from '@/composables/useCharacters'

import CharacterSimpleCard from '@/components/characters/CharacterSimpleCard.vue'
import CharacterDetailedCard from '@/components/characters/CharacterDetailedCard.vue'

const router = useRouter()
const charStore = useCharacterStore()
const authStore = useAuthStore()
const { loadCreationData, fetchUserCharacters } = useCharacters()
const { upgradeCharacterStats } = useCharacters()

const isDetailsDialogOpen = ref(false)
const characterSelected = ref<any>(null)

  const liveCharacter = computed(() => {
  return charStore.myCharacters.find(c => c.id === characterSelected.value?.id) || characterSelected.value
})

onMounted(async () => {
  if (authStore.user?.id) {
    await Promise.all([
      loadCreationData(),
      fetchUserCharacters(authStore.user.id)
    ])
  }
})

function goToCharacterCreator() {
  router.push('/characters/create') // O la ruta que decidas para los steps
}

function handleInspectCharacter(character: any) {
  characterSelected.value = character
  isDetailsDialogOpen.value = true
}

async function handleSaveStats(payload: { characterId: number; updates: Record<string, number>; totalSpent: number; onSuccess?: () => void }) {
  // 1. Esperamos a que el composable guarde en Supabase y mutile el store de Pinia
  const success = await upgradeCharacterStats(payload)
  
  // 2. Si todo fue bien, le damos la orden a la tarjeta de cerrar su modo edición de forma segura
  if (success && payload.onSuccess) {
    payload.onSuccess()
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