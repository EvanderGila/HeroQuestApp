<template>
  <div v-if="hasAbilities" class="d-flex flex-column gap-y-4">
    
    <!-- 🧬 SECCIÓN: RASGOS DE RAZA -->
    <div v-if="raceAbilities.length > 0" class="mb-4">
      <div class="hq-section-header mb-3">
        <span class="text-uppercase tracking-widest font-weight-bold text-caption text-primary">
          Rasgos de Raza
        </span>
        <span class="text-caption text-disabled ms-1 font-weight-medium">
          — {{ characterRace?.name || 'Sin Raza' }}
        </span>
      </div>

      <VRow dense>
        <VCol cols="12" v-for="ra in raceAbilities" :key="ra.abilities.id" class="pa-1">
          <VCard 
            variant="outlined" 
            class="pa-3 rounded-lg hq-ability-card transition-all"
            :class="[
              isLevelUnlocked(ra.required_lvl) 
                ? `unlocked-card is-${ra.abilities.type}` 
                : 'locked-card'
            ]"
          >
            <div class="d-flex align-start gap-x-3">
              <!-- Avatar de la habilidad 1:1 -->
              <VAvatar 
                size="44" 
                rounded="lg" 
                class="border-thin flex-shrink-0 bg-grey-lighten-3 hq-ability-avatar"
              >
                <VImg 
                  :src="ra.abilities.img || 'https://placehold.co/150?text=Skill'" 
                  cover 
                  crossorigin="anonymous"
                />
              </VAvatar>

              <!-- Cuerpo de la habilidad -->
              <div class="flex-grow-1 overflow-hidden">
                <div class="d-flex align-center justify-space-between flex-wrap gap-1 mb-1">
                  <span class="font-weight-black text-body-2 text-truncate lh-tight max-w-70">
                    {{ ra.abilities.name }}
                  </span>
                  
                  <div class="d-flex align-center gap-x-1.5">
                    <!-- Chip Activa / Pasiva Estilizado -->
                    <VChip 
                      size="x-small" 
                      variant="flat"
                      :color="ra.abilities.type === 'passive' ? 'success' : 'info'"
                      class="skill-type-chip px-2"
                    >
                      {{ ra.abilities.type === 'passive' ? 'Pasiva' : 'Activa' }}
                    </VChip>

                    <!-- Candado de Bloqueo -->
                    <VChip 
                      v-if="!isLevelUnlocked(ra.required_lvl)" 
                      size="x-small" 
                      color="error" 
                      variant="flat"
                      prepend-icon="mdi-lock"
                      class="font-weight-black px-2"
                    >
                      Nv. {{ ra.required_lvl }}
                    </VChip>
                  </div>
                </div>

                <p class="hq-mini-desc mb-0 text-medium-emphasis">
                  {{ ra.abilities.description || 'Sin descripción disponible.' }}
                </p>
              </div>
            </div>
          </VCard>
        </VCol>
      </VRow>
    </div>

    <!-- ⚔️ SECCIÓN: TÉCNICAS DE CLASE -->
    <div v-if="classAbilities.length > 0">
      <div class="hq-section-header mb-3">
        <span class="text-uppercase tracking-widest font-weight-bold text-caption text-primary">
          Técnicas de Clase
        </span>
        <span class="text-caption text-disabled ms-1 font-weight-medium">
          — {{ characterClass?.name || 'Sin clase' }}
        </span>
      </div>

      <VRow dense>
        <VCol cols="12" v-for="ca in classAbilities" :key="ca.abilities.id" class="pa-1">
          <VCard 
            variant="outlined" 
            class="pa-3 rounded-lg hq-ability-card transition-all"
            :class="[
              isLevelUnlocked(ca.required_lvl) 
                ? `unlocked-card is-${ca.abilities.type}` 
                : 'locked-card'
            ]"
          >
            <div class="d-flex align-start gap-x-3">
              <!-- Avatar de la habilidad 1:1 -->
              <VAvatar 
                size="44" 
                rounded="lg" 
                class="border-thin flex-shrink-0 bg-grey-lighten-3 hq-ability-avatar"
              >
                <VImg 
                  :src="ca.abilities.img || 'https://placehold.co/150?text=Skill'" 
                  cover 
                  crossorigin="anonymous"
                />
              </VAvatar>

              <!-- Cuerpo de la habilidad -->
              <div class="flex-grow-1 overflow-hidden">
                <div class="d-flex align-center justify-space-between flex-wrap gap-1 mb-1">
                  <span class="font-weight-black text-body-2 text-truncate lh-tight max-w-70">
                    {{ ca.abilities.name }}
                  </span>
                  
                  <div class="d-flex align-center gap-x-1.5">
                    <!-- Chip Activa / Pasiva Estilizado -->
                    <VChip 
                      size="x-small" 
                      variant="flat"
                      :color="ca.abilities.type === 'passive' ? 'success' : 'info'"
                      class="skill-type-chip px-2"
                    >
                      {{ ca.abilities.type === 'passive' ? 'Pasiva' : 'Activa' }}
                    </VChip>

                    <!-- Candado de Bloqueo -->
                    <VChip 
                      v-if="!isLevelUnlocked(ca.required_lvl)" 
                      size="x-small" 
                      color="error" 
                      variant="flat"
                      prepend-icon="mdi-lock"
                      class="font-weight-black px-2 ml-2"
                    >
                      Nv. {{ ca.required_lvl }}
                    </VChip>
                    <VChip 
                      v-else 
                      size="x-small" 
                      color="warning" 
                      variant="flat"
                      prepend-icon="mdi-lock-open"
                      class="font-weight-black px-2 ml-2"
                    >
                      Nv. {{ ca.required_lvl }}
                    </VChip>
                  </div>
                </div>

                <p class="hq-mini-desc mb-0 text-medium-emphasis">
                  {{ ca.abilities.description || 'Sin descripción disponible.' }}
                </p>
              </div>
            </div>
          </VCard>
        </VCol>
      </VRow>
    </div>

  </div>

  <!-- Estado vacío -->
  <div v-else class="text-center py-8 text-medium-emphasis">
    <VIcon icon="mdi-book-open-blank-variant" size="36" class="mb-2 text-disabled" />
    <p class="text-caption">Este aventurero no posee rasgos ni técnicas aprendidas.</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Character } from '@/types/character'

