<template>
  <div>

    <div class="text-center">
      <h4 class="text-h6 font-weight-black text-uppercase text-high-emphasis lh-tight">Elige tu Profesión</h4>
      <p class="text-caption text-medium-emphasis mb-0">Tu linaje definirá tus capacidades, elije con cuidado.</p>
    </div>
  
    <VRow align="center">
      <VCol cols="12" md="7" class="d-flex align-center justify-center">
        <VCarousel
          v-if="compendiumStore.races.length > 0"
          v-model="activeSlideIndex"
          height="350"
          show-arrows="hover"
          hide-delimiters
          color="warning"
          class="hq-hero-carousel w-100"
        >
          <VCarouselItem v-for="race in compendiumStore.races" :key="race.id">
            <VSheet class="d-flex fill-height align-center justify-center bg-transparent">
              <VCard width="200" class="border-thin bg-grey-darken-3 text-white rounded-xl elevation-8 text-center overflow-hidden">
                <VImg 
                  :src="race.img || 'https://placehold.co/400x300?text=' + race.name" 
                  height="280" 
                  cover 
                />
                <VCardText class="py-3 hq-tabs-container border-top-thin">
                  <div class="text-h5 font-weight-black text-uppercase tracking-wide text-warning">
                    {{ race.name }}
                  </div>
                </VCardText>
              </VCard>
            </VSheet>
          </VCarouselItem>
        </VCarousel>
      </VCol>

      <VCol cols="12" md="5" class="pa-2">
  <div v-if="currentSelectedRace" class="hq-tabs-container border-thin pa-4 rounded-xl">
    <div class="hq-section-header mb-4">
      <span class="text-uppercase tracking-widest font-weight-bold text-xxs text-warning">
        Atributos de la Raza
      </span>
    </div>
    
    <div class="d-flex flex-column gap-y-1">
      <div 
        v-for="stat in displayedStats" 
        :key="stat.label" 
        class="d-flex align-center justify-space-between bg-hq-row px-3 py-1 rounded-lg border-thin transition-all hq-stat-row"
      >
        <div class="d-flex align-center gap-x-2">
          <VIcon :icon="stat.icon" :color="stat.color" size="15" />
          <span class="text-caption text-grey-lighten-1 font-weight-medium">{{ stat.label }}</span>
        </div>
        
        <span class="text-caption font-weight-black text-white">
          {{ stat.value }}
        </span>
      </div>
    </div>
  </div>
</VCol>
    </VRow>

    <VDivider class="my-6" />

    <div v-if="currentSelectedRace" class="hq-tabs-container border-thin pa-4 rounded-xl">
      <AbilitiesTab :character="mockCharacterForAbilities" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useCompendiumStore } from '@/store/compendiumStore'
import { useCharacterCreation } from '@/composables/useCharacterCreation'
import AbilitiesTab from '@/components/characters/AbilitiesTab.vue'

const compendiumStore = useCompendiumStore()
const { selectRace, nextStep, canContinue, draft } = useCharacterCreation()

const activeSlideIndex = ref(0)

const currentSelectedRace = computed(() => {
  return compendiumStore.races[activeSlideIndex.value] || null
})

// Mapeo adaptado para el formato lista compacta
const displayedStats = computed(() => {
  const r = currentSelectedRace.value
  if (!r) return []
  return [
    { label: 'Puntos de Cuerpo (Vida)', icon: 'mdi-heart', color: 'red-lighten-1', value: r.hp_base },
    { label: 'Puntos de Mente (Maná)', icon: 'mdi-brain', color: 'purple-lighten-2', value: r.mp_base },
    { label: 'Dados de Ataque', icon: 'mdi-sword', color: 'orange-darken-1', value: r.atk_base },
    { label: 'Dados de Defensa', icon: 'mdi-shield', color: 'blue-lighten-1', value: r.def_base },
    { label: 'Velocidad de Movimiento', icon: 'mdi-run', color: 'teal-lighten-2', value: r.mov_base },
  ]
})

const mockCharacterForAbilities = computed<any>(() => {
  return {
    lvl: 1,
    races: currentSelectedRace.value,
    classes: null
  }
})

watch(activeSlideIndex, (newIndex) => {
  const selectedRace = compendiumStore.races[newIndex]
  if (selectedRace) selectRace(selectedRace)
})

onMounted(() => {
  if (draft.value.race) {
    const idx = compendiumStore.races.findIndex(r => r.id === draft.value.race?.id)
    if (idx !== -1) activeSlideIndex.value = idx
  } else if (compendiumStore.races.length > 0) {
    selectRace(compendiumStore.races[0])
  }
})
</script>

<style scoped>
.hq-tabs-container {
  /* Un gris "carbón" más profundo que el grey-darken-4 (#212121) */
  background-color: #151515cb !important; 
}
.gap-y-2 {
  row-gap: 8px !important;
}
.gap-x-2 {
  column-gap: 8px !important;
}
.border-top-thin {
  border-top: 1px solid rgba(255, 255, 255, 0.05) !important;
}
:deep(.v-window__controls) {
  padding: 0 12px;
}
.text-xxs { 
  font-size: 0.75rem !important; 
}

.tracking-widest {
  letter-spacing: 0.1em !important;
}

.hq-section-header {
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
}
.hq-section-header::after {
  content: '';
  flex-grow: 1;
  margin-left: 8px;
  height: 1px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.08), transparent);
  align-self: center;
}

.bg-hq-row {
  background-color: rgba(255, 255, 255, 0.02) !important;
  border-color: rgba(255, 255, 255, 0.05) !important;
}
.gap-y-1 {
  row-gap: 6px !important;
}
</style>