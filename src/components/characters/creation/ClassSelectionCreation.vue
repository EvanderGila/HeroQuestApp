<template>
  <div class="pa-2 pa-sm-3">
    
    <div class="text-center">
      <h4 class="text-h6 font-weight-black text-uppercase text-high-emphasis lh-tight">Elige tu Profesión</h4>
      <p class="text-caption text-medium-emphasis mb-0">Modificadores de entrenamiento, técnicas y magia.</p>
    </div>

    <VRow align="center" no-gutters>
      <VCol cols="12" md="7" class="d-flex align-center justify-center pa-2">
        <VCarousel
          v-if="compendiumStore.classes.length > 0"
          v-model="activeSlideIndex"
          height="350"
          hide-delimiter-background
          hide-delimiters
          show-arrows="hover"
          color="warning"
          class="hq-hero-carousel w-100"
        >
          <VCarouselItem v-for="cls in compendiumStore.classes" :key="cls.id">
            <VSheet class="d-flex fill-height align-center justify-center bg-transparent pa-1">
              <VCard width="200" class="border-thin bg-grey-darken-3 text-white rounded-xl elevation-8 text-center overflow-hidden">
                <VImg 
                  :src="cls.img || 'https://placehold.co/400x300?text=' + cls.name" 
                  height="280" 
                  cover 
                />
                <VCardText class="py-2 hq-tabs-container border-top-thin">
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
  <div v-if="currentSelectedClass" class="hq-tabs-container border-thin pa-4 rounded-xl">
    <!-- 🏷️ Encabezado RPG unificado con línea desvanecida -->
    <div class="hq-section-header mb-4">
      <span class="text-uppercase tracking-widest font-weight-bold text-xxs text-warning">
        Bonificadores de Clase
      </span>
    </div>
    
    <!-- 📊 Contenedor de estadísticas estilizadas -->
    <div class="d-flex flex-column gap-y-1">
      <div 
        v-for="stat in displayedModifiers" 
        :key="stat.label" 
        class="d-flex align-center justify-space-between bg-hq-row px-3 py-1 rounded-lg border-thin transition-all hq-stat-row"
      >
        <!-- Izquierda: Icono y Etiqueta -->
        <div class="d-flex align-center gap-x-2">
          <VIcon :icon="stat.icon" :color="stat.color" size="15" />
          <span class="text-caption text-grey-lighten-1 font-weight-medium">{{ stat.label }}</span>
        </div>
        
        <!-- Derecha: Modificador formateado (ej: +1d o +5) con colores de Vuetify unificados -->
        <span 
          class="text-caption font-weight-black"
          :class="{
            'text-green-lighten-1': stat.rawVal > 0,
            'text-red-lighten-1': stat.rawVal < 0,
            'text-white': stat.rawVal === 0
          }"
        >
          <!-- Si tu stat.value no incluye ya la 'd', puedes concatenarla según corresponda -->
          {{ stat.value }}
        </span>
      </div>
    </div>
  </div>
</VCol>
    </VRow>

    <VDivider class="my-3" />

    <div v-if="currentSelectedClass" class="hq-tabs-container border-thin pa-3 rounded-xl">
      <VTabs v-model="activeTab" color="primary" density="compact" class="mb-2">
        <VTab value="abilities" class="text-caption font-weight-bold">Habilidades</VTab>
        <VTab v-if="hasSpells" value="spells" class="text-caption font-weight-bold">Hechizos</VTab>
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
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useCompendiumStore } from '@/store/compendiumStore'
import { useCharacterCreation } from '@/composables/useCharacterCreation'
import AbilitiesTab from '@/components/characters/AbilitiesTab.vue'
import SpellsTab from '@/components/characters/SpellsTab.vue' // Asegúrate de importar tu pestaña de hechizos

const compendiumStore = useCompendiumStore()
const { selectClass, nextStep, previousStep, canContinue, draft } = useCharacterCreation()

const activeSlideIndex = ref(0)
const activeTab = ref('abilities')

const currentSelectedClass = computed(() => {
  return compendiumStore.classes[activeSlideIndex.value] || null
})

// Mapeo adaptado para mostrar los incrementos (+ / -) que aporta la clase elegida
const displayedModifiers = computed(() => {
  const c = currentSelectedClass.value
  if (!c) return []
  
  const formatMod = (val: number) => {
    if(val == 0){ return val }
    else{
      const sign = val >= 0 ? '+' : ''
    return `${sign}${val}`
    }
  }

  return [
    { label: 'Mod. Cuerpo', icon: 'mdi-heart', color: 'red-lighten-1', value: formatMod(c.hp_mod), rawVal: c.hp_mod },
    { label: 'Mod. Mente', icon: 'mdi-brain', color: 'purple-lighten-2', value: formatMod(c.mp_mod), rawVal: c.mp_mod },
    { label: 'Mod. Ataque', icon: 'mdi-sword', color: 'orange-darken-1', value: formatMod(c.atk_mod), rawVal: c.atk_mod },
    { label: 'Mod. Defensa', icon: 'mdi-shield', color: 'blue-lighten-1', value: formatMod(c.def_mod), rawVal: c.def_mod },
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
  const selectedClass = compendiumStore.classes[newIndex]
  if (selectedClass) selectClass(selectedClass)
})

onMounted(() => {
  if (draft.value.class) {
    const idx = compendiumStore.classes.findIndex(c => c.id === draft.value.class?.id)
    if (idx !== -1) activeSlideIndex.value = idx
  } else if (compendiumStore.classes.length > 0) {
    selectClass(compendiumStore.classes[0])
  }
})
</script>

<style scoped>
.hq-tabs-container {
  /* Un gris "carbón" más profundo que el grey-darken-4 (#212121) */
  background-color: #151515cb !important; 
}
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
.text-xxs { 
  font-size: 0.75rem !important; 
}

.tracking-widest {
  letter-spacing: 0.1em !important;
}

/* 🏷️ LÍNEA SEPARADORA DESVANECIDA SECCIÓN */
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

/* 📊 FILAS DE ESTADÍSTICA CON OPACIDAD PREMIUM */
.bg-hq-row {
  background-color: rgba(255, 255, 255, 0.02) !important;
  border-color: rgba(255, 255, 255, 0.05) !important;
}
.gap-y-1 {
  row-gap: 6px !important;
}
</style>