<template>
  <div class="hq-compendium-grid py-2">
    <VCard
      v-for="spell in compStore.spells"
      :key="spell.id"
      variant="flat"
      class="hq-spell-card border-thin rounded-xl overflow-hidden position-relative d-flex flex-column"
      @click="handleInspectSpell(spell.id)"
      >
      <div class="hq-navbar-noise"></div>

      <div class="hq-spell-image-wrapper position-relative">
        
        <div class="hq-mana-floating-badge px-2 py-0.5 d-flex align-center">
          <VIcon icon="mdi-creation" size="12" class="me-1 text-cyan-lighten-2" />
          <span class="text-xs font-weight-black text-white me-1">
            {{ spell.mana_cost || 0 }}
          </span>
          <span class="text-xxs text-cyan-lighten-3 font-weight-bold">PM</span>
        </div>

        <VImg
          :src="spell.img || '/placeholder-spell.png'"
          aspect-ratio="1/1"
          cover
          class="hq-spell-image"
        >
          <template #placeholder>
            <div class="d-flex align-center justify-center fill-height bg-grey-darken-4">
              <VProgressCircular indeterminate color="primary" size="32" />
            </div>
          </template>
        </VImg>
        <div class="hq-spell-overlay"></div>
      </div>

      <div class="hq-spell-content pa-3 d-flex flex-column flex-grow-1 justify-center">
        <h3 class="hq-spell-title font-weight-black text-uppercase text-center text-truncate">
          {{ spell.name }}
        </h3>
      </div>
    </VCard>
  </div>
  <VDialog v-model="isDetailsDialogOpen" max-width="900px" width="auto" transition="dialog-bottom-transition">
    <SpellInfoDialog 
      v-if="spellSelected"
      :spellId="spellSelected" 
      @close="isDetailsDialogOpen = false"
    />
  </VDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCompendiumStore } from '@/store/compendiumStore'
import SpellInfoDialog from '@/components/compendium/SpellInfoDialog.vue'

const isDetailsDialogOpen = ref(false)
const spellSelected = ref<any>(null)

function handleInspectSpell(spell_id: any) {
  spellSelected.value = spell_id
  isDetailsDialogOpen.value = true
}

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

/* ── 🎴 TARJETA DE HECHIZO ── */
.hq-spell-card {
  background: linear-gradient(180deg, rgba(15, 20, 32, 0.95) 0%, rgba(5, 6, 8, 1) 100%) !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  transition: all 0.3s ease;
}

.hq-spell-card:hover {
  border-color: rgba(186, 104, 200, 0.4) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(186, 104, 200, 0.15) !important;
}

/* ── ⚡ BADGE DE MANÁ FLOTANTE (REPOSICIONADO) ── */
.hq-mana-floating-badge {
  position: absolute;
  bottom: 0;   /* 🚀 Cambiado de top a bottom */
  right: 0;
  z-index: 3;
  background: linear-gradient(90deg, #4a148c 0%, #311b92 100%) !important;
  box-shadow: -2px -2px 8px rgba(0, 0, 0, 0.5);
  /* Redondeamos la esquina superior izquierda para suavizar la transición con la foto */
  border-top-left-radius: 8px; 
  border-left: 1px solid rgba(0, 229, 255, 0.25);
  border-top: 1px solid rgba(0, 229, 255, 0.25);
  backdrop-filter: blur(4px);
}

/* ── 🖼️ CONTENEDOR DE IMAGEN ── */
.hq-spell-image-wrapper {
  overflow: hidden;
  width: 100%;
}

.hq-spell-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 70%, rgba(5, 6, 8, 1) 100%);
  z-index: 2; /* Bajamos el z-index de la sombra un pelín por debajo del badge */
}

/* ── 📝 TEXTOS Y CONTENIDO ── */
.hq-spell-content {
  background: rgba(5, 6, 8, 0.95);
  min-height: 55px;
}

.hq-spell-title {
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  color: #fff;
}

.hq-spell-card:hover .hq-spell-title {
  color: #e040fb;
}

.hq-navbar-noise {
  position: absolute;
  inset: 0;
  opacity: 0.02;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

:deep(.v-overlay__content) {
  @media (max-width: 959px), (max-height: 1000px) {
    max-height: calc(100dvh - 24px) !important;
    width: calc(100vw - 24px) !important;
    margin: 12px !important;
    overflow: visible !important;
    display: block !important; /* Evita que flexbox aplaste la tarjeta */
  }
}

/* Responsive móvil */
@media (max-width: 460px) {
  .hq-compendium-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 12px;
  }
}
</style>