const props = defineProps<{
  character: Character
}>()

const characterRace = computed(() => props.character?.races)
const raceAbilities = computed(() => props.character?.races?.race_abilities || [])

const characterClass = computed(() => props.character?.classes)
const classAbilities = computed(() => props.character?.classes?.class_abilities || [])

const hasAbilities = computed(() => {
  return raceAbilities.value.length > 0 || classAbilities.value.length > 0
})

function isLevelUnlocked(requiredLvl: number): boolean {
  return (props.character.lvl || 1) >= requiredLvl
}
</script>

<style scoped>
.gap-y-4 { row-gap: 16px !important; }
.gap-x-3 { column-gap: 12px !important; }
.lh-tight { line-height: 1.25; }
.max-w-70 { max-width: 70%; }
.transition-all { transition: all 0.25s ease-in-out; }

.hq-mini-desc {
  font-size: 0.75rem;
  line-height: 1.35;
}

/* 🏷️ Títulos de secciones con línea lateral */
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
  background: linear-gradient(to right, rgba(var(--v-border-color), 0.15), transparent);
  align-self: center;
}
.tracking-widest {
  letter-spacing: 0.12em !important;
}

/* 🛡️ Estilo base de las cartas */
.hq-ability-card {
  transition: all 0.25s ease-in-out;
}

/* 🟢 PASIVAS (Verde / Success) — Desbloqueadas */
.unlocked-card.is-passive {
  background-color: rgba(var(--v-theme-success), 0.03) !important;
  border-color: rgba(var(--v-theme-success), 0.18) !important;
  box-shadow: inset 3px 0 0 0 rgba(var(--v-theme-success), 0.6) !important;
}

/* 🔵 ACTIVAS (Azul / Info) — Desbloqueadas */
.unlocked-card.is-active {
  background-color: rgba(var(--v-theme-info), 0.03) !important;
  border-color: rgba(var(--v-theme-info), 0.18) !important;
  box-shadow: inset 3px 0 0 0 rgba(var(--v-theme-info), 0.6) !important;
}

/* 🔒 ESTADO BLOQUEADO: Opaco y genérico */
.locked-card {
  opacity: 0.45;
  background-color: rgba(var(--v-theme-on-surface), 0.02) !important;
  border-color: rgba(var(--v-border-color), 0.15) !important;
  border-style: dashed !important;
}
.locked-card .hq-ability-avatar {
  filter: grayscale(100%);
  opacity: 0.6;
}

/* 🏷️ CHIP DE TIPO DE HABILIDAD (Suave, sin negrita) */
.skill-type-chip {
  font-size: 0.65rem !important;
  font-weight: 400 !important;   /* Tipografía fina/regular, elimina el bold gordo */
  letter-spacing: 0.02em;
  height: 18px !important;
  opacity: 0.9;
}
</style>