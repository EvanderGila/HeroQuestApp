<template>
  <VCard
    variant="flat"
    class="bg-black bg-opacity-60 border-thin rounded-xl text-white sticky-card d-flex flex-column"
  >
    <!-- 🪪 Cabecera de Preview: Retrato Maximizado y Nivel en Esquina Flotante -->
    <div
      class="d-flex align-center pa-4 border-bottom-thin gap-x-4 hq-header-container rounded-t-xl position-relative"
    >
      <!-- 🎖️ Indicador de Nivel Flotante en la Esquina Superior Derecha -->
      <div class="position-absolute hq-level-floating-container">
        <VChip
          color="grey"
          variant="flat"
          size="small"
          class="font-weight-black text-uppercase tracking-wider px-2 hq-level-chip"
        >
          Nivel 1
        </VChip>
      </div>

      <!-- Contenedor Retrato Vertical Maximizado (Proporción 3:4) -->
      <div
        class="avatar-detailed-container flex-shrink-0 border-thin elevation-3 bg-grey-darken-4"
      >
        <VImg
          :src="characterImage"
          cover
          crossorigin="anonymous"
          alt="Retrato del borrador"
          class="h-100 w-100"
        />
      </div>

      <!-- Zona de Información de Identidad (Centrada Verticalmente) -->
      <div
        class="flex-grow-1 d-flex flex-column justify-center h-100 overflow-hidden pr-12"
      >
        <div class="overflow-hidden">
          <!-- Nombre Principal con tipografía imponente -->
          <h2 class="text-h5 font-weight-black text-truncate lh-tight text-white mb-1.5">
            {{ draft.name || 'Héroe Sin Nombre' }}
          </h2>
          <!-- Subtítulo de Razas/Clases arriba para un look de ficha técnica moderna -->
          <div class="d-flex align-center text-truncate mb-1">
            <VIcon
              :icon="draft.race ? 'mdi-dna' : 'mdi-fingerprint'"
              size="14"
              class="text-warning me-1.5 opacity-80"
            />
            <span
              class="text-caption text-warning font-weight-bold text-uppercase tracking-wider ml-1"
            >
              {{ draft.race?.name || 'Raza no elegida' }}
            </span>
          </div>

          <!-- Barra o línea sutil que indica la clase seleccionada -->
          <div class="d-flex align-center text-truncate mt-1">
            <template v-if="draft.class">
              <VIcon
                icon="mdi-shield-sword"
                size="14"
                class="text-primary me-1.5 opacity-80"
              />
              <span
                class="text-caption text-grey-lighten-1 font-weight-bold text-uppercase tracking-wide ml-1"
              >
                {{ draft.class.name }}
              </span>
            </template>
            <template v-else>
              <VIcon
                icon="mdi-shield-off-outline"
                size="14"
                class="text-disabled me-1.5 opacity-60"
              />
              <span
                class="text-caption text-disabled font-weight-medium tracking-wide ml-1"
              >
                Clase no elegida
              </span>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- 📊 Atributos de Ficha -->
    <VCardText class="pa-4">
      <div class="hq-section-header mb-3">
        <span
          class="text-uppercase tracking-widest font-weight-bold text-xxs text-disabled"
        >
          Atributos de Ficha
        </span>
      </div>

      <VRow dense class="mb-3">
        <VCol v-for="stat in currentLiveStats" :key="stat.label" cols="12" class="py-0.5">
          <div
            class="d-flex align-center justify-space-between bg-grey-darken-4 px-3 py-1.5 rounded-lg border-thin transition-all hq-stat-row"
          >
            <div class="d-flex align-center gap-x-2">
              <VIcon :icon="stat.icon" :color="stat.color" size="15" />
              <span
                class="text-caption text-grey-lighten-1 font-weight-medium text-truncate"
              >
                {{ stat.label }}
              </span>
            </div>

            <div class="text-caption font-weight-black d-flex align-center">
              <span
                v-if="stat.mod !== 0"
                :class="stat.mod > 0 ? 'text-green-lighten-1' : 'text-red-lighten-1'"
                class="font-weight-black ms-1.5 text-xs mr-1"
              >
                ({{ stat.mod >= 0 ? '+' : '' }}{{ stat.mod }})
              </span>
              <span class="text-white mr-1">{{ stat.base }}</span>
              <span class="text-grey-darken-1 font-weight-medium mx-0.5">|</span>
              <span class="text-white font-weight-bold ml-1">
                {{ stat.base + stat.mod }}
              </span>
            </div>
          </div>
        </VCol>
      </VRow>

      <!-- ⚔️ Listados de Rasgos, Técnicas y Hechizos -->
      <div v-if="hasAnyTrait" class="mt-4 pt-1">
        <!-- Rasgos -->
        <div v-if="raceAbilities.length > 0" class="mb-3">
          <div class="hq-section-header mb-2">
            <span
              class="text-uppercase tracking-widest font-weight-bold text-xxs text-disabled"
            >
              Rasgos ({{ draft.race?.name }})
            </span>
          </div>
          <div class="d-flex flex-wrap gap-1">
            <VChip
              v-for="ab in raceAbilities"
              :key="ab.abilities.id"
              size="x-small"
              variant="flat"
              :color="ab.abilities.type === 'passive' ? 'success' : 'info'"
              class="hq-preview-chip skill-type-chip px-2"
            >
              {{ ab.abilities.name }}
            </VChip>
          </div>
        </div>

        <!-- Técnicas -->
        <div v-if="classAbilities.length > 0" class="mb-3">
          <div class="hq-section-header mb-2">
            <span
              class="text-uppercase tracking-widest font-weight-bold text-xxs text-disabled"
            >
              Técnicas ({{ draft.class?.name }})
            </span>
          </div>
          <div class="d-flex flex-wrap gap-1">
            <VChip
              v-for="ab in classAbilities"
              :key="ab.abilities.id"
              size="x-small"
              variant="flat"
              :color="ab.abilities.type === 'passive' ? 'success' : 'info'"
              class="hq-preview-chip skill-type-chip px-2"
            >
              {{ ab.abilities.name }}
            </VChip>
          </div>
        </div>

        <!-- Hechizos -->
        <div v-if="classSpells.length > 0">
          <div class="hq-section-header mb-2">
            <span
              class="text-uppercase tracking-widest font-weight-bold text-xxs text-disabled"
            >
              Libro de Hechizos
            </span>
          </div>
          <div class="d-flex flex-wrap gap-1">
            <VChip
              v-for="spell in classSpells"
              :key="spell.spells.id"
              size="x-small"
              variant="flat"
              color="deep-purple-darken-1"
              class="hq-preview-chip px-2 text-deep-purple-lighten-4"
            >
              <VIcon icon="mdi-creation" size="10" class="me-1" />
              {{ spell.spells.name }}
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

