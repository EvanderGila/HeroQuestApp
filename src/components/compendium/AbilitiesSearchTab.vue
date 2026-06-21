<template>
  <div class="hq-compendium-grid py-2">
    <VCard
      v-for="ability in compStore.abilities"
      :key="ability.id"
      variant="flat"
      class="hq-ability-card border-thin rounded-xl overflow-hidden position-relative d-flex flex-column"
    >
      <div class="hq-navbar-noise"></div>

      <div class="hq-ability-image-wrapper position-relative">
        
        <div 
          class="hq-ability-floating-badge d-flex align-center"
          :class="ability.type === 'active' ? 'hq-badge-active' : 'hq-badge-passive'"
        >
          <VIcon 
            :icon="ability.type === 'active' ? 'mdi-lightning-bolt' : 'mdi-book-open-variant'" 
            size="12" 
            class="me-1"
            :color="ability.type === 'active' ? 'blue-lighten-3' : 'grey-lighten-2'"
          />
          <span class="text-xxs font-weight-black text-white tracking-wider">
            {{ ability.type === 'active' ? 'ACT' : 'PAS' }}
          </span>
        </div>

        <VImg
          :src="ability.img || '/placeholder-ability.png'"
          aspect-ratio="1/1"
          cover
          class="hq-ability-image"
        >
          <template #placeholder>
            <div class="d-flex align-center justify-center fill-height bg-grey-darken-4">
              <VProgressCircular indeterminate color="primary" size="32" />
            </div>
          </template>
        </VImg>
        <div class="hq-ability-overlay"></div>
      </div>

      <div class="hq-ability-content pa-3 d-flex flex-column flex-grow-1 justify-center">
        <h3 class="hq-ability-title font-weight-black text-uppercase text-center text-truncate">
          {{ ability.name }}
        </h3>
      </div>
    </VCard>
  </div>
</template>

<script setup lang="ts">
import { useCompendiumStore } from '@/store/compendiumStore';

const compStore = useCompendiumStore()
</script>

<style scoped>
.text-xxs { font-size: 0.62rem !important; }

/* Rejilla elástica */
.hq-compendium-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
}

/* ── 🎴 TARJETA DE HABILIDAD ── */
.hq-ability-card {
  background: linear-gradient(180deg, rgba(15, 20, 32, 0.95) 0%, rgba(5, 6, 8, 1) 100%) !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  transition: all 0.3s ease;
}

.hq-ability-card:hover {
  border-color: rgba(33, 150, 243, 0.4) !important; /* Brillo azulado al pasar el ratón */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(33, 150, 243, 0.15) !important;
}

/* ── ⚡ BADGES FLOTANTES DE HABILIDAD ── */
.hq-ability-floating-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 3;
  box-shadow: -2px -2px 10px rgba(0, 0, 0, 0.6);
  
  /* Aumentamos el padding: 4px arriba/abajo y 12px a los lados */
  padding: 4px 12px !important; 
  
  /* Suavizamos más la curva al ser más grande */
  border-top-left-radius: 10px; 
  backdrop-filter: blur(4px);
}
.hq-ability-floating-badge span {
  font-size: 0.75rem !important; /* Subimos de 0.62rem a 0.75rem */
  letter-spacing: 0.08em !important;
  font-weight: 900 !important; /* Extra negrita para estilo RPG */
}
.hq-ability-floating-badge .v-icon {
  font-size: 14px !important; /* Subimos de 12px a 14px */
  margin-right: 4px !important;
}

/* Estilo específico para habilidades Activas (Fuego/Rayo) */
.hq-badge-active {
  background: linear-gradient(90deg, #0d47a1 0%, #1565c0 100%) !important; /* Azul eléctrico */
  border-left: 1px solid rgba(33, 150, 243, 0.3);
  border-top: 1px solid rgba(33, 150, 243, 0.3);
}

/* Estilo específico para habilidades Pasivas (Metal/Pergamino) */
.hq-badge-passive {
  /* degradado dorado más sutil y apagado, tirando a ocre/arena */
  background: linear-gradient(135deg, #d7ccc8 0%, #a1887f 100%) !important; 
  
  /* Borde dorado envejecido con un tono más pálido */
  border-left: 2px solid #8d6e63; 
  border-top: 2px solid #8d6e63;
  
  /* Sombra interna sutil */
  box-shadow: inset 0 0 10px rgba(141, 110, 99, 0.2), -2px -2px 10px rgba(0, 0, 0, 0.5); 
}

/* Texto y icono para el badge pasivo dorado apagado */
.hq-badge-passive span {
  color: #3e2723 !important; /* Texto marrón oscuro oscuro para tinta */
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.3); /* Sutil relieve pálido */
}

.hq-badge-passive .v-icon {
  color: #5d4037 !important; /* Icono a juego */
}

/* ── 🖼️ CONTENEDOR DE IMAGEN ── */
.hq-ability-image-wrapper {
  overflow: hidden;
  width: 100%;
}

.hq-ability-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 70%, rgba(5, 6, 8, 1) 100%);
  z-index: 2;
}

/* ── 📝 TEXTOS Y CONTENIDO ── */
.hq-ability-content {
  background: rgba(5, 6, 8, 0.95);
  min-height: 55px;
}

.hq-ability-title {
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  color: #fff;
}

.hq-ability-card:hover .hq-ability-title {
  color: #64b5f6; /* Se ilumina en azul suave al hacer hover */
}

.hq-navbar-noise {
  position: absolute;
  inset: 0;
  opacity: 0.02;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

/* Responsive móvil */
@media (max-width: 460px) {
  .hq-compendium-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 12px;
  }
  .hq-ability-title {
    font-size: 0.8rem;
  }
}
</style>