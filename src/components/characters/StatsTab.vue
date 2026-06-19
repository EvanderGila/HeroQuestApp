<template>
  <div class="d-flex flex-column h-100">
    <!-- 🌟 Panel superior de Puntos: Compacto y elegante -->
    <VCard 
      variant="flat" 
      class="mb-4 pa-3 d-flex align-center justify-space-between border-thin rounded-lg"
      :color="currentAvailablePoints > 0 ? 'primary' : 'surface-variant'"
      style="--v-activated-opacity: 0.06"
      :class="currentAvailablePoints > 0 ? 'bg-primary-lighten-5' : 'bg-surface-variant-lighten-5'"
    >
      <div class="d-flex align-center">
        <VIcon 
          :icon="currentAvailablePoints > 0 ? 'mdi-star-circle' : 'mdi-star-circle-outline'" 
          :color="currentAvailablePoints > 0 ? 'primary' : 'medium-emphasis'" 
          size="26" 
          class="me-3" 
        />
        <div>
          <div class="text-subtitle-2 font-weight-black text-uppercase">
            {{ isEditing ? 'Distribuyendo Puntos' : 'Puntos de Nivel' }}
          </div>
          <div class="text-caption text-medium-emphasis">
            {{ isEditing ? 'Ajusta tus stats y pulsa Guardar al terminar' : 'Gástalos para mejorar tus estadísticas' }}
          </div>
        </div>
      </div>
      <VChip 
        :color="currentAvailablePoints > 0 ? 'primary' : 'default'" 
        variant="flat" 
        class="font-weight-black text-body-2 px-3"
        :class="{ 'animate-pulse': currentAvailablePoints > 0 }"
        size="small"
      >{{ currentAvailablePoints }} P
      </VChip>
    </VCard>

    <!-- 📊 Rejilla de Atributos -->
<VRow dense class="flex-grow-1 align-content-start">
  <VCol cols="12" sm="6" v-for="stat in statsConfig" :key="stat.key" class="pa-1">

    <VCard 
      variant="outlined" 
      class="pa-3 d-flex align-center justify-space-between bg-surface border-thin h-100 rounded-lg hq-stat-card"
      :class="{
        'upgradable-glow': stat.upgradable && currentAvailablePoints > 0
      }"
    >
      <div class="d-flex align-center">
        <div class="icon-wrapper">
        <VIcon :icon="stat.icon" :color="stat.color" size="28" class="me-3" />
          <div v-if="isEditing && (editedStats[stat.key] || 0) > 0"
              class="stat-assigned-badge icon-badge">
              +{{ editedStats[stat.key] }}
            </div>
        </div>
        <div class="ml-2">
          <div class="text-caption text-medium-emphasis text-uppercase font-weight-bold lh-tight mb-1 ">
            {{ stat.label }}
          </div>

          <!-- 🧠 STAT VALUE WRAPPER -->
          <div class="d-flex align-center">

            <!-- Wrapper base + badge -->
            <div class="stat-value-wrapper">

              <!-- 🔢 VALOR BASE -->
              <div class="text-h6 font-weight-black lh-1 stat-value"
                :class="{
                  'stat-value-active': isEditing && (editedStats[stat.key] || 0) > 0
                }"
              >
                {{ character[stat.key] + ((isEditing && stat.upgradable) ? (editedStats[stat.key] || 0) : 0)}}
              </div>

            </div>

            <!-- 🟢 BONUS EQUIPO (igual que antes) -->
            <span
              v-if="equipmentStats?.[stat.key as keyof typeof equipmentStats]"
              class="text-success text-body-2 ms-1 font-weight-medium"
              :class="equipmentStats?.[stat.key as keyof typeof equipmentStats] < 0 ? 'text-error' : 'text-success'"
            >
              ({{ equipmentStats?.[stat.key as keyof typeof equipmentStats] > 0 ? '+' : '' }}{{ equipmentStats?.[stat.key as keyof typeof equipmentStats] }})
            </span>

          </div>
        </div>
      </div>

      <!-- CONTROLES -->
      <div v-if="stat.upgradable" class="d-flex align-center gap-x-1">

        <VBtn
          v-if="isEditing && (editedStats[stat.key] || 0) > 0"
          icon="mdi-minus"
          size="x-small"
          color="error"
          variant="tonal"
          @click="decrementStat(stat.key)"
        />

        <VBtn
          icon="mdi-plus"
          size="small"
          variant="flat"
          :color="currentAvailablePoints > 0 ? 'success' : 'surface-variant'"
          :disabled="currentAvailablePoints <= 0"
          @click="incrementStat(stat.key)"
        />

      </div>
    </VCard>

  </VCol>
