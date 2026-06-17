<template>
  <VCard 
    variant="flat" 
    class="bg-grey-darken-4 border-thin rounded-xl text-white sticky-card h-100 d-flex flex-column"
  >
    <!-- 🖼️ Cabecera: Retrato e Identidad Principal -->
    <div class="relative-container">
      <VImg 
        :src="characterImage" 
        height="180" 
        cover 
        class="align-end"
      >
        <!-- Degradado oscuro sobre la imagen para que el texto siempre se lea -->
        <div class="fill-height w-100 d-flex flex-column justify-end pa-3 bg-gradient-shadow">
          <div class="text-h6 font-weight-black text-truncate tracking-wide lh-tight">
            {{ draft.name || 'Héroe Sin Nombre' }}
          </div>
          <div class="text-caption text-warning font-weight-bold text-uppercase tracking-wider">
            {{ draft.race?.name || 'Raza no elegida' }} 
            <span v-if="draft.class" class="text-grey-lighten-1">| {{ draft.class.name }}</span>
          </div>
        </div>
      </VImg>
    </div>

    <!-- 📊 Cuerpo: Stats Combinadas en Tiempo Real -->
    <VCardText class="pa-3 flex-grow-1 overflow-y-auto">
      <div class="text-caption font-weight-bold text-uppercase text-disabled mb-2 tracking-wide" style="font-size: 0.65rem;">
        Atributos Actuales
      </div>
      
      <VRow dense class="mb-3">
        <VCol v-for="stat in currentLiveStats" :key="stat.label" cols="6" sm="4" md="12" class="py-0.5">
          <div class="d-flex align-center justify-space-between bg-grey-darken-3 px-2.5 py-1 rounded border-thin">
            <div class="d-flex align-center gap-x-2">
              <VIcon :icon="stat.icon" :color="stat.color" size="14" />
              <span class="text-caption text-grey-lighten-1 text-truncate" style="font-size: 0.75rem;">{{ stat.label }}</span>
            </div>
            <span class="text-caption font-weight-black">{{ stat.value }}</span>
          </div>
        </VCol>
      </VRow>

      <!-- ⚔️ Listado Compacto de Rasgos, Habilidades y Hechizos -->
      <div v-if="hasAnyTrait" class="border-top-thin pt-2">
        <!-- Habilidades de Raza -->
        <div v-if="raceAbilities.length > 0" class="mb-2">
          <div class="text-caption font-weight-bold text-uppercase text-disabled mb-1" style="font-size: 0.65rem;">
            Rasgos de Linaje
          </div>
          <div class="d-flex flex-wrap gap-1">
            <VChip 
              v-for="ab in raceAbilities" 
              :key="ab.id" 
              size="x-small" 
              variant="tonal" 
              color="warning"
              class="font-weight-medium"
            >
              {{ ab.name }}
            </VChip>
          </div>
        </div>

        <!-- Técnicas de Clase -->
        <div v-if="classAbilities.length > 0" class="mb-2">
          <div class="text-caption font-weight-bold text-uppercase text-disabled mb-1" style="font-size: 0.65rem;">
            Técnicas de Clase
          </div>
          <div class="d-flex flex-wrap gap-1">
            <VChip 
              v-for="ab in classAbilities" 
              :key="ab.id" 
              size="x-small" 
              variant="tonal" 
              color="info"
              class="font-weight-medium"
            >
              {{ ab.name }}
            </VChip>
          </div>
        </div>

        <!-- Hechizos -->
        <div v-if="classSpells.length > 0">
          <div class="text-caption font-weight-bold text-uppercase text-disabled mb-1" style="font-size: 0.65rem;">
            Ars Magica (Hechizos)
          </div>
          <div class="d-flex flex-wrap gap-1">
            <VChip 
              v-for="spell in classSpells" 
              :key="spell.id" 
              size="x-small" 
              variant="tonal" 
              color="purple-lighten-3"
              class="font-weight-medium"
            >
              {{ spell.name }}
            </VChip>
          </div>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCharacterCreation } from '@/composables/useCharacterCreation'

const { draft, calculatedStats } = useCharacterCreation()

// Resguardo de imagen inteligente: Prioriza la foto de identidad, luego la de la raza, si no un placeholder
const characterImage = computed(() => {
  return draft.value.img || draft.value.race?.img || 'https://placehold.co/400x300?text=Forjando+Heroe'
})

// Mapea los atributos mezclados dinámicamente
const currentLiveStats = computed(() => {
  const s = calculatedStats.value
  return [
    { label: 'Cuerpo', icon: 'mdi-heart', color: 'red-lighten-1', value: s.hp },
    { label: 'Mente', icon: 'mdi-brain', color: 'purple-lighten-2', value: s.mp },
    { label: 'Ataque', icon: 'mdi-sword', color: 'orange-darken-1', value: `${s.atk}d` },
    { label: 'Defensa', icon: 'mdi-shield', color: 'blue-lighten-1', value: `${s.def}d` },
    { label: 'Movimiento', icon: 'mdi-run', color: 'teal-lighten-2', value: s.mov }
  ]
})

// Extrae de forma segura los arrays de Supabase
const raceAbilities = computed(() => draft.value.race?.race_abilities || [])
const classAbilities = computed(() => draft.value.class?.class_abilities || [])
const classSpells = computed(() => draft.value.class?.class_spells || [])

const hasAnyTrait = computed(() => {
  return raceAbilities.value.length > 0 || classAbilities.value.length > 0 || classSpells.value.length > 0
})
</script>

<style scoped>
.lh-tight {
  line-height: 1.1;
}
.gap-x-2 {
  column-gap: 8px !important;
}
.gap-1 {
  gap: 4px !important;
}
.border-top-thin {
  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
}
.bg-gradient-shadow {
  background: linear-gradient(to top, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 0.4) 60%, rgba(0, 0, 0, 0) 100%);
}
/* Mantiene la tarjeta fija a la derecha al hacer scroll en ordenadores */
@media (min-width: 960px) {
  .sticky-card {
    position: sticky;
    top: 24px;
    max-height: calc(100vh - 120px);
  }
}
</style>