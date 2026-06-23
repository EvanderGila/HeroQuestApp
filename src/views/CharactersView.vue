<template>
  <VContainer fluid class="py-8 px-4 px-md-12">
    <div class="mb-6">
      <h1 class="text-h4 font-weight-bold">Tus Héroes</h1>
      <p class="text-subtitle-1 text-medium-emphasis">
        Gestiona tus fichas de personaje activos.
      </p>
    </div>

    <div v-if="charStore.isLoading" class="d-flex justify-center align-center py-12">
      <VProgressCircular indeterminate color="primary" size="64" />
    </div>

    <div v-else class="hq-heroes-flex-grid">
      <div class="hq-flex-card-wrapper">
        <VCard
          variant="outlined"
          class="d-flex flex-column align-center justify-center fill-height min-card-height hq-create-card"
          to="/character-create"
        >
          <div class="d-flex flex-column align-center justify-center text-center pa-6">
            <VIcon
              icon="mdi-account-plus-outline"
              size="42"
              class="mb-3 hq-create-icon transition-all"
            />
            <span
              class="text-button font-weight-black tracking-wider text-uppercase hq-create-text"
            >
              Crear Personaje
            </span>
            <span class="text-caption text-disabled mt-1 max-w-200">
              Comienza una nueva crónica e invoca a tu héroe
            </span>
          </div>
        </VCard>
      </div>

      <div
        v-for="character in charStore.myCharacters"
        :key="character.id"
        class="hq-flex-card-wrapper"
      >
        <CharacterSimpleCard :character="character" @inspect="handleInspectCharacter" />
      </div>
    </div>
  </VContainer>

  <VDialog
    v-model="isDetailsDialogOpen"
    max-width="900px"
    width="auto"
    transition="dialog-bottom-transition"
  >
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
import { useAuthStore } from '@/store/authStore'
import { useCharacterStore } from '@/store/characterStore'
import { useCharacters } from '@/composables/useCharacters'

import CharacterSimpleCard from '@/components/characters/CharacterSimpleCard.vue'
import CharacterDetailedCard from '@/components/characters/CharacterDetailedCard.vue'

const charStore = useCharacterStore()
const authStore = useAuthStore()
const { loadCreationData, fetchUserCharacters } = useCharacters()
const { upgradeCharacterStats } = useCharacters()

const isDetailsDialogOpen = ref(false)
const characterSelected = ref<any>(null)

const liveCharacter = computed(() => {
  return (
    charStore.myCharacters.find((c) => c.id === characterSelected.value?.id) ||
    characterSelected.value
  )
})

onMounted(async () => {
  if (authStore.user?.id) {
    await Promise.all([loadCreationData(), fetchUserCharacters(authStore.user.id)])
  }
})

function handleInspectCharacter(character: any) {
  characterSelected.value = character
  isDetailsDialogOpen.value = true
}

async function handleSaveStats(payload: {
  characterId: number
  updates: Record<string, number>
  totalSpent: number
  onSuccess?: () => void
}) {
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
.max-w-200 {
  max-width: 200px;
}
.transition-all {
  transition: all 0.25s ease-in-out !important;
}

/* ── 🌌 ESTILO SILUETA PARA LA CARD DE CREACIÓN ── */
.hq-create-card {
  cursor: pointer;
  border-style: dashed !important; /* Líneas discontinuas */
  border-width: 2px !important; /* Un pelín más gruesa para que se note el dashed */
  border-color: rgba(var(--v-theme-primary), 0.25) !important; /* Semitransparente */
  background-color: rgba(var(--v-theme-primary), 0.01) !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
}

/* El texto e iconos por defecto se ven sutiles, como un fantasma */
.hq-create-card .hq-create-icon,
.hq-create-card .hq-create-text {
  color: rgba(var(--v-theme-primary), 0.6);
}

/* 🔥 EFECTO HOVER: Reacciona de forma mágica al pasar el ratón */
.hq-create-card:hover {
  background-color: rgba(var(--v-theme-primary), 0.04) !important;
  border-color: rgba(var(--v-theme-primary), 0.6) !important; /* El borde se ilumina */
  border-style: solid !important; /* Pasa de dashed a sólido al enfocar */
  box-shadow:
    0 0 16px rgba(var(--v-theme-primary), 0.12),
    inset 0 0 12px rgba(var(--v-theme-primary), 0.03) !important;
}

/* Al hacer hover, el icono y el texto cobran "vida" */
.hq-create-card:hover .hq-create-icon {
  color: rgb(var(--v-theme-primary));
  transform: translateY(-4px) scale(1.05); /* Micro-animación hacia arriba */
}

.hq-create-card:hover .hq-create-text {
  color: rgb(var(--v-theme-primary));
  letter-spacing: 0.1em !important; /* Ligero espaciado dinámico */
}

:deep(.v-overlay__content) {
  @media (orientation: landscape) and (max-height: 500px) {
    overflow-y: auto !important;
    max-height: 100dvh !important;
    display: block !important; /* Evita que flexbox aplaste la tarjeta */
  }
}

.hq-heroes-flex-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px; /* Un pelín más de separación entre héroes para que respire */
  width: 100%;
}

/* 🛡️ Cada celda individual se estira y encoge dinámicamente */
.hq-flex-card-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* En móviles pequeños (cuando la pantalla no da ni para dos de 280px), quitamos el max-width para que llene la fila */
@media (max-width: 599px) {
  .hq-flex-card-wrapper {
    grid-template-columns: 1fr;
  }
}
</style>