</VRow>

    <!-- ⚠️ Notificación inferior de cambios sin guardar -->
    <VExpandTransition>
      <div v-if="isEditing" class="mt-4 pa-2 border-thin border-warning rounded-lg d-flex align-center justify-space-between flex-shrink-0 bg-warning-lighten-5">
        <span class="text-caption font-weight-bold text-warning-darken-4 ps-2 d-flex align-center">
          <VIcon icon="mdi-alert" class="me-1" color="warning" size="16"/> Cambios sin guardar
        </span>
        <div class="d-flex gap-x-2">
          <VBtn size="small" variant="text" @click="cancelEdition">
            Cancelar
          </VBtn>
          <VBtn size="small" variant="flat" color="warning" class="font-weight-bold" @click="saveEdition">
            Guardar Stats
          </VBtn>
        </div>
      </div>
    </VExpandTransition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { toRef } from 'vue'
import { useCharacterStats } from '@/composables/useCharacterStats'
const props = defineProps<{
  character: any
}>()

const emit = defineEmits<{
  (e: 'saveStats', payload: { characterId: number; updates: Record<string, number>; totalSpent: number; onSuccess?: () => void }): void
}>()

const characterRef = toRef(props, 'character')

const { equipmentStats } = useCharacterStats(characterRef)

const isEditing = ref(false)
const localPoints = ref(0)
const editedStats = ref<Record<string, number>>({ hp: 0, mp: 0 })

const currentAvailablePoints = computed(() => {
  if (isEditing.value) return localPoints.value
  return props.character?.available_points || 0
})

const statsConfig = [
  { key: 'hp', modKey: 'hp_mod', label: 'Cuerpo (Vida)', icon: 'mdi-heart', color: 'red', upgradable: true },
  { key: 'mp', modKey: 'mp_mod', label: 'Mente (Maná)', icon: 'mdi-brain', color: 'deep-purple', upgradable: true },
  { key: 'atk', modKey: 'atk_mod', label: 'Dados de Ataque', icon: 'mdi-sword', color: 'orange-darken-3', upgradable: false },
  { key: 'def', modKey: 'def_mod', label: 'Dados de Defensa', icon: 'mdi-shield', color: 'blue-darken-3', upgradable: false },
  { key: 'mov', modKey: 'mov_mod', label: 'Movimiento Base', icon: 'mdi-run', color: 'teal-darken-1', upgradable: false }
]

function startEdition() {
  if (!isEditing.value) {
    isEditing.value = true
    localPoints.value = props.character?.available_points || 0
    editedStats.value = { hp: 0, mp: 0 }
  }
}

function incrementStat(statKey: string) {
  startEdition()
  if (localPoints.value > 0) {
    localPoints.value--
    editedStats.value[statKey] = (editedStats.value[statKey] || 0) + 1
  }
}

function decrementStat(statKey: string) {
  if (editedStats.value[statKey] && editedStats.value[statKey] > 0) {
    localPoints.value++
    editedStats.value[statKey]--
  }
  if (Object.values(editedStats.value).every(val => val === 0)) {
    isEditing.value = false
  }
}

function cancelEdition() {
  isEditing.value = false
  localPoints.value = props.character?.available_points || 0
  editedStats.value = { hp: 0, mp: 0 }
}

function saveEdition() {
  const totalSpent = (props.character?.available_points || 0) - localPoints.value
  
  if (totalSpent > 0) {
    const updates: Record<string, number> = {}
    for (const key in editedStats.value) {
      if (editedStats.value[key] > 0) {
        updates[key] = editedStats.value[key]
      }
    }

    emit('saveStats', {
      characterId: props.character.id,
      updates,
      totalSpent,
      onSuccess: () => {
        editedStats.value = { hp: 0, mp: 0 }
        isEditing.value = false
      }
    })
  } else {
    isEditing.value = false
  }
}
</script>

