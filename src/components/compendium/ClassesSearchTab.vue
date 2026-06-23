<template>
  <div class="hq-compendium-grid py-2">
    <VCard
      v-for="clas in compStore.classes"
      :key="clas.id"
      variant="flat"
      class="hq-class-card border-thin rounded-xl overflow-hidden position-relative"
      @click="handleInspectClass(clas.id)"
    >
      <div class="hq-navbar-noise"></div>

      <div class="hq-class-image-wrapper">
        <VImg
          :src="clas.img || '/placeholder-class.png'"
          aspect-ratio="4/5"
          cover
          class="hq-class-image"
        >
          <template #placeholder>
            <div class="d-flex align-center justify-center fill-height bg-grey-darken-4">
              <VProgressCircular indeterminate color="primary" size="32" />
            </div>
          </template>
        </VImg>
        <div class="hq-class-overlay"></div>
      </div>

      <div class="hq-class-content pa-3">
        <h3 class="hq-class-title font-weight-black text-uppercase text-center mb-1">
          {{ clas.name }}
        </h3>

        <div class="hq-class-mini-stats d-flex justify-center gx-2 mt-1 flex-wrap">
          <span
            v-if="clas.hp_mod !== 0 && clas.hp_mod !== null"
            class="text-xxs font-weight-bold mx-1"
            :class="clas.hp_mod > 0 ? 'text-green-lighten-1' : 'text-red-lighten-1'"
          >
            ❤️{{ clas.hp_mod > 0 ? '+' : '' }}{{ clas.hp_mod }}
          </span>

          <span
            v-if="clas.atk_mod !== 0 && clas.atk_mod !== null"
            class="text-xxs font-weight-bold mx-1"
            :class="clas.atk_mod > 0 ? 'text-green-lighten-1' : 'text-red-lighten-1'"
          >
            ⚔️{{ clas.atk_mod > 0 ? '+' : '' }}{{ clas.atk_mod }}
          </span>

          <span
            v-if="clas.def_mod !== 0 && clas.def_mod !== null"
            class="text-xxs font-weight-bold mx-1"
            :class="clas.def_mod > 0 ? 'text-green-lighten-1' : 'text-red-lighten-1'"
          >
            🛡️{{ clas.def_mod > 0 ? '+' : '' }}{{ clas.def_mod }}
          </span>

          <span
            v-if="clas.mp_mod !== 0 && clas.mp_mod !== null"
            class="text-xxs font-weight-bold mx-1"
            :class="clas.mp_mod > 0 ? 'text-green-lighten-1' : 'text-red-lighten-1'"
          >
            ✨{{ clas.mp_mod > 0 ? '+' : '' }}{{ clas.mp_mod }}
          </span>

          <span
            v-if="clas.mov_mod !== 0 && clas.mov_mod !== null"
            class="text-xxs font-weight-bold mx-1"
            :class="clas.mov_mod > 0 ? 'text-green-lighten-1' : 'text-red-lighten-1'"
          >
            💨{{ clas.mov_mod > 0 ? '+' : '' }}{{ clas.mov_mod }}
          </span>
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
    <ClassInfoDialog
      v-if="classSelected"
      :classId="classSelected"
      @close="isDetailsDialogOpen = false"
    />
  </VDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCompendiumStore } from '@/store/compendiumStore'
import ClassInfoDialog from '@/components/compendium/ClassInfoDialog.vue'

const compStore = useCompendiumStore()

const isDetailsDialogOpen = ref(false)
const classSelected = ref<any>(null)

function handleInspectClass(class_id: any) {
  classSelected.value = class_id
  isDetailsDialogOpen.value = true
}
</script>

<style scoped>
.text-xxs {
  font-size: 0.65rem !important;
}

/* 🧙‍♂️ Rejilla elástica */
.hq-compendium-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

/* ── 🎴 TARJETA DE CLASE ── */
.hq-class-card {
  background: linear-gradient(
    180deg,
    rgba(15, 20, 32, 0.95) 0%,
    rgba(5, 6, 8, 1) 100%
  ) !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  transition: all 0.3s ease;
}

.hq-class-card:hover {
  transform: translateY(-4px);
  border-color: rgba(33, 150, 243, 0.3) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

/* ── 🖼️ IMAGEN ── */
.hq-class-image-wrapper {
  position: relative;
  overflow: hidden;
}

.hq-class-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 60%, rgba(5, 6, 8, 1) 100%);
}

.hq-class-title {
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

:deep(.v-overlay__content) {
  @media (max-width: 959px), (max-height: 1000px) {
    max-height: calc(100dvh - 24px) !important;
    width: calc(100vw - 24px) !important;
    margin: 12px !important;
    overflow: visible !important;
    display: block !important; /* Evita que flexbox aplaste la tarjeta */
  }
}

/* Adaptación móvil */
/* Caso Vertical: Dos columnas perfectas en móviles comunes */
@media (max-width: 480px) and (orientation: portrait) {
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
@media (max-height: 480px) and (orientation: landscape) {
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
