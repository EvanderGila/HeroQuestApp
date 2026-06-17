<template>
    <div v-if="hasAbilities" class="d-flex flex-column gap-4">
          
          <div v-if="raceAbilities.length > 0" class="mb-4">
            <h4 class="text-caption font-weight-bold text-uppercase text-primary mb-2">Rasgos de Raza ({{ characterRace?.name || 'Sin Raza' }})</h4>
            <VRow dense>
              <VCol cols="12" sm="12" v-for="ra in raceAbilities" :key="ra.abilities.id" class="pa-1">
                <VCard variant="tonal" :color="isLevelUnlocked(ra.required_lvl) ? 'secondary' : 'grey'" class="border-thin pa-3 h-100" :disabled="!isLevelUnlocked(ra.required_lvl)">
                  
                  <div class="d-flex align-center justify-space-between mb-2">
                    <span class="font-weight-black text-body-2 line-clamp-1">
                      <VIcon icon="mdi-dna" size="16" class="me-1"/>{{ ra.abilities.name }}
                    </span>
                    
                    <div class="d-flex align-center gap-x-2">
                      <VChip 
                        size="x-small" 
                        :variant="isLevelUnlocked(ra.required_lvl) ? 'flat' : 'outlined'"
                        :color="ra.abilities.type === 'passive' ? 'blue-darken-1' : 'orange-darken-2'"
                        class="font-weight-bold"
                      >
                        {{ ra.abilities.type === 'passive' ? 'Pasiva' : 'Activa' }}
                      </VChip>

                      <VChip 
                        v-if="!isLevelUnlocked(ra.required_lvl)" 
                        size="x-small" 
                        color="error" 
                        variant="flat"
                        prepend-icon="mdi-lock"
                        class="font-weight-black"
                      >
                        Req. Nv. {{ ra.required_lvl }}
                      </VChip>
                    </div>
                  </div>

                  <p class="hq-mini-desc mb-0 text-medium-emphasis">{{ ra.abilities.description || 'Sin descripción.' }}</p>
                </VCard>
              </VCol>
            </VRow>
          </div>

          <div v-if="classAbilities.length > 0">
            <h4 class="text-caption font-weight-bold text-uppercase text-primary mb-2">Técnicas de Clase ({{ characterClass?.name || 'Sin clase' }})</h4>
            <VRow dense>
              <VCol cols="12" sm="12" v-for="ca in classAbilities" :key="ca.abilities.id" class="pa-1">
                <VCard variant="tonal" :color="isLevelUnlocked(ca.required_lvl) ? 'primary' : 'grey'" class="border-thin pa-3 h-100" :disabled="!isLevelUnlocked(ca.required_lvl)">
                  
                  <div class="d-flex align-center justify-space-between mb-2">
                    <span class="font-weight-black text-body-2 line-clamp-1">
                      <VIcon icon="mdi-sword-master" size="16" class="me-1"/>{{ ca.abilities.name }}
                    </span>
                    
                    <div class="d-flex align-center gap-x-2">
                      <VChip 
                        size="x-small" 
                        :variant="isLevelUnlocked(ca.required_lvl) ? 'flat' : 'outlined'"
                        :color="ca.abilities.type === 'passive' ? 'blue-darken-1' : 'orange-darken-2'"
                        class="font-weight-bold"
                      >
                        {{ ca.abilities.type === 'passive' ? 'Pasiva' : 'Activa' }}
                      </VChip>

                      <VChip 
                        v-if="!isLevelUnlocked(ca.required_lvl)" 
                        size="x-small" 
                        color="error" 
                        variant="flat"
                        prepend-icon="mdi-lock"
                        class="font-weight-black"
                      >
                        Req. Nv. {{ ca.required_lvl }}
                      </VChip>
                    </div>
                  </div>

                  <p class="hq-mini-desc mb-0 text-medium-emphasis">{{ ca.abilities.description || 'Sin descripción.' }}</p>
                </VCard>
              </VCol>
            </VRow>
          </div>

        </div>
        <div v-else class="text-center py-8 text-medium-emphasis">
          <VIcon icon="mdi-book-open-blank-variant" size="36" class="mb-2 text-disabled" />
          <p class="text-caption">Este aventurero no posee rasgos ni técnicas aprendidas.</p>
        </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { Character } from '@/types/character'

const props = defineProps<{
  character: Character // Tu interfaz de personaje de Supabase
}>()

// 🛡️ Computados seguros: si no existen, devuelven un objeto vacío o un array vacío por defecto
const characterRace = computed(() => props.character?.races)
const raceAbilities = computed(() => props.character?.races?.race_abilities || [])

const characterClass = computed(() => props.character?.classes)
const classAbilities = computed(() => props.character?.classes?.class_abilities || [])

// Simplificamos también el chequeo global usando los nuevos computados limpios
const hasAbilities = computed(() => {
  return raceAbilities.value.length > 0 || classAbilities.value.length > 0
})

function isLevelUnlocked(requiredLvl: number): boolean {
  return (props.character.lvl || 1) >= requiredLvl
}
</script>
<style scoped>
.hq-mini-desc {
  font-size: 0.75rem;
  line-height: 1.3;
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
</style>