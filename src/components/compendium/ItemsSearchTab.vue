<template>
  <div class="hq-compendium-grid py-2">
    <VCard
      v-for="item in compStore.items"
      :key="item.id"
      variant="flat"
      class="hq-item-card border-thin rounded-xl overflow-hidden position-relative d-flex flex-column"
    >
      <div class="hq-navbar-noise"></div>

      <div class="hq-item-image-wrapper position-relative">
        
        <div 
          v-if="item.type === 'consumable' || item.slot"
          class="hq-item-floating-badge px-3 py-1 d-flex align-center"
          :style="{ background: getBadgeStyle(item).bg, borderTop: getBadgeStyle(item).border, borderLeft: getBadgeStyle(item).border }"
        >
          <VIcon 
            :icon="getBadgeStyle(item).icon" 
            size="13" 
            class="me-1"
            :color="getBadgeStyle(item).iconColor"
          />
          <span 
            class="text-xxs font-weight-black tracking-wider"
            :style="{ color: getBadgeStyle(item).textColor }"
          >
            {{ item.type === 'consumable' ? 'Consumible' : getSlotBadge(item.slot).text }}
          </span>
        </div>

        <VImg :src="item.img || '/placeholder-item.png'" aspect-ratio="1/1" cover class="hq-item-image">
          <template #placeholder>
            <div class="d-flex align-center justify-center fill-height bg-grey-darken-4">
              <VProgressCircular indeterminate color="primary" size="32" />
            </div>
          </template>
        </VImg>
        <div class="hq-item-overlay"></div>
      </div>

      <div class="hq-item-content pa-3 d-flex flex-column flex-grow-1 justify-center">
        <h3 class="hq-item-title font-weight-black text-uppercase text-center mb-1 text-truncate">
          {{ item.name }}
        </h3>

        <div class="hq-item-mini-stats d-flex justify-center gap-x-1 flex-wrap">
          <span v-if="item.hp_mod" class="text-xxs font-weight-bold" :class="item.hp_mod > 0 ? 'text-green-lighten-1' : 'text-red-lighten-1'">❤️{{ item.hp_mod > 0 ? '+' : '' }}{{ item.hp_mod }}</span>
          <span v-if="item.atk_mod" class="text-xxs font-weight-bold" :class="item.atk_mod > 0 ? 'text-green-lighten-1' : 'text-red-lighten-1'">⚔️{{ item.atk_mod > 0 ? '+' : '' }}{{ item.atk_mod }}</span>
          <span v-if="item.def_mod" class="text-xxs font-weight-bold" :class="item.def_mod > 0 ? 'text-green-lighten-1' : 'text-red-lighten-1'">🛡️{{ item.def_mod > 0 ? '+' : '' }}{{ item.def_mod }}</span>
          <span v-if="item.mp_mod" class="text-xxs font-weight-bold" :class="item.mp_mod > 0 ? 'text-green-lighten-1' : 'text-red-lighten-1'">✨{{ item.mp_mod > 0 ? '+' : '' }}{{ item.mp_mod }}</span>
          <span v-if="item.mov_mod" class="text-xxs font-weight-bold" :class="item.mov_mod > 0 ? 'text-green-lighten-1' : 'text-red-lighten-1'">💨{{ item.mov_mod > 0 ? '+' : '' }}{{ item.mov_mod }}</span>
          
          <span v-if="!item.hp_mod && !item.atk_mod && !item.def_mod && !item.mp_mod && !item.mov_mod" class="text-xxs text-disabled font-weight-medium">Sin atributos</span>
        </div>
      </div>
    </VCard>
  </div>
</template>

<script setup lang="ts">
import { useCompendiumStore } from '@/store/compendiumStore';

const compStore = useCompendiumStore()

// Mapeo de slots para textos descriptivos cortos
const slotMapping: Record<string, { text: string }> = {
  head: { text: 'Cabeza' },
  chest_inner: { text: 'Ropa Int.' },
  chest_outer: { text: 'Armadura' },
  bracers: { text: 'Brazales' },
  boots: { text: 'Botas' },
  talisman: { text: 'Talismán' },
  weapon_1h: { text: 'Arma 1M' },
  weapon_2h: { text: 'Arma 2M' },
  shield: { text: 'Escudo' },
}

const getSlotBadge = (slot: string | null) => {
  return slot && slotMapping[slot] ? slotMapping[slot] : { text: slot || '' }
}

