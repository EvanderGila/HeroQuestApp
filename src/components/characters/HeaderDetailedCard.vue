<template>
  <!-- 🪪 Cabecera Detallada: Fondo integrado y sin parches -->
  <div class="d-flex align-center pa-4 border-bottom-thin gap-x-4 hq-header-container">
    <!-- Contenedor Retrato Vertical con Proporción 3:4 -->
    <div
      class="avatar-detailed-container flex-shrink-0 border-thin elevation-2 bg-grey-lighten-3"
    >
      <VImg
        :src="
          character.img ||
          characterRace?.img ||
          'https://placehold.co/508x676?text=HeroQuest'
        "
        cover
        crossorigin="anonymous"
        alt="Retrato detallado"
        class="h-100 w-100"
      />
    </div>

    <!-- Zona de Información y Progreso -->
    <div
      class="flex-grow-1 d-flex flex-column justify-space-between h-100 overflow-hidden"
    >
      <!-- Fila Superior: Nombre (Izquierda) | Nivel con Badge de Puntos (Derecha) -->
      <div class="d-flex align-start justify-space-between gap-x-2">
        <div class="overflow-hidden">
          <h2 class="text-h5 font-weight-black text-truncate lh-tight mb-1">
            {{ character.name }}
          </h2>
          <div
            class="text-caption text-medium-emphasis font-weight-medium text-truncate mt-0.5"
          >
            {{ characterRace?.name }} —
            <span class="text-primary font-weight-bold">{{ characterClass?.name }}</span>
          </div>
        </div>

        <!-- Badge de puntos disponibles sobre el nivel -->
        <VBadge
          :model-value="
            Boolean(character.available_points && character.available_points > 0)
          "
          :content="`+${character.available_points}`"
          color="warning"
          density="compact"
          offset-x="6"
          offset-y="4"
          class="flex-shrink-0 custom-mini-badge font-weight-black"
          :class="{
            'animate-pulse': character.available_points && character.available_points > 0
          }"
        >
          <VChip
            color="primary"
            variant="flat"
            class="font-weight-black text-uppercase tracking-wider px-2.5 mt-0.5 mt-2"
          >
            Nivel {{ character.lvl || 1 }}
          </VChip>
        </VBadge>
      </div>

      <!-- Fila Inferior: Bloque de Experiencia unificado -->
      <div class="mt-3">
        <div
          class="d-flex align-center justify-space-between text-medium-emphasis text-uppercase font-weight-bold tracking-wide mb-1"
          style="font-size: 0.68rem"
        >
          <span>Progreso de Experiencia</span>
          <span>{{ character.current_xp || 0 }} / 1000 PX</span>
        </div>
        <VProgressLinear
          :model-value="calculateExpPercentage(character.current_xp)"
          color="lime-darken-1"
          height="6"
          rounded
          striped
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Character } from '@/types/character'

const props = defineProps<{
  character: Character
}>()

const characterClass = computed(() => props.character?.classes)
const characterRace = computed(() => props.character?.races)

function calculateExpPercentage(exp: number = 0) {
  return Math.min((exp / 1000) * 100, 100)
}
</script>

<style scoped>
/* 🏹 Contenedor de la cabecera con altura controlada */
.hq-header-container {
  min-height: 110px;
}

/* Retrato vertical con relación 3:4 exacta un poco más generoso para el panel completo */
.avatar-detailed-container {
  width: 82px;
  height: 110px;
  border-radius: 8px;
  overflow: hidden;
}

.lh-tight {
  line-height: 1.2;
}
.gap-x-2 {
  column-gap: 8px !important;
}
.gap-x-4 {
  column-gap: 16px !important;
}
.border-bottom-thin {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity)) !important;
}

/* Animación del Badge */
.animate-pulse {
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}

/* Estilo profundo para encoger la notificación naranja */
:deep(.custom-mini-badge .v-badge__badge) {
  font-size: 0.5rem !important;
  height: 12px !important;
  min-width: 12px !important;
  padding: 0 4px !important;
}
</style>
