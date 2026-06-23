<template>
  <div
    v-if="!selectedAbility"
    class="d-flex flex-column align-center justify-center pa-12 hq-ability-loading"
  >
    <VProgressCircular indeterminate color="primary" size="48" class="mb-3" />
    <span
      class="text-caption text-disabled font-weight-bold text-uppercase tracking-widest"
    >
      Consultando Códice...
    </span>
  </div>

  <VCard
    v-else
    variant="flat"
    class="hq-ability-card overflow-hidden rounded-xl position-relative"
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
          class="border-thin flex-shrink-0 bg-grey-darken-4 hq-ability-avatar mb-4 mb-sm-0 mx-auto mx-sm-0"
        >
          <VImg
            :src="selectedAbility.img || 'https://placehold.co/150?text=Skill'"
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
              class="text-uppercase tracking-widest text-xxs font-weight-bold text-amber"
            >
              Detalle de Habilidad
            </span>
            <span class="text-disabled text-xxs">—</span>
            <VChip
              size="x-small"
              :color="
                selectedAbility.type === 'active' ? 'cyan-lighten-2' : 'green-lighten-2'
              "
              variant="flat"
              class="font-weight-black text-uppercase px-2"
            >
              {{ selectedAbility.type === 'active' ? '⚔️ Activa' : '🛡️ Pasiva' }}
            </VChip>
          </div>

          <h2
            class="text-h5 font-weight-black text-white text-uppercase tracking-wide mb-2"
          >
            {{ selectedAbility.name }}
          </h2>

          <div
            v-if="provenanceInfo"
            class="hq-provenance-tag d-inline-flex align-center px-2 py-1 rounded bg-hq-row border-thin mb-3"
          >
            <VIcon
              :icon="provenanceInfo.icon"
              size="13"
              :color="provenanceInfo.color"
              class="me-1"
            />
            <span class="text-xxs font-weight-bold text-grey-lighten-1">
              Req. Nv. {{ provenanceInfo.lvl }} por
              <span class="text-white">{{ provenanceInfo.name }}</span>
            </span>
          </div>
        </div>
      </div>

      <div class="hq-ability-desc-section mt-4 border-thin pa-4 rounded-xl">
        <div class="hq-section-header mb-2">
          <span
            class="text-uppercase tracking-widest font-weight-bold text-xxs text-disabled"
          >
            Efecto de la Habilidad
          </span>
        </div>
        <p class="hq-desc-text font-italic mb-0 text-medium-emphasis text-justify">
          "{{
            selectedAbility.description ||
            'Esta habilidad otorga efectos latentes no descritos en el manuscrito principal.'
          }}"
        </p>
      </div>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { onMounted, watch, computed } from 'vue'
import { useCompendium } from '@/composables/useCompendium'

const props = defineProps<{
  abilityId: number
}>()

defineEmits(['close'])

const { selectedAbility, fetchAbilityDetails } = useCompendium()

// Mapea si viene de una clase o de una raza para pintar la etiqueta de procedencia
const provenanceInfo = computed(() => {
  if (!selectedAbility.value) return null

  // Si tiene datos en class_abilities
  if (selectedAbility.value.class_abilities?.length > 0) {
    const classData = selectedAbility.value.class_abilities[0]
    return {
      name: classData.classes?.name,
      lvl: classData.required_lvl,
      icon: 'mdi-wizard-hat',
      color: 'purple-lighten-2'
    }
  }

  // Si tiene datos en race_abilities
  if (selectedAbility.value.race_abilities?.length > 0) {
    const raceData = selectedAbility.value.race_abilities[0]
    return {
      name: raceData.races?.name,
      lvl: raceData.required_lvl,
      icon: 'mdi-dna',
      color: 'orange-lighten-2'
    }
  }

  return null
})

onMounted(() => {
  fetchAbilityDetails(props.abilityId)
})

watch(
  () => props.abilityId,
  (newId) => {
    fetchAbilityDetails(newId)
  }
)
</script>

<style scoped>
.text-xxs {
  font-size: 0.65rem !important;
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
.hq-ability-card {
  background: #090d16 !important;
  border: 1px solid rgb(255 255 255 / 8%) !important;
  box-shadow: 0 20px 50px rgb(0 0 0 / 80%) !important;
  max-height: calc(100dvh - 24px);
  overflow-y: auto !important;
}

.hq-ability-loading {
  background: #090d16 !important;
  min-height: 200px;
}

/* 🖼️ AVATAR 1:1 */
.hq-ability-avatar {
  border: 1px solid rgb(255 255 255 / 10%) !important;
  box-shadow: 0 4px 15px rgb(0 0 0 / 40%);
}

/* 📜 SECCIÓN DESCRIPCIÓN */
.hq-ability-desc-section {
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

/* 🏷️ LÍNEA DEL TÍTULO DE SECCIÓN */
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
