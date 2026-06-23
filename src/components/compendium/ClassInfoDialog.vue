<template>
  <div v-if="!selectedClass" class="d-flex align-center justify-center pa-12">
    <VProgressCircular indeterminate color="primary" size="64" />
  </div>

  <VCard
    v-else
    variant="flat"
    class="hq-detail-card overflow-hidden rounded-xl position-relative"
  >
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
            :src="selectedClass.img || '/placeholder-class.png'"
            cover
            class="hq-detail-image"
          >
            <template #placeholder>
              <div
                class="d-flex align-center justify-center fill-height bg-grey-darken-4"
              >
                <VProgressCircular indeterminate color="primary" size="48" />
              </div>
            </template>
          </VImg>
          <div class="hq-detail-overlay"></div>

          <div class="hq-image-floating-title pa-4">
            <span
              class="text-uppercase tracking-widest text-xxs font-weight-bold text-amber"
            >
              Compendio de Clases
            </span>
            <h2 class="text-h4 font-weight-black text-white text-uppercase tracking-wide">
              {{ selectedClass.name }}
            </h2>
          </div>
        </VCol>

        <VCol
          cols="12"
          sm="7"
          class="pa-4 pa-md-6 d-flex flex-column gap-y-4 hq-info-column"
        >
          <div class="hq-detail-section border-thin pa-4 rounded-xl">
            <div class="hq-section-header mb-3">
              <span
                class="text-uppercase tracking-widest font-weight-bold text-xxs text-warning"
              >
                📊 Modificadores de la Clase
              </span>
            </div>

            <div class="d-flex flex-column gap-y-1">
              <div
                v-for="stat in displayedModifiers"
                :key="stat.label"
                class="d-flex align-center justify-space-between bg-hq-row px-3 py-1 rounded-lg border-thin transition-all hq-stat-row"
              >
                <div class="d-flex align-center gap-x-2">
                  <VIcon :icon="stat.icon" :color="stat.color" size="15" />
                  <span class="text-caption text-grey-lighten-1 font-weight-medium">
                    {{ stat.label }}
                  </span>
                </div>

                <span
                  class="text-caption font-weight-black"
                  :class="{
                    'text-green-lighten-1': stat.rawVal > 0,
                    'text-red-lighten-1': stat.rawVal < 0,
                    'text-white': stat.rawVal === 0
                  }"
                >
                  {{ stat.value }}
                </span>
              </div>
            </div>
          </div>

          <div class="hq-tabs-container border-thin pa-3 rounded-xl">
            <VTabs v-model="activeTab" color="primary" density="compact" class="mb-2">
              <VTab value="abilities" class="text-caption font-weight-bold">
                Habilidades
              </VTab>
              <VTab value="spells" class="text-caption font-weight-bold">Hechizos</VTab>
            </VTabs>

            <VWindow v-model="activeTab">
              <VWindowItem value="abilities">
                <div class="hq-scrollable-tab-content">
                  <AbilitiesTab :character="mockCharacterForClass" />
                </div>
              </VWindowItem>
              <VWindowItem value="spells">
                <div class="hq-scrollable-tab-content">
                  <SpellsTab :character="mockCharacterForClass" :one-col="true" />
                </div>
              </VWindowItem>
            </VWindow>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, ref } from 'vue'
import { useCompendium } from '@/composables/useCompendium'
import AbilitiesTab from '@/components/characters/AbilitiesTab.vue'
import SpellsTab from '@/components/characters/SpellsTab.vue'

const props = defineProps<{
  classId: number
}>()

// 🔥 Definimos el evento de cierre que escucha el padre
defineEmits(['close'])

const activeTab = ref('abilities')

const { selectedClass, fetchClassDetails } = useCompendium()

const mockCharacterForClass = computed<any>(() => {
  return {
    lvl: 100,
    races: null,
    classes: selectedClass.value
  }
})