// Generador dinámico de estilos premium para el badge flotante del objeto
const getBadgeStyle = (item: any) => {
  if (item.type === 'consumable') {
    return {
      bg: 'linear-gradient(90deg, #e65100 0%, #ef6c00 100%)', // Naranja poción místico
      border: '1px solid rgba(255, 183, 77, 0.3)',
      icon: 'mdi-flask',
      iconColor: 'orange-lighten-3',
      textColor: '#ffffff'
    }
  }
  
  // Si es equipamiento, derivamos iconos y colores según el slot
  const slot = item.slot || '';
  if (slot.includes('weapon')) {
    return {
      bg: 'linear-gradient(90deg, #b71c1c 0%, #c62828 100%)', // Rojo arma
      border: '1px solid rgba(239, 154, 154, 0.3)',
      icon: 'mdi-sword',
      iconColor: 'red-lighten-4',
      textColor: '#ffffff'
    }
  } else if (slot.includes('shield') || slot.includes('chest_outer')) {
    return {
      bg: 'linear-gradient(90deg, #37474f 0%, #455a64 100%)', // Gris acorazado
      border: '1px solid rgba(255, 255, 255, 0.15)',
      icon: slot.includes('shield') ? 'mdi-shield' : 'mdi-tshirt-crew',
      iconColor: 'blue-grey-lighten-3',
      textColor: '#ffffff'
    }
  } else if (slot.includes('talisman')) {
    return {
      bg: 'linear-gradient(90deg, #4a148c 0%, #6a1b9a 100%)', // Morado mágico
      border: '1px solid rgba(225, 190, 231, 0.3)',
      icon: 'mdi-necklace',
      iconColor: 'purple-lighten-3',
      textColor: '#ffffff'
    }
  }
  
  // Por defecto (botas, cabeza, brazales...) un bronce/acero neutro elegante
  return {
    bg: 'linear-gradient(90deg, #263238 0%, #37474f 100%)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    icon: 'mdi-shield-half-full',
    iconColor: 'grey-lighten-2',
    textColor: '#ffffff'
  }
}
</script>

<style scoped>
.text-xxs { font-size: 0.65rem !important; }
.gap-x-1 { column-gap: 6px !important; }

/* 🧙‍♂️ Rejilla elástica unificada */
.hq-compendium-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
}

/* ── 🎴 TARJETA DE OBJETO ── */
.hq-item-card {
  background: linear-gradient(180deg, rgba(15, 20, 32, 0.95) 0%, rgba(5, 6, 8, 1) 100%) !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  transition: all 0.3s ease;
}

.hq-item-card:hover {
  transform: translateY(-4px);
  border-color: rgba(33, 150, 243, 0.3) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

/* ── ⚡ BADGE DE OBJETO FLOTANTE (MÁS GRANDE Y ADAPTADO) ── */
.hq-item-floating-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 3;
  box-shadow: -2px -2px 10px rgba(0, 0, 0, 0.6);
  border-top-left-radius: 10px;
  backdrop-filter: blur(4px);
}

.hq-item-floating-badge span {
  font-size: 0.72rem !important;
  font-weight: 900 !important;
}

/* ── 🖼️ IMAGEN CUADRADA ── */
.hq-item-image-wrapper {
  overflow: hidden;
  width: 100%;
}

.hq-item-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 70%, rgba(5, 6, 8, 1) 100%);
  z-index: 2;
}

/* ── 📝 CONTENIDO SIMPLIFICADO Y AJUSTADO ── */
.hq-item-content {
  background: rgba(5, 6, 8, 0.95);
  min-height: 70px; /* Reducido sustancialmente al no llevar la fila de chips abajo */
}

.hq-item-title {
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  color: #fff;
}

.hq-navbar-noise {
  position: absolute;
  inset: 0;
  opacity: 0.02;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

/* Adaptación responsive */
/* Caso Vertical (Móviles pequeños/comunes) */
@media (max-width: 460px) and (orientation: portrait) {
  .hq-compendium-grid {
    grid-template-columns: repeat(2, 1fr) !important; /* Forzamos 2 columnas exactas */
    gap: 12px;
  }
  .hq-item-title {
    font-size: 0.8rem;
  }
  .hq-item-mini-stats {
    column-gap: 4px !important; /* Estrechamos un poco las estadísticas */
  }
  .text-xxs {
    font-size: 0.58rem !important; /* Reducimos un pelín los números para que no desborden */
  }
}

/* Caso Horizontal (Landscape): Evita que los cromos se vean gigantes e infinitos */
@media (max-height: 480px) and (orientation: landscape) {
  .hq-compendium-grid {
    /* Forzamos 4 columnas en horizontal para que mantengan la proporción compacta */
    grid-template-columns: repeat(4, 1fr) !important; 
    gap: 12px;
  }
  .hq-item-title {
    font-size: 0.8rem;
  }
  .hq-item-content {
    min-height: 65px; /* Compactamos un pelín más el texto en horizontal */
  }
}
</style>