<template>
  <div class="text-caption font-weight-bold text-uppercase mb-3 hq-section-title">
    Inventario de Ranuras Activas
  </div>

  <VRow dense>
    <VCol
      cols="6"
      sm="4"
      md="3"
      v-for="slot in availableSlots"
      :key="slot.key"
      class="pa-1"
    >
      <div
        class="hq-inventory-slot border-thin rounded-xl d-flex flex-column"
        :class="{
          'has-item': getEquippedItemInSlot(slot.key),
          'is-relic': getEquippedItemInSlot(slot.key)
            ?.reliq /* 🌟 Tu campo real es 'reliq' */
        }"
      >
        <div class="hq-navbar-noise"></div>

        <template v-if="getEquippedItemInSlot(slot.key)">
          <div
            class="hq-slot-card-body h-100 d-flex flex-column justify-space-between position-relative"
          >
            <div class="hq-item-image-wrapper">
              <VImg
                :src="getEquippedItemInSlot(slot.key)?.img || 'ItemImage'"
                aspect-ratio="1"
                cover
                class="hq-item-image"
              />
              <div class="hq-item-image-overlay"></div>

              <span class="hq-slot-floating-tag text-uppercase">{{ slot.label }}</span>

              <div v-if="getEquippedItemInSlot(slot.key)?.reliq" class="hq-relic-badge">
                <span class="hq-relic-ping"></span>
                <span class="hq-relic-dot"></span>
              </div>
            </div>

            <div
              class="pa-2 d-flex flex-column justify-space-between flex-grow-1 z-index-2"
            >
              <div class="hq-item-name font-weight-black text-center text-uppercase">
                {{ getEquippedItemInSlot(slot.key)?.name }}
              </div>

              <div class="hq-stats-row d-flex justify-center flex-wrap gap-x-1 mt-1">
                <span
                  v-if="getEquippedItemInSlot(slot.key)?.atk_mod"
                  class="hq-stat-mini atk"
                >
                  ⚔️{{ getEquippedItemInSlot(slot.key)!.atk_mod > 0 ? '+' : ''
                  }}{{ getEquippedItemInSlot(slot.key)!.atk_mod }}
                </span>
                <span
                  v-if="getEquippedItemInSlot(slot.key)?.def_mod"
                  class="hq-stat-mini def"
                >
                  🛡️{{ getEquippedItemInSlot(slot.key)!.def_mod > 0 ? '+' : ''
                  }}{{ getEquippedItemInSlot(slot.key)!.def_mod }}
                </span>
                <span
                  v-if="getEquippedItemInSlot(slot.key)?.hp_mod"
                  class="hq-stat-mini hp"
                >
                  ❤️{{ getEquippedItemInSlot(slot.key)!.hp_mod > 0 ? '+' : ''
                  }}{{ getEquippedItemInSlot(slot.key)!.hp_mod }}
                </span>
                <span
                  v-if="getEquippedItemInSlot(slot.key)?.mp_mod"
                  class="hq-stat-mini mag"
                >
                  ✨{{ getEquippedItemInSlot(slot.key)!.mp_mod > 0 ? '+' : ''
                  }}{{ getEquippedItemInSlot(slot.key)!.mp_mod }}
                </span>
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <div
            class="hq-slot-empty d-flex flex-column align-center justify-center pa-4 h-100 text-center"
          >
            <VIcon :icon="slot.icon" size="24" class="hq-empty-icon mb-1" />
            <div class="hq-slot-tag font-weight-bold text-uppercase">
              {{ slot.label }}
            </div>
            <span class="text-xxs text-disabled italic mt-1 opacity-40">Vacío</span>
          </div>
        </template>
      </div>
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Character } from '@/types/character'
import type { Item } from '@/types/item'

const props = defineProps<{
  character: Character
}>()

const availableSlots = [
  { key: 'head', label: 'Cabeza', icon: 'mdi-hard-hat' },
  { key: 'talisman', label: 'Amuleto', icon: 'mdi-necklace' },
  { key: 'chest_inner', label: 'Túnica', icon: 'mdi-tshirt-crew' },
  { key: 'chest_outer', label: 'Armadura', icon: 'mdi-vest' },
  { key: 'weapon_1h', label: 'Arma 1H', icon: 'mdi-sword' },
  { key: 'weapon_2h', label: 'Dos Manos', icon: 'mdi-sword-cross' },
  { key: 'shield', label: 'Escudo', icon: 'mdi-shield-star' },
  { key: 'bracers', label: 'Brazales', icon: 'mdi-hand-back-right' },
  { key: 'boots', label: 'Calzado', icon: 'mdi-shoe-print' }
]

const characterEquipment = computed(() => props.character?.character_equipment || [])