<style scoped>
.gap-x-1 { column-gap: 4px !important; }
.gap-x-2 { column-gap: 8px !important; }
.lh-tight { line-height: 1.25; }
.lh-1 { line-height: 1; }

/* ── 💻 TIPOGRAFÍA RPG ESTILO "INTERFAZ MODERNA" ── */

/* Las etiquetas (Cuerpo, Mente, etc.): Letras finas, limpias y muy espaciadas */
.text-caption.text-medium-emphasis.text-uppercase.font-weight-bold {
  font-family: inherit !important; /* Usamos la de tu app */
  font-weight: 500 !important;    /* Más fina, elimina el "bold" bruto */
  letter-spacing: 0.12em !important; /* Súper espaciadas entre sí */
  font-size: 0.75rem !important;
  opacity: 0.85;
}

/* Los números de las estadísticas: Estilizados, limpios y con presencia */
.text-h6.font-weight-black {
  font-family: inherit !important;
  font-weight: 300 !important;    /* Estilo "Light" / Fino para un look premium */
  font-size: 1.2rem !important;   /* Más grandes para compensar que son finas */
  letter-spacing: -0.02em;        /* Números ligeramente juntos, look muy pro */
}

/* Los indicadores temporales (+1) y de equipo (+2) se mantienen claros */
.text-h6.font-weight-black span {
  font-weight: 700 !important;    /* El +1 temporal sí se lee fuerte */
  letter-spacing: normal;
}

/* El título de la barra superior */
.text-subtitle-2.font-weight-black.text-uppercase {
  font-weight: 700 !important;
  letter-spacing: 0.08em !important;
}


/* ── 🛡️ EFECTO DE BRILLO MÁGICO ── */
.hq-stat-card {
  transition: border-color 0.4s ease, box-shadow 0.4s ease;
  position: relative;
  z-index: 1;
}

/* Ajustado para que el destello sea más tecnológico/cian y menos dorado rústico */
.upgradable-glow {
  border-color: rgba(var(--v-theme-primary), 0.4) !important;
  box-shadow: 0 0 12px rgba(var(--v-theme-primary), 0.1), 
              inset 0 0 8px rgba(var(--v-theme-primary), 0.05) !important;
  animation: borderPulse 3s infinite ease-in-out;
}

@keyframes borderPulse {
  0% {
    border-color: rgba(var(--v-theme-primary), 0.3) !important;
    box-shadow: 0 0 8px rgba(var(--v-theme-primary), 0.08);
  }
  50% {
    border-color: rgba(var(--v-theme-primary), 0.8) !important;
    box-shadow: 0 0 16px rgba(var(--v-theme-primary), 0.35);
  }
  100% {
    border-color: rgba(var(--v-theme-primary), 0.3) !important;
    box-shadow: 0 0 8px rgba(var(--v-theme-primary), 0.08);
  }
}

/* Clases de utilidad para fondos integrados */
.bg-primary-lighten-5 {
  background-color: rgba(var(--v-theme-primary), 0.04) !important;
}
.bg-surface-variant-lighten-5 {
  background-color: rgba(var(--v-theme-on-surface), 0.02) !important;
}
.bg-warning-lighten-5 {
  background-color: rgba(var(--v-theme-warning), 0.05) !important;
}
.border-warning {
  border-color: rgba(var(--v-theme-warning), 0.3) !important;
}

.animate-pulse {
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.75; }
  100% { opacity: 1; }
}
.stat-value-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
}

/* número base */
.stat-value {
  transition: all .15s ease;
}

/* cuando está siendo modificado */
.stat-value-active {
  color: #42a5f5;
  text-shadow: 0 0 8px rgba(66,165,245,.25);
}

/* badge azul de puntos asignados */
.stat-assigned-badge {
  position: absolute;
  top: -12px;
  right: -18px;

  font-size: .65rem;
  font-weight: 800;

  color: #42a5f5;

  background: rgba(66,165,245,.15);
  border: 1px solid rgba(66,165,245,.25);

  padding: 1px 4px;
  border-radius: 999px;

  backdrop-filter: blur(8px);
  line-height: 1.4;

  pointer-events: none;
}
.icon-wrapper {
  position: relative;
}

.icon-badge {
  position: absolute;
  top: -6px;
  right: -4px;
}
</style>