<template>
  <!-- 🎴 Contenedor Adaptable: Altura fluida en móviles, fija en escritorio -->
  <VCard
    class="hq-hq-card mx-auto d-flex flex-column border-thin elevation-4"
    variant="flat"
  >
    <!-- Componente de cabecera (Luego lo unificamos con la estética de la pequeña) -->
    <HeaderDetailedCard :character="character" class="flex-shrink-0" />

    <!-- Pestañas: Eliminamos bg-white para heredar el fondo correcto -->
    <VTabs
      v-model="activeTab"
      color="primary"
      grow
      density="compact"
      class="border-bottom-thin flex-shrink-0"
    >
      <VTab value="stats" class="hq-tab-text">
        <VIcon icon="mdi-sword-cross" class="d-sm-inline me-sm-1" size="small" />
        Stats
      </VTab>
      <VTab value="skills" class="hq-tab-text">
        <VIcon icon="mdi-auto-fix" class="d-sm-inline me-sm-1" size="small" />
        Habs
      </VTab>
      <VTab value="spells" class="hq-tab-text">
        <VIcon icon="mdi-wizard-hat" class="d-sm-inline me-sm-1" size="small" />
        Magia
      </VTab>
      <VTab value="equipment" class="hq-tab-text">
        <VIcon icon="mdi-shield-account" class="d-sm-inline me-sm-1" size="small" />
        Equipo
      </VTab>
    </VTabs>

    <!-- El motor del Scroll: Limpiamos bg-grey para evitar bloques blancos -->
    <div class="hq-scroll-body flex-grow-1">
      <div v-if="activeTab === 'stats'" class="pa-4 pa-sm-6 d-flex flex-column h-100">
        <StatsTab
          :character="character"
          @saveStats="(payload) => $emit('saveStats', payload)"
        />
      </div>

      <div v-if="activeTab === 'skills'" class="pa-4 pa-sm-6">
        <AbilitiesTab :character="character" />
      </div>

      <div v-if="activeTab === 'spells'" class="pa-4 pa-sm-6">
        <SpellsTab :character="character" />
      </div>

      <div v-if="activeTab === 'equipment'" class="pa-4">
        <EquipmentTab
          :character="character"
          @unequipItem="$emit('unequipItem', $event)"
        />
      </div>
    </div>

    <!-- Footer: Fondo transparente heredado -->
    <div class="pa-3 border-top-thin d-flex justify-end flex-shrink-0">
      <VBtn color="grey-darken-3" variant="flat" size="small" @click="$emit('close')">
        Cerrar Panel
      </VBtn>
    </div>
  </VCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AbilitiesTab from '@/components/characters/AbilitiesTab.vue'
import SpellsTab from '@/components/characters/SpellsTab.vue'
import EquipmentTab from '@/components/characters/EquipmentTab.vue'
import StatsTab from '@/components/characters/StatsTab.vue'
import HeaderDetailedCard from '@/components/characters/HeaderDetailedCard.vue'

const props = defineProps<{
  character: any
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (
    e: 'saveStats',
    payload: {
      characterId: number
      updates: Record<string, number>
      totalSpent: number
      onSuccess?: () => void
    }
  ): void
  (e: 'unequipItem', payload: { characterId: number; slot: string }): void
}>()

const activeTab = ref('stats')
</script>

<style scoped>
/* 🎯 ARQUITECTURA RESPONSIVE DINÁMICA */
.hq-hq-card {
  width: 95vw !important;
  max-width: 950px !important;

  /* En móviles ocupa casi todo el alto disponible sin desbordar */
  height: 85vh !important;
  height: 85dvh !important; /* dvh maneja mejor las barras de navegación en móvil */

  border-radius: 12px;
  overflow: hidden !important;
}

/* En escritorio volvemos a congelar la altura para que no se estire infinito */
@media (min-width: 600px) {
  .hq-hq-card {
    height: 720px !important;
    max-height: 900px !important;
  }
}
@media (orientation: landscape) and (max-height: 500px) {
  .hq-hq-card {
    height: auto !important;
    max-height: none !important;
    overflow: visible !important;
  }

  .hq-scroll-body {
    overflow: visible !important;
  }
}

/* El motor del Scroll permanece intacto */
.hq-scroll-body {
  flex-grow: 1 !important;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch;
}

/* Bordes basados en el tema de Vuetify */
.border-bottom-thin {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity)) !important;
}
.border-top-thin {
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity)) !important;
}

/* Pestañas y textos compactos */
.hq-tab-text {
  font-size: 0.75rem !important;
  font-weight: 800 !important;
  letter-spacing: 0px !important;
}

.gap-x-2 {
  column-gap: 8px !important;
}
.gap-x-1 {
  column-gap: 4px !important;
}
</style>
