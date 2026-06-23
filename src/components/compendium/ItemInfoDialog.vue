<template>
  <div
    v-if="!selectedItem"
    class="d-flex flex-column align-center justify-center pa-12 hq-item-loading"
  >
    <VProgressCircular indeterminate color="primary" size="48" class="mb-3" />
    <span
      class="text-caption text-disabled font-weight-bold text-uppercase tracking-widest"
    >
      Identificando Objeto...
    </span>
  </div>

  <VCard
    v-else
    variant="flat"
    class="hq-item-card overflow-hidden rounded-xl position-relative"
    :class="{ 'hq-item-relic': selectedItem.reliq }"
  >
    <VBtn
      icon="mdi-close"
      variant="text"
      color="grey-lighten-1"
      size="small"
      class="hq-close-btn"
      @click="$emit('close')"
    />

    <div class="hq-navbar-noise"></div>

    <VCardText class="pa-4 pa-md-6">
      <div class="d-flex flex-column flex-sm-row gap-x-4 align-start">
        <VAvatar
          size="80"
          rounded="xl"
          class="border-thin flex-shrink-0 bg-grey-darken-4 hq-item-avatar mb-4 mb-sm-0 mx-auto mx-sm-0"
          :class="selectedItem.reliq ? 'border-amber-lighten-1' : ''"
        >
          <VImg
            :src="selectedItem.img || 'https://placehold.co/150?text=Item'"
            cover
            crossorigin="anonymous"
          >
            <template #placeholder>
              <div
                class="d-flex align-center justify-center fill-height bg-grey-darken-4"
              >
                <VProgressCircular indeterminate color="primary" size="24" />
              </div>
            </template>
          </VImg>
        </VAvatar>

        <div class="flex-grow-1 w-100 text-center text-sm-left">
          <div
            class="d-flex align-center justify-center justify-sm-start gap-x-2 mb-1 flex-wrap"
          >
            <span
              class="text-uppercase tracking-widest text-xxs font-weight-bold"
              :class="selectedItem.reliq ? 'text-amber-lighten-1' : 'text-grey-lighten-1'"
            >
              {{ selectedItem.reliq ? '👑 Reliquia Ancestral' : 'Inventario de Campaña' }}
            </span>
            <span class="text-disabled text-xxs">—</span>

            <VChip
              size="x-small"
              :color="typeAndSlotInfo.color"
              variant="flat"
              class="font-weight-black text-uppercase px-2"
            >
              {{ typeAndSlotInfo.icon }} {{ typeAndSlotInfo.label }}
            </VChip>
          </div>

          <h2
            class="text-h5 font-weight-black text-uppercase tracking-wide mb-2"
            :class="selectedItem.reliq ? 'text-amber' : 'text-white'"
          >
            {{ selectedItem.name }}
          </h2>
        </div>
      </div>

      <div v-if="hasStats" class="hq-item-stats-section mt-4 border-thin pa-4 rounded-xl">
        <div class="hq-section-header mb-3">
          <span
            class="text-uppercase tracking-widest font-weight-bold text-xxs text-disabled"
          >
            Modificadores de Atributo
          </span>
        </div>

        <div class="d-flex flex-wrap gap-2">
          <div
            v-for="stat in statList"
            :key="stat.label"
            class="hq-stat-badge d-flex align-center px-2 py-1 rounded bg-hq-row border-thin"
          >
            <VIcon :icon="stat.icon" size="14" :color="stat.color" class="me-1" />
            <span class="text-xxs font-weight-medium text-grey-lighten-1 me-1">
              {{ stat.label }}:
            </span>
            <span
              class="text-xxs font-weight-bold"
              :class="stat.value > 0 ? 'text-green' : 'text-red'"
            >
              {{ stat.value > 0 ? '+' : '' }}{{ stat.value }}
            </span>
          </div>
        </div>
      </div>

      <div class="hq-item-desc-section mt-4 border-thin pa-4 rounded-xl">
        <div class="hq-section-header mb-2">
          <span
            class="text-uppercase tracking-widest font-weight-bold text-xxs text-disabled"
          >
            Propiedades del Objeto
          </span>
        </div>
        <p class="hq-desc-text font-italic mb-0 text-medium-emphasis text-justify">
          "{{
            selectedItem.effect?.description ||
            'Un objeto misterioso cuyos efectos completos solo se revelarán al ser utilizado en batalla.'
          }}"
        </p>
      </div>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useCompendium } from '@/composables/useCompendium'

const props = defineProps<{
  itemId: number
}>()

defineEmits(['close'])

const { selectedItem, fetchItemDetails } = useCompendium()

