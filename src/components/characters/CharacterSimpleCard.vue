<template>
  <VCard class="fill-height d-flex flex-column border-thin elevation-2 character-card">
    <!-- 🪪 Cabecera Compacta: Fondo integrado y transparente -->
    <div class="d-flex align-center pa-4 border-bottom-thin gap-x-4">
      <!-- Contenedor con Proporción 3:4 Exacta -->
      <div
        class="avatar-rpg-container flex-shrink-0 border-thin elevation-1 bg-grey-lighten-3"
      >
        <VImg
          :src="
            character.img ||
            character.races?.img ||
            'https://placehold.co/508x676?text=Hero'
          "
          cover
          crossorigin="anonymous"
          alt="Retrato del personaje"
          class="h-100 w-100"
        />
      </div>

      <!-- Zona de Información Distribuida -->
      <div
        class="flex-grow-1 d-flex flex-column justify-space-between h-100 overflow-hidden py-1"
      >
        <!-- Fila Superior: Nombre (Izquierda) | Nivel con Badge (Derecha) -->
        <div class="d-flex align-start justify-space-between gap-x-2">
          <div class="text-h6 font-weight-black text-truncate lh-tight">
            {{ character.name }}
          </div>
          <VBadge
            :model-value="
              Boolean(character.available_points && character.available_points > 0)
            "
            color="warning"
            offset-x="0"
            offset-y="-2"
            class="flex-shrink-0 animate-pulse font-weight-black custom-mini-badge"
          >
            <VChip
              color="primary"
              size="x-small"
              variant="flat"
              class="font-weight-black text-uppercase tracking-wider flex-shrink-0 mt-0.5 mr-1"
            >
              Nivel {{ character.lvl || 1 }}
            </VChip>
          </VBadge>
        </div>

        <!-- Fila Inferior: Raza y Clase -->
        <div>
          <div class="text-caption text-medium-emphasis font-weight-medium text-truncate">
            {{ character.races?.name }} —
            <span class="font-weight-bold">{{ character.classes?.name }}</span>
          </div>
        </div>

        <!-- Barra de Experiencia Estilizada -->
        <div class="mt-1">
          <div
            class="d-flex align-center justify-space-between text-medium-emphasis text-uppercase font-weight-bold tracking-wide mb-1"
            style="font-size: 0.65rem"
          >
            <span>Progreso XP</span>
            <span>{{ character.current_xp || 0 }} / 500</span>
          </div>
          <VProgressLinear
            :model-value="character.current_xp || 0"
            :max="500"
            color="lime-darken-1"
            height="6"
            rounded
            striped
            class="mb-1.5"
          />
        </div>
      </div>
    </div>

    <!-- 📊 Cuerpo: 5 Stats en Rejilla + Botón de Icono Integrado -->
    <VCardText class="flex-grow-1 pt-4 pb-4">
      <VRow dense>
        <!-- 1. Vida -->
        <VCol cols="6" class="mb-2">
          <div class="d-flex align-center">
            <VIcon icon="mdi-heart" color="red" class="me-2" size="20" />
            <div>
              <div class="text-caption text-medium-emphasis lh-1">Vida</div>
              <div class="d-flex">
                <div class="font-weight-black text-body-1">{{ character.hp || 0 }}</div>
                <div
                  v-if="equipmentStats?.hp > 0"
                  class="font-weight-light text-body-1 ml-1 text-green-lighten-1"
                >
                  {{ `(+` + equipmentStats?.hp + `)` }}
                </div>
                <div
                  v-if="equipmentStats?.hp < 0"
                  class="font-weight-light text-body-1 ml-1 text-red-lighten-1"
                >
                  {{ `(` + equipmentStats?.hp + `)` }}
                </div>
              </div>
            </div>
          </div>
        </VCol>

        <!-- 2. Mente -->
        <VCol cols="6" class="mb-2">
          <div class="d-flex align-center">
            <VIcon icon="mdi-brain" color="deep-purple" class="me-2" size="20" />
            <div>
              <div class="text-caption text-medium-emphasis lh-1">Mente</div>
              <div class="d-flex">
                <div class="font-weight-black text-body-1">{{ character.mp || 0 }}</div>
                <div
                  v-if="equipmentStats?.mp > 0"
                  class="font-weight-light text-body-1 ml-1 text-green-lighten-1"
                >
                  {{ `(+` + equipmentStats?.mp + `)` }}
                </div>
                <div
                  v-if="equipmentStats?.mp < 0"
                  class="font-weight-light text-body-1 ml-1 text-red-lighten-1"
                >
                  {{ `(` + equipmentStats?.mp + `)` }}
                </div>
              </div>
            </div>
          </div>
        </VCol>

        <!-- 3. Ataque -->
        <VCol cols="6" class="mb-2">
          <div class="d-flex align-center">
            <VIcon icon="mdi-sword" color="orange-darken-2" class="me-2" size="20" />
            <div>
              <div class="text-caption text-medium-emphasis lh-1">Ataque</div>
              <div class="d-flex">
                <div class="font-weight-black text-body-1">{{ character.atk || 0 }}</div>
                <div
                  v-if="equipmentStats?.atk > 0"
                  class="font-weight-light text-body-1 ml-1 text-green-lighten-1"
                >
                  {{ `(+` + equipmentStats?.atk + `)` }}
                </div>
                <div
                  v-if="equipmentStats?.atk < 0"
                  class="font-weight-light text-body-1 ml-1 text-red-lighten-1"
                >
                  {{ `(` + equipmentStats?.atk + `)` }}
                </div>
              </div>
            </div>
          </div>
        </VCol>

        <!-- 4. Defensa -->
        <VCol cols="6" class="mb-2">
          <div class="d-flex align-center">
            <VIcon icon="mdi-shield" color="blue-darken-2" class="me-2" size="20" />
            <div>
              <div class="text-caption text-medium-emphasis lh-1">Defensa</div>
              <div class="d-flex">
                <div class="font-weight-black text-body-1">{{ character.def || 0 }}</div>
                <div
                  v-if="equipmentStats?.def > 0"
                  class="font-weight-light text-body-1 ml-1 text-green-lighten-1"
                >
                  {{ `(+` + equipmentStats?.def + `)` }}
                </div>
                <div
                  v-if="equipmentStats?.def < 0"
                  class="font-weight-light text-body-1 ml-1 text-red-lighten-1"
                >
                  {{ `(` + equipmentStats?.def + `)` }}
                </div>
              </div>
            </div>
          </div>
        </VCol>

        <!-- 5. Movimiento -->
        <VCol cols="6" class="d-flex align-center">
          <div class="d-flex align-center">
            <VIcon icon="mdi-run" color="teal-darken-1" class="me-2" size="20" />
            <div>
              <div class="text-caption text-medium-emphasis lh-1">Movimiento</div>
              <div class="d-flex">
                <div class="font-weight-black text-body-1">{{ character.mov || 0 }}</div>
                <div
                  v-if="equipmentStats?.mov > 0"
                  class="font-weight-light text-body-1 ml-1 text-green-lighten-1"
                >
                  {{ `(+` + equipmentStats?.mov + `)` }}
                </div>
                <div
                  v-if="equipmentStats?.mov < 0"
                  class="font-weight-light text-body-1 ml-1 text-red-lighten-1"
                >
                  {{ `(` + equipmentStats?.mov + `)` }}
                </div>
              </div>
            </div>
          </div>
        </VCol>

        <!-- 🎯 El Hueco: Botón de Icono Ajustado Abajo -->
        <VCol cols="6" class="d-flex align-end justify-end">
          <VBtn
            color="primary"
            variant="tonal"
            icon="mdi-eye"
            size="small"
            density="comfortable"
            elevation="0"
            @click="$emit('inspect', character)"
          />
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { useCharacterStats } from '@/composables/useCharacterStats'
import type { Character } from '@/types/character'

const props = defineProps<{
  character: Character
}>()

const characterRef = toRef(props, 'character')

const { equipmentStats, totalStats } = useCharacterStats(characterRef)

defineEmits<{
  (e: 'inspect', character: Character): void
}>()
</script>

<style scoped>
.character-card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.character-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgb(0 0 0 / 10%) !important;
}

.avatar-rpg-container {
  width: 73px;
  height: 94px;
  border-radius: 8px;
  overflow: hidden;
}

.lh-tight {
  line-height: 1.2;
}

.lh-1 {
  line-height: 1;
}

.gap-x-2 {
  column-gap: 4px !important;
}

.gap-x-4 {
  column-gap: 16px !important;
}

.border-bottom-thin {
  border-bottom: 1px solid rgb(var(--v-border-color), var(--v-border-opacity)) !important;
}

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

:deep(.custom-mini-badge .v-badge__badge) {
  font-size: 0.5rem !important;
  height: 12px !important;
  min-width: 12px !important;
  padding: 0 4px !important;
}
</style>
