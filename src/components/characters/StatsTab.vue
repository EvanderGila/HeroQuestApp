<template>
  <div class="d-flex flex-column h-100">
    <VCard 
      variant="flat" 
      class="mb-4 pa-3 d-flex align-center justify-space-between border-thin"
      :color="currentAvailablePoints > 0 ? 'indigo-lighten-5' : 'grey-lighten-4'"
      :class="currentAvailablePoints > 0 ? 'border-indigo-lighten-2' : ''"
    >
      <div class="d-flex align-center">
        <VIcon 
          :icon="currentAvailablePoints > 0 ? 'mdi-star-circle' : 'mdi-star-circle-outline'" 
          :color="currentAvailablePoints > 0 ? 'indigo' : 'grey'" 
          size="28" 
          class="me-3" 
        />
        <div>
          <div class="text-subtitle-2 font-weight-black text-uppercase">
            {{ isEditing ? 'Distribuyendo Puntos' : 'Puntos de Atributo' }}
          </div>
          <div class="text-caption text-medium-emphasis">
            {{ isEditing ? 'Ajusta tus stats y pulsa Guardar al terminar' : 'Gástalos para mejorar tus estadísticas básicas' }}
          </div>
        </div>
      </div>
      <VChip 
        :color="currentAvailablePoints > 0 ? 'indigo' : 'grey-darken-1'" 
        variant="flat" 
        class="font-weight-black text-body-1 px-4"
        size="large"
      >
        {{ currentAvailablePoints }} DISP.
      </VChip>
    </VCard>

    <VRow dense class="flex-grow-1">
      <VCol cols="12" sm="6" v-for="stat in statsConfig" :key="stat.key" class="pa-1">
        <VCard variant="outlined" class="pa-3 d-flex align-center justify-space-between bg-surface border-thin h-100">
          <div class="d-flex align-center">
            <VIcon :icon="stat.icon" :color="stat.color" size="28" class="me-3" />
            <div>
              <div class="text-caption text-medium-emphasis text-uppercase font-weight-bold lh-tight mb-1">
                {{ stat.label }}
              </div>
              <div class="text-h6 font-weight-black">
                {{ character[stat.key] }}
                
                <span v-if="isEditing && (editedStats[stat.key] || 0) > 0" class="text-indigo font-weight-bold ms-1 text-body-1">
                  +{{ editedStats[stat.key] }}
                </span>
                
                <span v-if="character[stat.modKey]" class="text-success text-body-2 ms-1">
                  (+{{ character[stat.modKey] }})
                </span>
              </div>
            </div>
          </div>
          
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
              :color="currentAvailablePoints > 0 ? 'success' : 'grey-lighten-1'"
              :disabled="currentAvailablePoints <= 0"
              @click="incrementStat(stat.key)"
            />
          </div>
        </VCard>
      </VCol>
    </VRow>

    <VExpandTransition>
      <div v-if="isEditing" class="mt-4 pa-2 bg-amber-lighten-5 border-thin border-amber rounded-lg d-flex align-center justify-space-between flex-shrink-0">
        <span class="text-caption font-weight-bold text-amber-darken-4 ps-2">
          <VIcon icon="mdi-alert" class="me-1" size="16"/> Cambios sin guardar
        </span>
        <div class="d-flex gap-x-2">
          <VBtn size="small" variant="text" color="grey-darken-3" @click="cancelEdition">
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

const props = defineProps<{
  character: any
}>()

const emit = defineEmits<{
  (e: 'saveStats', payload: { characterId: number; updates: Record<string, number>; totalSpent: number; onSuccess?: () => void }): void
}>()

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
  { key: 'mov', modKey: 'mov_mod', label: 'Movimiento Base', icon: 'mdi-run', color: 'teal', upgradable: false }
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
.gap-x-1 {
  column-gap: 4px !important;
}
.gap-x-2 {
  column-gap: 8px !important;
}
.lh-tight {
  line-height: 1.25;
}
</style>