const { draft, raceStats, classStats } = useCharacterCreation()

const characterImage = computed(() => {
  return (
    draft.value.img ||
    draft.value.race?.img ||
    'https://placehold.co/508x676?text=HeroQuest'
  )
})

const currentLiveStats = computed(() => {
  return [
    {
      label: 'Cuerpo (Vida)',
      icon: 'mdi-heart',
      color: 'red-lighten-1',
      base: raceStats.value.hp || 0,
      mod: classStats.value.hp || 0,
      isDice: false
    },
    {
      label: 'Mente (Maná)',
      icon: 'mdi-brain',
      color: 'purple-lighten-2',
      base: raceStats.value.mp || 0,
      mod: classStats.value.mp || 0,
      isDice: false
    },
    {
      label: 'Ataque',
      icon: 'mdi-sword',
      color: 'orange-darken-1',
      base: raceStats.value.atk || 0,
      mod: classStats.value.atk || 0,
      isDice: true
    },
    {
      label: 'Defensa',
      icon: 'mdi-shield',
      color: 'blue-lighten-1',
      base: raceStats.value.def || 0,
      mod: classStats.value.def || 0,
      isDice: true
    },
    {
      label: 'Movimiento',
      icon: 'mdi-run',
      color: 'teal-lighten-2',
      base: raceStats.value.mov || 0,
      mod: classStats.value.mov || 0,
      isDice: false
    }
  ]
})

const raceAbilities = computed(() => draft.value.race?.race_abilities || [])
const classAbilities = computed(() => draft.value.class?.class_abilities || [])
const classSpells = computed(() => draft.value.class?.class_spells || [])

const hasAnyTrait = computed(() => {
  return (
    raceAbilities.value.length > 0 ||
    classAbilities.value.length > 0 ||
    classSpells.value.length > 0
  )
})
</script>

<style scoped>
.lh-tight {
  line-height: 1.2;
}
.gap-x-2 {
  column-gap: 8px !important;
}
.gap-x-4 {
  column-gap: 16px !important;
}
.gap-1 {
  gap: 4px !important;
}
.text-xxs {
  font-size: 0.62rem !important;
}
.text-xs {
  font-size: 0.7rem !important;
}

/* ── 🌌 FONDO OSCURO DEL COMPONENTE CONTENEDOR ── */
.sticky-card {
  background-color: #151515 !important;
  border-color: rgba(255, 255, 255, 0.06) !important;
}

/* 🏷️ LÍNEAS SEPARADORAS DE SUBSECCIÓN RPG */
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
.tracking-widest {
  letter-spacing: 0.1em !important;
}

/* Fila de Atributo */
.hq-stat-row {
  background-color: rgba(255, 255, 255, 0.02) !important;
  border-color: rgba(255, 255, 255, 0.05) !important;
}

/* 🏷️ MICRO CHIPS */
.hq-preview-chip {
  height: 18px !important;
  font-size: 0.65rem !important;
  letter-spacing: 0.02em;
}
.skill-type-chip {
  font-weight: 400 !important;
  opacity: 0.85;
}

@media (min-width: 960px) {
  .sticky-card {
    position: sticky;
    top: 12px;
    max-height: calc(100vh - 160px);
    overflow-y: auto;
  }
}

/* 🏹 Contenedor de la cabecera unificada */
.hq-header-container {
  min-height: 160px; /* Incrementado para el retrato grande */
  background-color: rgba(255, 255, 255, 0.01);
}

/* Retrato vertical con relación 3:4 exacta e incrementada de tamaño */
.avatar-detailed-container {
  width: 105px;
  height: 140px;
  border-radius: 10px;
  overflow: hidden;
  border-color: rgba(255, 255, 255, 0.1) !important;
}

.border-bottom-thin {
  border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
}

/* Posicionamiento flotante del nivel */
.hq-level-floating-container {
  top: 16px;
  right: 16px;
  z-index: 2;
}

.hq-level-chip {
  font-size: 0.62rem !important;
  letter-spacing: 0.06em !important;
  height: 20px !important;
  border-radius: 4px !important;
}

/* Borde primario sutil para la clase */
.border-thin-primary {
  border: 1px solid rgba(var(--v-theme-primary), 0.25) !important;
}
</style>
