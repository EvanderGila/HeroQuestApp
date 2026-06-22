<template>
  <div v-if="hasSpells" class="pt-2">
    <!-- Título de sección unificado -->
    <div class="hq-section-header mb-4">
      <span class="text-uppercase tracking-widest font-weight-bold text-caption text-primary">
        Libro de Conjuros
      </span>
      <span class="text-caption text-disabled ms-1 font-weight-medium">
        — {{ characterClass?.name || 'Magia Arcana' }}
      </span>
    </div>

    <VRow dense>
      <VCol cols="12" :sm="props.oneCol ? '12' : '6'" v-for="cs in classSpells" :key="cs.spells.id" class="pa-1">
        <VCard 
          variant="outlined" 
          class="pa-3 rounded-lg hq-spell-card transition-all h-100 d-flex flex-column justify-space-between"
          :class="[
            isLevelUnlocked(cs.required_lvl) ? 'unlocked-spell' : 'locked-spell'
          ]"
        >
          <!-- Cuerpo Superior: Avatar + Info -->
          <div class="d-flex align-start gap-x-3 mb-2">
            <!-- 🔮 NUEVO: Avatar del Hechizo 1:1 -->
            <VAvatar 
              size="44" 
              rounded="lg" 
              class="border-thin flex-shrink-0 bg-grey-lighten-3 hq-spell-avatar"
            >
              <VImg 
                :src="cs.spells.img || 'https://placehold.co/150?text=Spell'" 
                cover 
                crossorigin="anonymous"
              />
            </VAvatar>

            <!-- Datos del Hechizo -->
            <div class="flex-grow-1 overflow-hidden">
              <div class="d-flex align-center justify-space-between flex-wrap gap-1 mb-1">
                <span class="font-weight-black text-body-2 text-truncate lh-tight max-w-70">
                  {{ cs.spells.name }}
                </span>
                
                <!-- Candado / Info del Hechizo -->
                <div class="d-flex align-center flex-shrink-0">
                  <VChip 
                    v-if="!isLevelUnlocked(cs.required_lvl)" 
                    size="x-small" 
                    color="error" 
                    variant="flat"
                    prepend-icon="mdi-lock"
                    class="font-weight-black px-2"
                  >
                    Req. Nv. {{ cs.required_lvl }}
                  </VChip>
                  <span v-else class="text-xxs text-disabled font-weight-bold tracking-wider text-uppercase">
                    Nv. {{ cs.required_lvl }}
                  </span>
                </div>
              </div>

              <!-- Descripción en cursiva -->
              <p class="hq-mini-desc font-italic mb-0 text-medium-emphasis">
                "{{ cs.spells.description || 'Este hechizo no posee descripción arcana.' }}"
              </p>
            </div>
          </div>

          <!-- Barra de Coste e Información Inferior -->
          <div class="d-flex justify-end align-center pt-2 border-top-dashed">
            <div class="hq-mana-badge d-flex align-center px-1 rounded">
              <VIcon icon="mdi-creation" size="11" class="me-1 text-cyan-lighten-2" />
              <span class="text-caption font-weight-black text-white me-1">
                {{ cs.spells.mana_cost || 0 }}
              </span>
              <span class="text-xxs text-cyan-lighten-3 font-weight-medium">PM</span>
            </div>
          </div>
        </VCard>
      </VCol>
    </VRow>
  </div>

  <!-- Estado vacío -->
  <div v-else class="text-center py-8 text-medium-emphasis">
    <VIcon icon="mdi-wizard-hat" size="36" class="mb-2 text-disabled" />
    <p class="text-caption">Tu clase actual no puede canalizar o aprender hechizos arcanos.</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Character } from '@/types/character'

const props = withDefaults(
  defineProps<{
    character: Character
    oneCol?: boolean
  }>(),
  {
    oneCol: false
  }
)

const characterClass = computed(() => props.character?.classes)
const classSpells = computed(() => props.character?.classes?.class_spells || [])

const hasSpells = computed(() => {
  return classSpells.value.length > 0
})

function isLevelUnlocked(requiredLvl: number): boolean {
  return (props.character.lvl || 1) >= requiredLvl
}
</script>

<style scoped>
.gap-x-2 { column-gap: 8px !important; }
.lh-tight { line-height: 1.25; }
.max-w-70 { max-width: 70%; }
.transition-all { transition: all 0.25s ease-in-out; }

.hq-mini-desc {
  font-size: 0.75rem;
  line-height: 1.4;
}

.text-xxs {
  font-size: 0.65rem !important;
}

/* 🏷️ Título de la sección con línea lateral */
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

/* 🔮 ESTADO: HECHIZO DESBLOQUEADO (Resaltado y místico) */
.unlocked-spell {
  background: linear-gradient(135deg, rgba(103, 58, 183, 0.05) 0%, rgba(103, 58, 183, 0.01) 100%) !important;
  border-color: rgba(103, 58, 183, 0.3) !important; /* deep-purple original */
  box-shadow: inset 0 0 12px rgba(103, 58, 183, 0.04), inset 3px 0 0 0 rgb(103, 58, 183) !important;
}
.unlocked-spell .hq-spell-icon {
  color: rgb(149, 117, 205); /* deep-purple-lighten-2 */
  filter: drop-shadow(0 0 4px rgba(103, 58, 183, 0.4));
}

/* 🔒 ESTADO: HECHIZO BLOQUEADO */
.locked-spell {
  opacity: 0.45;
  background-color: rgba(var(--v-theme-on-surface), 0.02) !important;
  border-color: rgba(var(--v-border-color), 0.15) !important;
  border-style: dashed !important;
}
.locked-spell .hq-spell-icon {
  color: rgba(var(--v-theme-on-surface), 0.3);
}

/* ⚡ DIVISOR INFERIOR SUTIL */
.border-top-dashed {
  border-top: 1px dashed rgba(var(--v-border-color), 0.15) !important;
}

/* 🔷 INSIGNIA DE COSTE DE MANÁ (Estilo RPG Premium) */
.hq-mana-badge {
  background: linear-gradient(90deg, #4a148c 0%, #311b92 100%) !important; /* Tonos oscuros de violeta/azul para contraste */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 229, 255, 0.2);
}
.gap-x-3 { column-gap: 12px !important; }

/* Ajuste del avatar del hechizo cuando está bloqueado */
.locked-spell .hq-spell-avatar {
  filter: grayscale(100%);
  opacity: 0.6;
}
</style>