<template>
  <div v-if="!selectedRace" class="d-flex align-center justify-center pa-12">
    <VProgressCircular indeterminate color="primary" size="64" />
  </div>

  <VCard v-else variant="flat" class="hq-detail-card overflow-hidden rounded-xl position-relative">
    <VBtn
      icon="mdi-close"
      variant="text"
      color="grey-lighten-1"
      size="small"
      class="hq-close-dialog-btn"
      @click="$emit('close')"
    />

    <div class="hq-navbar-noise"></div>

    <VCardText class="pa-0">
      <VRow no-gutters>
        <VCol cols="12" sm="5" class="position-relative hq-image-column">
          <VImg
            :src="selectedRace.img || '/placeholder-race.png'"
            cover
            class="hq-detail-image"
          >
            <template #placeholder>
              <div class="d-flex align-center justify-center fill-height bg-grey-darken-4">
                <VProgressCircular indeterminate color="primary" size="48" />
              </div>
            </template>
          </VImg>
          <div class="hq-detail-overlay"></div>
          
          <div class="hq-image-floating-title pa-4">
            <span class="text-uppercase tracking-widest text-xxs font-weight-bold text-amber">
              Compendio de Razas
            </span>
            <h2 class="text-h4 font-weight-black text-white text-uppercase tracking-wide">
              {{ selectedRace.name }}
            </h2>
          </div>
        </VCol>

        <VCol cols="12" sm="7" class="pa-4 pa-md-6 d-flex flex-column gap-y-4 hq-info-column">
          
          <div class="hq-detail-section border-thin pa-4 rounded-xl">
            <div class="hq-section-header mb-3">
              <span class="text-uppercase tracking-widest font-weight-bold text-xxs text-warning">
                ⚔️ Atributos de la Raza
              </span>
            </div>
            
            <div class="d-flex flex-column gap-y-1">
              <div 
                v-for="stat in displayedStats" 
                :key="stat.label" 
                class="d-flex align-center justify-space-between bg-hq-row px-3 py-2 rounded-lg border-thin hq-stat-row"
              >
                <div class="d-flex align-center gap-x-2">
                  <VIcon :icon="stat.icon" :color="stat.color" size="16" />
                  <span class="text-caption text-grey-lighten-1 font-weight-medium">{{ stat.label }}</span>
                </div>
                <span class="text-caption font-weight-black text-white">
                  {{ stat.value }}
                </span>
              </div>
            </div>
          </div>

          <div class="hq-detail-section border-thin pa-4 rounded-xl flex-grow-1">
            <div class="hq-section-header mb-3">
              <span class="text-uppercase tracking-widest font-weight-bold text-xxs text-cyan-lighten-2">
                📜 Habilidades de Sangre y Linaje
              </span>
            </div>

            <AbilitiesTab :character="mockCharacterForAbilities" />
          </div>

        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { computed, watch, onMounted } from 'vue'
import { useCompendium } from '@/composables/useCompendium'
import AbilitiesTab from '@/components/characters/AbilitiesTab.vue'

const props = defineProps<{
  raceId: number
}>()

// 🔥 Definimos el evento de cierre que escucha el padre
defineEmits(['close'])

const { selectedRace, fetchRaceDetails } = useCompendium()

const mockCharacterForAbilities = computed<any>(() => {
  return {
    lvl: 100,
    races: selectedRace.value,
    classes: null
  }
})

const displayedStats = computed(() => {
  if (!selectedRace.value) return []
  return [
    { label: 'Puntos de Cuerpo (Vida)', value: selectedRace.value.hp_base, icon: 'mdi-heart', color: 'red-lighten-1' },
    { label: 'Ataque Base', value: selectedRace.value.atk_base, icon: 'mdi-sword', color: 'orange-lighten-2' },
    { label: 'Defensa Base', value: selectedRace.value.def_base, icon: 'mdi-shield', color: 'blue-lighten-2' },
    { label: 'Puntos de Mente (Maná)', value: selectedRace.value.mp_base, icon: 'mdi-creation', color: 'cyan-lighten-2' },
    { label: 'Movimiento Base', value: selectedRace.value.mov_base, icon: 'mdi-shoe-print', color: 'green-lighten-2' },
  ]
})

onMounted(() => {
  fetchRaceDetails(props.raceId)
})

watch(() => props.raceId, (newId) => { 
  fetchRaceDetails(newId) 
})
</script>

<style scoped>
.text-xxs { font-size: 0.65rem !important; }
.gap-x-2 { column-gap: 8px !important; }
.gap-y-1 { row-gap: 4px !important; }
.gap-y-4 { row-gap: 16px !important; }

/* ── ❌ BOTÓN CERRAR FLOTANTE ── */
.hq-close-dialog-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10; /* Asegura estar por encima de los degradados e imágenes */
  background: rgba(5, 7, 12, 0.4) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  backdrop-filter: blur(4px);
  transition: all 0.2s ease;
}

.hq-close-dialog-btn:hover {
  background: rgba(244, 67, 54, 0.2) !important; /* Destello sutil rojo al pasar el ratón */
  border-color: rgba(244, 67, 54, 0.4) !important;
  color: #fff !important;
}

/* ── 🎴 DIÁLOGO BASE ── */
.hq-detail-card {
  background: #090d16 !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8) !important;
  max-height: calc(100dvh - 24px);
  overflow-y: auto !important;
}

.hq-detail-section {
  background: rgba(15, 22, 36, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.03) !important;
}

.bg-hq-row {
  background: rgba(5, 7, 12, 0.8) !important;
  border: 1px solid rgba(255, 255, 255, 0.02) !important;
}

/* ── 🖼️ CONTENEDOR DE IMAGEN INTELIGENTE ── */
.hq-image-column {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5 !important; 
}

.hq-detail-image {
  height: 100% !important;
  width: 100% !important;
}

.hq-detail-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(9, 13, 22, 0) 60%, rgba(9, 13, 22, 0.9) 95%, rgba(9, 13, 22, 1) 100%);
  z-index: 1;
}

.hq-image-floating-title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  background: linear-gradient(to top, rgba(9, 13, 22, 0.95) 0%, rgba(9, 13, 22, 0) 100%);
}

.hq-navbar-noise {
  position: absolute;
  inset: 0;
  opacity: 0.015;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

/* 📱 RESPONSIVE */
@media (max-width: 599px) {
  .hq-image-column {
    aspect-ratio: 16 / 9 !important; 
  }
  .hq-detail-overlay {
    background: linear-gradient(to bottom, rgba(9, 13, 22, 0) 20%, rgba(9, 13, 22, 0.85) 80%, rgba(9, 13, 22, 1) 100%) !important;
  }
}

@media (max-height: 500px) and (orientation: landscape) {
  .hq-image-column {
    aspect-ratio: 21 / 9 !important; 
  }
}
</style>