// Traduce los Enums del Tipo y Slot a etiquetas visuales amigables
const typeAndSlotInfo = computed(() => {
  if (!selectedItem.value) return { label: 'Objeto', icon: '📦', color: 'grey' }

  if (selectedItem.value.type === 'consumable') {
    return { label: 'Consumible', icon: '🧪', color: 'teal-darken-1' }
  }

  // Mapeo para equipamientos según su Slot
  const slotLabels: Record<string, string> = {
    head: 'Cabeza',
    chest_inner: 'Peto Interno',
    chest_outer: 'Armadura Externa',
    bracers: 'Brazales',
    boots: 'Botas',
    talisman: 'Talismán',
    weapon_1h: 'Arma 1 Mano',
    shield: 'Escudo',
    weapon_2h: 'Arma 2 Manos'
  }

  return {
    label: slotLabels[selectedItem.value.slot || ''] || 'Equipamiento',
    icon: '🛡️',
    color: 'indigo-darken-2'
  }
})

// Comprueba si el objeto modifica alguna estadística básica
const hasStats = computed(() => {
  if (!selectedItem.value) return false
  return (
    selectedItem.value.hp_mod !== 0 ||
    selectedItem.value.atk_mod !== 0 ||
    selectedItem.value.def_mod !== 0 ||
    selectedItem.value.mp_mod !== 0 ||
    selectedItem.value.mov_mod !== 0
  )
})

// Lista procesada de estadísticas para renderizar de forma iterativa
const statList = computed(() => {
  if (!selectedItem.value) return []

  const stats = [
    {
      label: 'VIT',
      value: selectedItem.value.hp_mod,
      icon: 'mdi-heart',
      color: 'red-lighten-1'
    },
    {
      label: 'ATK',
      value: selectedItem.value.atk_mod,
      icon: 'mdi-sword',
      color: 'orange-lighten-1'
    },
    {
      label: 'DEF',
      value: selectedItem.value.def_mod,
      icon: 'mdi-shield-half-full',
      color: 'blue-lighten-1'
    },
    {
      label: 'PM',
      value: selectedItem.value.mp_mod,
      icon: 'mdi-water',
      color: 'cyan-lighten-1'
    },
    {
      label: 'MOV',
      value: selectedItem.value.mov_mod,
      icon: 'mdi-shoe-print',
      color: 'green-lighten-1'
    }
  ]

  // Solo devolvemos los modificadores que no sean 0
  return stats.filter((stat) => stat.value !== 0)
})

onMounted(() => {
  fetchItemDetails(props.itemId)
})

watch(
  () => props.itemId,
  (newId) => {
    fetchItemDetails(newId)
  }
)
</script>

<style scoped>
.text-xxs {
  font-size: 0.65rem !important;
}

.gap-2 {
  gap: 8px !important;
}

.gap-x-2 {
  column-gap: 8px !important;
}

.gap-x-4 {
  column-gap: 16px !important;
}

.tracking-widest {
  letter-spacing: 0.12em !important;
}

/* ── ❌ BOTÓN CERRAR FLOTANTE ── */
.hq-close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  background: rgb(5 7 12 / 40%) !important;
  border: 1px solid rgb(255 255 255 / 8%) !important;
  backdrop-filter: blur(4px);
  transition: all 0.2s ease;
}

.hq-close-btn:hover {
  background: rgb(244 67 54 / 20%) !important;
  border-color: rgb(244 67 54 / 40%) !important;
  color: #fff !important;
}

/* ── 🎴 DIÁLOGO BASE ── */
.hq-item-card {
  background: #090d16 !important;
  border: 1px solid rgb(255 255 255 / 8%) !important;
  box-shadow: 0 20px 50px rgb(0 0 0 / 80%) !important;
  max-height: calc(100dvh - 24px);
  overflow-y: auto !important;
}

/* ✨ Brillo dorado sutil si es Reliquia */
.hq-item-relic {
  border: 1px solid rgb(255 193 7 / 30%) !important;
  box-shadow:
    0 0 30px rgb(255 193 7 / 15%),
    0 20px 50px rgb(0 0 0 / 80%) !important;
}

.hq-item-loading {
  background: #090d16 !important;
  min-height: 200px;
}

/* 🖼️ AVATAR */
.hq-item-avatar {
  border: 1px solid rgb(255 255 255 / 10%) !important;
  box-shadow: 0 4px 15px rgb(0 0 0 / 40%);
}

.border-amber-lighten-1 {
  border-color: rgb(255 193 7 / 60%) !important;
}

/* 📊 SECCIÓN STATS Y DESCRIPCIÓN */
.hq-item-stats-section {
  background: rgb(15 22 36 / 20%);
  border: 1px solid rgb(255 255 255 / 3%) !important;
}

.hq-item-desc-section {
  background: rgb(15 22 36 / 40%);
  border: 1px solid rgb(255 255 255 / 3%) !important;
}

.bg-hq-row {
  background: rgb(5 7 12 / 80%) !important;
  border: 1px solid rgb(255 255 255 / 2%) !important;
}

.hq-desc-text {
  font-size: 0.8rem;
  line-height: 1.5;
}

/* 🏷️ LÍNEA DEL TÍTULO */
.hq-section-header {
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
}

.hq-section-header::after {
  content: '';
  flex-grow: 1;
  margin-left: 12px;
  height: 1px;
  background: linear-gradient(to right, rgb(255 255 255 / 5%), transparent);
}

.hq-navbar-noise {
  position: absolute;
  inset: 0;
  opacity: 0.015;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
</style>
