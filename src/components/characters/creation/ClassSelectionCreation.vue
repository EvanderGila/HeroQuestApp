<template>
  <div class="pa-2 pa-sm-3">
    
    <div class="text-center">
      <h4 class="text-h6 font-weight-black text-uppercase text-high-emphasis lh-tight">Elige tu Profesión</h4>
      <p class="text-caption text-medium-emphasis mb-0">Modificadores de entrenamiento, técnicas y magia.</p>
    </div>

    <VRow align="center" no-gutters>
      <VCol cols="12" md="7" class="d-flex align-center justify-center pa-2">
        <VCarousel
          v-if="characterStore.availableClasses.length > 0"
          v-model="activeSlideIndex"
          height="350"
          hide-delimiter-background
          hide-delimiters
          show-arrows="hover"
          color="warning"
          class="hq-hero-carousel w-100"
        >
          <VCarouselItem v-for="cls in characterStore.availableClasses" :key="cls.id">
            <VSheet class="d-flex fill-height align-center justify-center bg-transparent pa-1">
              <VCard width="320" class="border-thin bg-grey-darken-3 text-white rounded-xl elevation-8 text-center overflow-hidden">
                <VImg 
                  :src="cls.img || 'https://placehold.co/400x300?text=' + cls.name" 
                  height="280" 
                  cover 
                />
                <VCardText class="py-2 bg-grey-darken-4 border-top-thin">
                  <div class="text-subtitle-1 font-weight-black text-uppercase tracking-wide text-warning">
                    {{ cls.name }}
                  </div>
                </VCardText>
              </VCard>
            </VSheet>
          </VCarouselItem>
        </VCarousel>
      </VCol>

      <VCol cols="12" md="5" class="pa-2">
        <div v-if="currentSelectedClass" class="bg-grey-darken-4 border-thin pa-4 rounded-xl">
          <div class="text-caption font-weight-bold text-uppercase text-warning mb-3 tracking-wide">
            Bonificadores de Clase
          </div>
          
          <div class="d-flex flex-column gap-y-2">
            <div 
              v-for="stat in displayedModifiers" 
              :key="stat.label" 
              class="d-flex align-center justify-space-between bg-grey-darken-3 px-4 py-2 rounded-lg border-thin"
            >
              <div class="d-flex align-center gap-x-2">
                <VIcon :icon="stat.icon" :color="stat.color" size="18" />
                <span class="text-body-2 font-weight-medium text-grey-lighten-1">{{ stat.label }}</span>
              </div>
              <span class="text-body-1 font-weight-black text-white">{{ stat.value }}</span>
            </div>
          </div>
        </div>
      </VCol>
    </VRow>

    <VDivider class="my-3" />

    <div v-if="currentSelectedClass" class="bg-white border-thin pa-3 rounded-xl">
      <VTabs v-model="activeTab" color="primary" density="compact" class="mb-2">
        <VTab value="abilities" class="text-caption font-weight-bold">Habilidades</VTab>
        <VTab v-if="hasSpells" value="spells" class="text-caption font-weight-bold">Hechizos Iniciales</VTab>
      </VTabs>

      <VWindow v-model="activeTab">
        <VWindowItem value="abilities">
          <AbilitiesTab :character="mockCharacterForClass" />
        </VWindowItem>
        <VWindowItem v-if="hasSpells" value="spells">
          <SpellsTab :character="mockCharacterForClass" />
        </VWindowItem>
      </VWindow>
    </div>

    <div class="d-flex justify-space-between mt-4">
      <VBtn 
        variant="text" 
        color="grey-lighten-1" 
        prepend-icon="mdi-arrow-left"
        class="font-weight-bold"
        @click="previousStep"
      >
        Atrás
      </VBtn>
      <VBtn 
        color="primary" 
        :disabled="!canContinue" 
        append-icon="mdi-arrow-right" 
        class="font-weight-bold px-6"
        @click="nextStep"
      >
        Siguiente
      </VBtn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useCharacterStore } from '@/store/characterStore'
import { useCharacterCreation } from '@/composables/useCharacterCreation'
import AbilitiesTab from '@/components/characters/AbilitiesTab.vue'
import SpellsTab from '@/components/characters/SpellsTab.vue' // Asegúrate de importar tu pestaña de hechizos

const characterStore = useCharacterStore()
const { selectClass, nextStep, previousStep, canContinue, draft } = useCharacterCreation()

const activeSlideIndex = ref(0)
const activeTab = ref('abilities')

const currentSelectedClass = computed(() => {
  return characterStore.availableClasses[activeSlideIndex.value] || null
})

// Mapeo adaptado para mostrar los incrementos (+ / -) que aporta la clase elegida
const displayedModifiers = computed(() => {
  const c = currentSelectedClass.value
  if (!c) return []
  
  const formatMod = (val: number, isDice = false) => {
    const sign = val >= 0 ? '+' : ''
    return `${sign}${val}${isDice ? 'd' : ''}`
  }

  return [
    { label: 'Mod. Cuerpo', icon: 'mdi-heart', color: 'red-lighten-1', value: formatMod(c.hp_mod), rawVal: c.hp_mod },
    { label: 'Mod. Mente', icon: 'mdi-brain', color: 'purple-lighten-2', value: formatMod(c.mp_mod), rawVal: c.mp_mod },
    { label: 'Mod. Ataque', icon: 'mdi-sword', color: 'orange-darken-1', value: formatMod(c.atk_mod, true), rawVal: c.atk_mod },
    { label: 'Mod. Defensa', icon: 'mdi-shield', color: 'blue-lighten-1', value: formatMod(c.def_mod, true), rawVal: c.def_mod },
    { label: 'Mod. Movimiento', icon: 'mdi-run', color: 'teal-lighten-2', value: formatMod(c.mov_mod), rawVal: c.mov_mod },
  ]
})

// Evalúa si la clase elegida tiene magia asignada en la BD
const hasSpells = computed(() => {
  return (currentSelectedClass.value?.class_spells?.length || 0) > 0
})

// Hack Elegante: Mokeamos el personaje invirtiendo los roles del paso anterior
const mockCharacterForClass = computed<any>(() => {
  return {
    lvl: 1,
    races: null, // Oculta rasgos de raza en este paso
    classes: currentSelectedClass.value
  }
})

// Forzar el tab a volver a "Técnicas" si cambian de clase y la nueva no tiene hechizos
watch(hasSpells, (newHasSpells) => {
  if (!newHasSpells) activeTab.value = 'abilities'
})

// Sincronizar el movimiento del carrusel con el estado del borrador global
watch(activeSlideIndex, (newIndex) => {
  const selectedClass = characterStore.availableClasses[newIndex]
  if (selectedClass) selectClass(selectedClass)
})

onMounted(() => {
  if (draft.value.class) {
    const idx = characterStore.availableClasses.findIndex(c => c.id === draft.value.class?.id)
    if (idx !== -1) activeSlideIndex.value = idx
  } else if (characterStore.availableClasses.length > 0) {
    selectClass(characterStore.availableClasses[0])
  }
})
</script>

<style scoped>
.lh-tight {
  line-height: 1.1;
}
.gap-y-2 {
  row-gap: 8px !important;
}
.gap-x-2 {
  column-gap: 8px !important;
}
.border-top-thin {
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
}
:deep(.v-window__controls) {
  padding: 0 12px;
}
</style>