function getEquippedItemInSlot(slotKey: string): Item | null {
  if (!characterEquipment.value) return null

  // Buscamos la fila de equipamiento que corresponda a este slot
  const equipmentRow = characterEquipment.value.find((e: any) => e.slot === slotKey)

  // Si existe la fila, extraemos el ítem anidado que Supabase trajo en items(*)
  if (equipmentRow && equipmentRow.items) {
    // Nota: Si Supabase te lo devuelve como Array por la relación, usa: equipmentRow.items[0]
    // Si te lo devuelve como objeto directo (lo más común si es 1:1), usa: equipmentRow.items
    return Array.isArray(equipmentRow.items) ? equipmentRow.items[0] : equipmentRow.items
  }

  return null
}
</script>

<style scoped>
.text-xxs {
  font-size: 0.6rem !important;
}
.z-index-2 {
  position: relative;
  z-index: 2;
}
.gap-x-1 {
  column-gap: 4px !important;
  row-gap: 4px !important;
}
.hq-section-title {
  color: #2196f3;
  letter-spacing: 0.08em;
}

/* ── 🌌 CONTENEDOR CONTORNO DE RANURA ── */
.hq-inventory-slot {
  height: 100%;
  min-height: 175px;
  background: linear-gradient(
    180deg,
    rgba(20, 24, 35, 0.4) 0%,
    rgba(10, 11, 14, 0.6) 100%
  ) !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  overflow: hidden;
  position: relative;
  transition: all 0.2s ease;
}

/* Micro-ruido orgánico */
.hq-navbar-noise {
  position: absolute;
  inset: 0;
  opacity: 0.015;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

/* Estado: Tiene algo equipado */
.hq-inventory-slot.has-item {
  background: linear-gradient(
    180deg,
    rgba(14, 20, 32, 0.85) 0%,
    rgba(6, 7, 10, 0.95) 100%
  ) !important;
  border-color: rgba(33, 150, 243, 0.2) !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

/* 🔥 ESTILO RELIQUIA MÍSTICA (Borde de Fuego/Oro) */
.hq-inventory-slot.is-relic {
  border-color: rgba(255, 179, 0, 0.45) !important;
  box-shadow:
    0 0 15px rgba(255, 179, 0, 0.15),
    inset 0 0 10px rgba(255, 179, 0, 0.05) !important;
}

/* ── 🖼️ CONTENEDOR DE IMAGEN 1:1 ── */
.hq-item-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}
.hq-item-image {
  width: 100%;
  height: 100%;
  opacity: 0.85;
}
/* Sombra negra inferior en la imagen para poder leer el nombre */
.hq-item-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 40%, rgba(6, 7, 10, 0.95) 100%);
}

/* Etiquetas flotantes sobre el cromo */
.hq-slot-floating-tag {
  position: absolute;
  top: 6px;
  left: 6px;
  font-size: 0.55rem;
  font-weight: 800;
  background-color: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  color: rgba(255, 255, 255, 0.5);
  padding: 1px 5px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* ── 💎 PUNTO DE ESTADO RELIQUIA ── */
.hq-relic-badge {
  position: absolute;
  top: 6px;
  right: 6px;
  display: flex;
  width: 8px;
  height: 8px;
}
.hq-relic-dot {
  position: relative;
  width: 8px;
  height: 8px;
  background-color: #ffb300;
  border-radius: 50%;
  box-shadow: 0 0 6px #ffb300;
}
.hq-relic-ping {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #ffb300;
  border-radius: 50%;
  animation: relicPing 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
  opacity: 0.7;
}

/* ── 📝 DETALLES E INFOS DEL ÍTEM ── */
.hq-item-name {
  font-size: 0.7rem;
  color: #ffffff;
  line-height: 1.2;
  letter-spacing: 0.02em;
}
/* Si es una reliquia, el nombre se tiñe de color dorado de leyenda */
.is-relic .hq-item-name {
  color: #ffe082;
  text-shadow: 0 0 4px rgba(255, 179, 0, 0.3);
}

/* 📊 MICRO STATS (Badges compactos) */
.hq-stat-mini {
  font-size: 0.6rem;
  font-weight: 800;
  padding: 1px 4px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.hq-stat-mini.atk {
  color: #ff8a80;
  border-color: rgba(255, 138, 128, 0.15);
}
.hq-stat-mini.def {
  color: #81c784;
  border-color: rgba(129, 199, 132, 0.15);
}
.hq-stat-mini.mag {
  color: #80deea;
  border-color: rgba(128, 222, 234, 0.15);
}

/* ── 🕳️ DISEÑO ESTADO VACÍO ── */
.hq-slot-empty {
  color: rgba(255, 255, 255, 0.2);
}
.hq-empty-icon {
  opacity: 0.25;
}
.hq-slot-tag {
  font-size: 0.65rem;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.3);
}

/* 🎭 ANIMACIÓN RELIQUIA */
@keyframes relicPing {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  70%,
  100% {
    transform: scale(2.8);
    opacity: 0;
  }
}
</style>
