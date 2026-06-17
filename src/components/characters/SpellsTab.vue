<template>
    <div v-if="hasSpells">
          <VRow dense>
            <VCol cols="12" sm="6" v-for="cs in classSpells" :key="cs.spells.id" class="pa-1">
              <VCard 
                variant="outlined" 
                :color="isLevelUnlocked(cs.required_lvl) ? 'deep-purple-lighten-1' : 'grey-lighten-1'" 
                class="border-thin pa-3 d-flex flex-column justify-space-between bg-surface h-100"
                :disabled="!isLevelUnlocked(cs.required_lvl)"
              >
                <div>
                  <div class="d-flex align-center justify-space-between mb-1">
                    <span class="font-weight-black text-body-2"><VIcon icon="mdi-star-flash" color="deep-purple" size="16" class="me-1"/>{{ cs.spells.name }}</span>
                    <VChip v-if="!isLevelUnlocked(cs.required_lvl)" size="x-small" color="error" variant="flat">Bloqueado (Nv. {{ cs.required_lvl }})</VChip>
                  </div>
                  <p class="hq-mini-desc italic mb-2 text-medium-emphasis">"{{ cs.spells.description }}"</p>
                </div>
                <div class="d-flex justify-space-between align-center pt-2 border-top-thin">
                  <span class="text-caption font-weight-bold text-deep-purple">
                    <VIcon icon="mdi-lightning-bolt" size="12" />{{ cs.spells.mana_cost || 0 }} PM
                  </span>
                  <VChip v-if="isLevelUnlocked(cs.required_lvl)" size="x-small" color="deep-purple" variant="flat">Listo</VChip>
                </div>
              </VCard>
            </VCol>
          </VRow>
        </div>
        <div v-else class="text-center py-8 text-medium-emphasis">
          <VIcon icon="mdi-wizard-hat" size="36" class="mb-2 text-disabled" />
          <p class="text-caption">Tu clase actual no puede canalizar o aprender hechizos arcanos.</p>
        </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  character: any // Tu interfaz de personaje de Supabase
}>()

// La raza no tiene hechizos propios de momento
// const characterRace = computed(() => props.character?.races || {})
// const raceSpells = computed(() => props.character?.races?.race_spells || [])

const characterClass = computed(() => props.character?.classes || {})
const classSpells = computed(() => props.character?.classes?.class_spells || [])

const hasSpells = computed(() => {
  return classSpells.value.length > 0
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