const displayedModifiers = computed(() => {
  if (!selectedClass.value) return []

  const c = selectedClass.value

  // Helper para formatear de forma segura el texto (ej: 2 -> "+2", 0 -> "0")
  const formatMod = (val: number | null) => {
    if (val === null || val === 0) return '0'
    return val > 0 ? `+${val}` : `${val}`
  }

  return [
    {
      label: 'Modificador de Cuerpo (Vida)',
      value: formatMod(c.hp_mod),
      rawVal: c.hp_mod || 0,
      icon: 'mdi-heart',
      color: 'red-lighten-1'
    },
    {
      label: 'Modificador de Ataque',
      value: formatMod(c.atk_mod),
      rawVal: c.atk_mod || 0,
      icon: 'mdi-sword',
      color: 'orange-lighten-2'
    },
    {
      label: 'Modificador de Defensa',
      value: formatMod(c.def_mod),
      rawVal: c.def_mod || 0,
      icon: 'mdi-shield',
      color: 'blue-lighten-2'
    },
    {
      label: 'Modificador de Mente (Maná)',
      value: formatMod(c.mp_mod),
      rawVal: c.mp_mod || 0,
      icon: 'mdi-creation',
      color: 'cyan-lighten-2'
    },
    {
      label: 'Modificador de Movimiento',
      value: formatMod(c.mov_mod),
      rawVal: c.mov_mod || 0,
      icon: 'mdi-shoe-print',
      color: 'green-lighten-2'
    }
  ]
})

onMounted(() => {
  fetchClassDetails(props.classId)
})

watch(
  () => props.classId,
  (newId) => {
    fetchClassDetails(newId)
  }
)
</script>

<style scoped>
.hq-tabs-container {
  /* Un gris "carbón" más profundo que el grey-darken-4 (#212121) */
  background-color: #151515cb !important;
}

.bg-hq-row {
  background: rgba(5, 7, 12, 0.8) !important;
  border: 1px solid rgba(255, 255, 255, 0.02) !important;
}

.hq-stat-row {
  transition: all 0.2s ease;
}

.hq-stat-row:hover {
  border-color: rgba(255, 193, 7, 0.2) !important;
  background: rgba(5, 7, 12, 1) !important;
}

.gap-y-1 {
  row-gap: 4px !important;
}
.gap-x-2 {
  column-gap: 8px !important;
}
.text-xxs {
  font-size: 0.65rem !important;
}
.gap-x-2 {
  column-gap: 8px !important;
}
.gap-y-1 {
  row-gap: 4px !important;
}
.gap-y-4 {
  row-gap: 16px !important;
}

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
  background: rgba(
    244,
    67,
    54,
    0.2
  ) !important; /* Destello sutil rojo al pasar el ratón */
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
  background: linear-gradient(
    to bottom,
    rgba(9, 13, 22, 0) 60%,
    rgba(9, 13, 22, 0.9) 95%,
    rgba(9, 13, 22, 1) 100%
  );
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
    background: linear-gradient(
      to bottom,
      rgba(9, 13, 22, 0) 20%,
      rgba(9, 13, 22, 0.85) 80%,
      rgba(9, 13, 22, 1) 100%
    ) !important;
  }
}

@media (max-height: 500px) and (orientation: landscape) {
  .hq-image-column {
    aspect-ratio: 21 / 9 !important;
  }
}

/* 📜 CONTENEDOR CON ALTURA MÁXIMA Y SCROLL INTERNO */
.hq-scrollable-tab-content {
  max-height: 118px; /* Ajusta este valor según lo alto que quieras el bloque */
  overflow-y: auto;
  padding-right: 4px; /* Pequeño espacio para que el scroll no aplaste el contenido */
}

/* 🎨 BARRA DE SCROLL PREMIUM ESTILO VIDEOJUEGO */
.hq-scrollable-tab-content::-webkit-scrollbar {
  width: 6px;
}

.hq-scrollable-tab-content::-webkit-scrollbar-track {
  background: rgba(5, 7, 12, 0.5);
  border-radius: 4px;
}

.hq-scrollable-tab-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.hq-scrollable-tab-content::-webkit-scrollbar-thumb:hover {
  background: rgba(33, 150, 243, 0.3); /* Destello azul sutil al pasar el ratón */
}
</style>
