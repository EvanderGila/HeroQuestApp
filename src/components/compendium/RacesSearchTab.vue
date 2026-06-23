<template>
  <div class="hq-compendium-grid py-2">
    <VCard
      v-for="race in compStore.races"
      :key="race.id"
      variant="flat"
      class="hq-race-card border-thin rounded-xl overflow-hidden position-relative"
      elevation="2"
      @click="handleInspectRace(race.id)"
    >
      <div class="hq-navbar-noise"></div>

      <div class="hq-race-image-wrapper">
        <VImg
          :src="race.img || '/placeholder-race.png'"
          aspect-ratio="4/5"
          cover
          class="hq-race-image"
        >
          <template #placeholder>
            <div class="d-flex align-center justify-center fill-height bg-grey-darken-4">
              <VProgressCircular indeterminate color="primary" size="32" />
            </div>
          </template>
        </VImg>

        <div class="hq-race-overlay"></div>
      </div>

      <div class="hq-race-content pa-3 d-flex flex-column justify-end">
        <h3
          class="hq-race-title font-weight-black text-uppercase text-center text-truncate"
        >
          {{ race.name }}
        </h3>

        <div class="hq-race-mini-stats d-flex justify-center gap-x-1 mt-1">
          <span class="text-xxs text-disabled hq-stat-item">❤️{{ race.hp_base }}</span>
          <span class="text-xxs text-disabled hq-stat-item">⚔️{{ race.atk_base }}</span>
          <span class="text-xxs text-disabled hq-stat-item">🛡️{{ race.def_base }}</span>
          <span class="text-xxs text-disabled hq-stat-item">✨{{ race.mp_base }}</span>
          <span class="text-xxs text-disabled hq-stat-item">💨{{ race.mov_base }}</span>
        </div>
      </div>
    </VCard>
  </div>

  <VDialog
    v-model="isDetailsDialogOpen"
    max-width="900px"
    width="auto"
    transition="dialog-bottom-transition"
  >
    <RaceInfoDialog
      v-if="raceSelected"
      :raceId="raceSelected"
      @close="isDetailsDialogOpen = false"
    />
  </VDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCompendiumStore } from '@/store/compendiumStore'
import RaceInfoDialog from '@/components/compendium/RaceInfoDialog.vue'

const compStore = useCompendiumStore()

const isDetailsDialogOpen = ref(false)
const raceSelected = ref<any>(null)

function handleInspectRace(race_id: any) {
  raceSelected.value = race_id
  isDetailsDialogOpen.value = true
}
</script>

<style scoped>
.text-xxs {
  font-size: 0.65rem !important;
}

/* Bajamos un pelo el gap por defecto para ganar margen de maniobra */
.gap-x-1 {
  column-gap: 6px !important;
}

/* 🧙‍♂️ Rejilla Base Desktop */
.hq-compendium-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 16px;
  width: 100%;
}

/* ── 🎴 LA TARJETA ── */
.hq-race-card {
  background: linear-gradient(
    180deg,
    rgb(15 20 32 / 90%) 0%,
    rgb(5 6 8 / 98%) 100%
  ) !important;
  border: 1px solid rgb(255 255 255 / 5%) !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  cursor: pointer;
}

.hq-race-card:hover {
  transform: translateY(-5px);
  border-color: rgb(33 150 243 / 40%) !important;
  box-shadow:
    0 8px 24px rgb(0 0 0 / 60%),
    0 0 12px rgb(33 150 243 / 10%) !important;
}

.hq-race-card:hover .hq-race-image {
  transform: scale(1.03);
}

.hq-race-image-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.hq-race-image {
  transition: transform 0.4s ease;
}

.hq-race-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgb(0 0 0 / 0%) 50%,
    rgb(5 6 8 / 85%) 82%,
    rgb(5 6 8 / 100%) 100%
  );
  z-index: 1;
}

.hq-race-content {
  position: relative;
  z-index: 2;
  margin-top: -30px;
  background: rgb(5 6 8 / 95%);
  border-top: 1px solid rgb(255 255 255 / 2%);
}

.hq-race-title {
  font-size: 0.9rem;
  color: #fff;
  letter-spacing: 0.05em;
  text-shadow: 0 2px 4px rgb(0 0 0 / 50%);
}

.hq-race-card:hover .hq-race-title {
  color: #2196f3;
}

/* 🛡️ Evita que un stat se rompa o baje de línea */
.hq-stat-item {
  white-space: nowrap !important;
  display: inline-flex;
  align-items: center;
}

.hq-navbar-noise {
  position: absolute;
  inset: 0;
  opacity: 0.02;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  z-index: 2;
}

:deep(.v-overlay__content) {
  @media (width <= 959px), (height <= 500px) {
    max-height: calc(100dvh - 24px) !important;
    width: calc(100vw - 24px) !important;
    margin: 12px !important;
    overflow: visible !important;
    display: block !important; /* Evita que flexbox aplaste la tarjeta */
  }
}

/* 📱 OPTIMIZACIÓN RESPONSIVE */

/* Caso Vertical: Dos columnas perfectas en móviles comunes */
@media (width <= 480px) and (orientation: portrait) {
  .hq-compendium-grid {
    grid-template-columns: repeat(
      2,
      1fr
    ) !important; /* Forzamos exactamente 2 columnas sin importar los px */

    gap: 10px;
  }

  .hq-race-title {
    font-size: 0.8rem;
  }

  .hq-race-mini-stats {
    column-gap: 4px !important; /* Estrechamos los iconos para que quepan en pantallas mini */
  }

  .text-xxs {
    font-size: 0.58rem !important; /* Reducimos un pelín la fuente en móvil vertical */
  }
}

/* Caso Horizontal (Landscape): Evita que los cromos se vuelvan gigantes a lo ancho */
@media (height <= 480px) and (orientation: landscape) {
  .hq-compendium-grid {
    /* Forzamos 4 columnas en horizontal para que las tarjetas mantengan su proporción estilizada y compacta */
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 12px;
  }

  .hq-race-title {
    font-size: 0.8rem;
  }
}
</style>
