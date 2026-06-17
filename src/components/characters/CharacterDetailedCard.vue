<template>
  <VCard class="hq-hq-card mx-auto d-flex flex-column" height="720"
  max-height="720" variant="flat">
    
    <HeaderDetailedCard
    :character="character"
    ></HeaderDetailedCard>

    <VTabs 
      v-model="activeTab" 
      color="primary" 
      grow 
      density="compact"
      class="border-bottom-thin flex-shrink-0 bg-white"
    >
      <VTab value="stats" class="hq-tab-text"><VIcon icon="mdi-sword-cross" class="d-sm-inline me-sm-1" size="small" />Stats</VTab>
      <VTab value="skills" class="hq-tab-text"><VIcon icon="mdi-auto-fix" class="d-sm-inline me-sm-1" size="small" />Habs</VTab>
      <VTab value="spells" class="hq-tab-text"><VIcon icon="mdi-wizard-hat" class="d-sm-inline me-sm-1" size="small" />Magia</VTab>
      <VTab value="equipment" class="hq-tab-text"><VIcon icon="mdi-shield-account" class="d-sm-inline me-sm-1" size="small" />Equipo</VTab>
    </VTabs>

    <div class="hq-scroll-body flex-grow-1 bg-grey-lighten-5">
      
      <div v-if="activeTab === 'stats'" class="pa-4 pa-sm-6 d-flex flex-column h-100">
        <StatsTab
        :character="character"
        @saveStats="(payload) => $emit('saveStats', payload)"
        ></StatsTab>
      </div>

      <div v-if="activeTab === 'skills'" class="pa-4 pa-sm-6">
        <AbilitiesTab
        :character="character"
        ></AbilitiesTab>
      </div>

      <div v-if="activeTab === 'spells'" class="pa-4 pa-sm-6">
        <SpellsTab
        :character="character"
        ></SpellsTab>
      </div>

      <div v-if="activeTab === 'equipment'" class="pa-4">
        <EquipmentTab
        :character="character"
        @unequipItem="$emit('unequipItem', $event)"
        ></EquipmentTab>
      </div>

    </div>

    <div class="pa-3 bg-grey-lighten-4 border-top-thin d-flex justify-end flex-shrink-0">
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
  (e: 'saveStats', payload: { characterId: number; updates: Record<string, number>; totalSpent: number; onSuccess?: () => void }): void
  (e: 'unequipItem', payload: { characterId: number; slot: string }): void
}>()

const activeTab = ref('stats')

</script>

<style scoped>
/* 🎯 ARQUITECTURA DE ALTURA CONGELADA NATIVA (SIN COMPONENTES TRAICIONEROS) */
.hq-hq-card {
  width: 95vw !important;         
  max-width: 950px !important;    
  
  border-radius: 12px;
  overflow: hidden !important;    
  border: 1px solid rgba(0, 0, 0, 0.12);
}

/* Cabecera proporcional */
.hq-header {
  height: 130px;
}

/* El motor del Scroll: solo este div intermedio genera barra de desplazamiento */
.hq-scroll-body {
  flex-grow: 1 !important;
  height: 100% !important; /* Fuerza al contenedor a rellenar el chasis de la carta */
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch;
}

/* Estilos de tipografía compacta HeroQuest */
.bg-gradient-dark {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.2) 100%);
  width: 100%;
}
.border-bottom-thin { border-bottom: 1px solid rgba(0, 0, 0, 0.08); }
.border-top-thin { border-top: 1px solid rgba(0, 0, 0, 0.08); }
.min-h-30 { min-height: 30px; }

.hq-mini-text {
  font-size: 0.7rem;
  letter-spacing: 0.05em;
}
.hq-tab-text {
  font-size: 0.75rem !important;
  font-weight: 800 !important;
  letter-spacing: 0px !important;
}


.hq-slot-tag {
  font-size: 0.58rem;
  letter-spacing: 0.02em;
}
.hq-item-name {
  font-size: 0.75rem;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.gap-x-2 {
  column-gap: 8px !important;
}
.gap-x-1 {
  column-gap: 4px !important;
}

</style>