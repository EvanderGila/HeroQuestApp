<template>
  <VCard class="hq-hq-card mx-auto d-flex flex-column" height="720"
  max-height="720" variant="flat">
    
    <div class="hq-header flex-shrink-0">
      <VImg
        :src="character.races?.img || 'https://placehold.co/800x300?text=HeroQuest'"
        height="100%"
        cover
        crossorigin="anonymous"
        class="align-end text-white"
      >
        <div class="bg-gradient-dark px-4 py-3 d-flex justify-space-between align-end">
          <div>
            <h2 class="text-h5 text-sm-h4 font-weight-black text-uppercase tracking-wide mb-0 text-white line-clamp-1">
              {{ character.name }}
            </h2>
            <div class="text-caption text-sm-subtitle-2 text-grey-lighten-2 font-weight-bold">
              {{ character.races?.name }} — {{ character.classes?.name }}
            </div>
          </div>
          <VAvatar color="warning" size="48" class="elevation-3 border-thin font-weight-black text-subtitle-1 text-black flex-shrink-0">
            {{ character.lvl || 1 }}
          </VAvatar>
        </div>
      </VImg>
    </div>

    <div class="px-4 py-2 bg-grey-lighten-4 border-bottom-thin flex-shrink-0">
      <div class="d-flex justify-space-between hq-mini-text font-weight-bold mb-1">
        <span>EXPERIENCIA</span>
        <span>{{ character.current_xp || 0 }} / 1000 PX</span>
      </div>
      <VProgressLinear
        :model-value="calculateExpPercentage(character.current_xp)"
        color="warning"
        height="6"
        rounded
        striped
      />
    </div>

    <VTabs 
      v-model="activeTab" 
      color="primary" 
      grow 
      density="compact"
      class="border-bottom-thin flex-shrink-0 bg-white"
    >
      <VTab value="stats" class="hq-tab-text"><VIcon icon="mdi-sword-cross" class="d-sm-inline me-sm-1" size="small" />Stats</VTab>
      <VTab value="skills" class="hq-tab-text"><VIcon icon="mdi-auto-fix" class="d-sm-inline me-sm-1" size="small" />Habs</VTab>
      <VTab value="spells" class="hq-tab-text"><VIcon icon="mdi-wizard-hat" class="d-sm-inline me-sm-1" size="small" />Magia</VTab>
      <VTab value="equipment" class="hq-tab-text"><VIcon icon="mdi-shield-account" class="d-sm-inline me-sm-1" size="small" />Equipo</VTab>
    </VTabs>

    <div class="hq-scroll-body flex-grow-1 bg-grey-lighten-5">
      
      <div v-if="activeTab === 'stats'" class="pa-4 pa-sm-6 d-flex flex-column h-100">
        
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
                  <div class="text-caption text-medium-emphasis text-uppercase font-weight-bold lh-tight mb-1">{{ stat.label }}</div>
                  <div class="text-h6 font-weight-black">
                    <!-- Valor base del personaje -->
                    {{ character[stat.key as keyof typeof character] }}
                    
                    <!-- Puntos añadidos provisionalmente en color azul/verde amigable -->
                    <span v-if="isEditing && (editedStats[stat.key] || 0) > 0" class="text-indigo font-weight-bold ms-1 text-body-1">
                      +{{ editedStats[stat.key] }}
                    </span>
                    
                    <!-- Modificador nativo del equipo -->
                    <span v-if="character[stat.modKey as keyof typeof character]" class="text-success text-body-2 ms-1">
                      (+{{ character[stat.modKey as keyof typeof character] }})
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

      <div v-if="activeTab === 'skills'" class="pa-4 pa-sm-6">
        <div v-if="hasAbilities" class="d-flex flex-column gap-4">
          
          <div v-if="character.races?.race_abilities?.length > 0" class="mb-4">
            <h4 class="text-caption font-weight-bold text-uppercase text-primary mb-2">Rasgos de Raza ({{ character.races.name }})</h4>
            <VRow dense>
              <VCol cols="12" sm="12" v-for="ra in character.races.race_abilities" :key="ra.abilities.id" class="pa-1">
                <VCard variant="tonal" :color="isLevelUnlocked(ra.required_lvl) ? 'secondary' : 'grey'" class="border-thin pa-3 h-100" :disabled="!isLevelUnlocked(ra.required_lvl)">
                  
                  <div class="d-flex align-center justify-space-between mb-2">
                    <span class="font-weight-black text-body-2 line-clamp-1">
                      <VIcon icon="mdi-dna" size="16" class="me-1"/>{{ ra.abilities.name }}
                    </span>
                    
                    <div class="d-flex align-center gap-x-2">
                      <VChip 
                        size="x-small" 
                        :variant="isLevelUnlocked(ra.required_lvl) ? 'flat' : 'outlined'"
                        :color="ra.abilities.type === 'passive' ? 'blue-darken-1' : 'orange-darken-2'"
                        class="font-weight-bold"
                      >
                        {{ ra.abilities.type === 'passive' ? 'Pasiva' : 'Activa' }}
                      </VChip>

                      <VChip 
                        v-if="!isLevelUnlocked(ra.required_lvl)" 
                        size="x-small" 
                        color="error" 
                        variant="flat"
                        prepend-icon="mdi-lock"
                        class="font-weight-black"
                      >
                        Req. Nv. {{ ra.required_lvl }}
                      </VChip>
                    </div>
                  </div>

                  <p class="hq-mini-desc mb-0 text-medium-emphasis">{{ ra.abilities.description || 'Sin descripción.' }}</p>
                </VCard>
              </VCol>
            </VRow>
          </div>

          <div v-if="character.classes?.class_abilities?.length > 0">
            <h4 class="text-caption font-weight-bold text-uppercase text-primary mb-2">Técnicas de Clase ({{ character.classes.name }})</h4>
            <VRow dense>
              <VCol cols="12" sm="12" v-for="ca in character.classes.class_abilities" :key="ca.abilities.id" class="pa-1">
                <VCard variant="tonal" :color="isLevelUnlocked(ca.required_lvl) ? 'primary' : 'grey'" class="border-thin pa-3 h-100" :disabled="!isLevelUnlocked(ca.required_lvl)">
                  
                  <div class="d-flex align-center justify-space-between mb-2">
                    <span class="font-weight-black text-body-2 line-clamp-1">
                      <VIcon icon="mdi-sword-master" size="16" class="me-1"/>{{ ca.abilities.name }}
                    </span>
                    
                    <div class="d-flex align-center gap-x-2">
                      <VChip 
                        size="x-small" 
                        :variant="isLevelUnlocked(ca.required_lvl) ? 'flat' : 'outlined'"
                        :color="ca.abilities.type === 'passive' ? 'blue-darken-1' : 'orange-darken-2'"
                        class="font-weight-bold"
                      >
                        {{ ca.abilities.type === 'passive' ? 'Pasiva' : 'Activa' }}
                      </VChip>

                      <VChip 
                        v-if="!isLevelUnlocked(ca.required_lvl)" 
                        size="x-small" 
                        color="error" 
                        variant="flat"
                        prepend-icon="mdi-lock"
                        class="font-weight-black"
                      >
                        Req. Nv. {{ ca.required_lvl }}
                      </VChip>
                    </div>
                  </div>

                  <p class="hq-mini-desc mb-0 text-medium-emphasis">{{ ca.abilities.description || 'Sin descripción.' }}</p>
                </VCard>
              </VCol>
            </VRow>
          </div>

        </div>
        <div v-else class="text-center py-8 text-medium-emphasis">
          <VIcon icon="mdi-book-open-blank-variant" size="36" class="mb-2 text-disabled" />
          <p class="text-caption">Este aventurero no posee rasgos ni técnicas aprendidas.</p>
        </div>
      </div>

      <div v-if="activeTab === 'spells'" class="pa-4 pa-sm-6">
        <div v-if="character.classes?.class_spells && character.classes.class_spells.length > 0">
          <VRow dense>
            <VCol cols="12" sm="6" v-for="cs in character.classes.class_spells" :key="cs.spells.id" class="pa-1">
              <VCard 
                variant="outlined" 
                :color="isLevelUnlocked(cs.required_lvl) ? 'deep-purple-lighten-1' : 'grey-lighten-1'" 
                class="border-thin pa-3 d-flex flex-column justify-space-between bg-surface h-100"
                :disabled="!isLevelUnlocked(cs.required_lvl)"
              >
                <div>
                  <div class="d-flex align-center justify-space-between mb-1">
                    <span class="font-weight-black text-body-2"><VIcon icon="mdi-star-flash" color="deep-purple" size="16" class="me-1"/>{{ cs.spells.name }}</span>
                    <VChip v-if="!isLevelUnlocked(cs.required_lvl)" size="x-small" color="error" variant="flat">Bloqueado (Nv. {{ cs.required_lvl }})</VChip>
                  </div>
                  <p class="hq-mini-desc italic mb-2 text-medium-emphasis">"{{ cs.spells.description }}"</p>
                </div>
                <div class="d-flex justify-space-between align-center pt-2 border-top-thin">
                  <span class="text-caption font-weight-bold text-deep-purple">
                    <VIcon icon="mdi-lightning-bolt" size="12" />{{ cs.spells.mana_cost || 0 }} PM
                  </span>
                  <VChip v-if="isLevelUnlocked(cs.required_lvl)" size="x-small" color="deep-purple" variant="flat">Listo</VChip>
                </div>
              </VCard>
            </VCol>
          </VRow>
        </div>
        <div v-else class="text-center py-8 text-medium-emphasis">
          <VIcon icon="mdi-wizard-hat" size="36" class="mb-2 text-disabled" />
          <p class="text-caption">Tu clase actual no puede canalizar o aprender hechizos arcanos.</p>
        </div>
      </div>

      <div v-if="activeTab === 'equipment'" class="pa-4">
        <div class="text-caption font-weight-bold text-uppercase mb-3 text-primary">Inventario de Ranuras Activas</div>
        <VRow dense>
          <VCol cols="6" sm="4" v-for="slot in availableSlots" :key="slot.key" class="pa-1">
            <VCard 
              variant="flat" 
              class="hq-inventory-slot border-thin d-flex flex-column justify-space-between align-center pa-2 text-center h-100"
              :class="getEquippedItemInSlot(slot.key) ? 'bg-amber-lighten-5 border-amber-lighten-2' : 'bg-white'"
            >
              <VIcon 
                :icon="getEquippedItemInSlot(slot.key) ? 'mdi-shield-check' : slot.icon" 
                :color="getEquippedItemInSlot(slot.key) ? 'amber-darken-3' : 'disabled'" 
                size="20"
                class="mb-1"
              />
              <div class="hq-slot-tag text-disabled font-weight-bold text-uppercase">{{ slot.label }}</div>
              
              <div class="my-1 flex-grow-1 d-flex align-center justify-center min-h-30">
                <span v-if="getEquippedItemInSlot(slot.key)" class="hq-item-name font-weight-black text-high-emphasis">
                  {{ getEquippedItemInSlot(slot.key).name }}
                </span>
                <span v-else class="text-caption text-disabled italic">Vacío</span>
              </div>

              <VBtn
                v-if="getEquippedItemInSlot(slot.key)"
                size="x-small"
                color="error"
                variant="tonal"
                block
                class="mt-1"
                @click="$emit('unequipItem', { characterId: character.id, slot: slot.key })"
              >
                Quitar
              </VBtn>
            </VCard>
          </VCol>
        </VRow>
      </div>

    </div>

    <div class="pa-3 bg-grey-lighten-4 border-top-thin d-flex justify-end flex-shrink-0">
      <VBtn color="grey-darken-3" variant="flat" size="small" @click="$emit('close')">
        Cerrar Panel
      </VBtn>
    </div>

  </VCard>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  character: any
  equipmentList?: any[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'saveStats', payload: { characterId: number; updates: Record<string, number>; totalSpent: number; onSuccess?: () => void }): void
  (e: 'unequipItem', payload: { characterId: number; slot: string }): void
}>()

const activeTab = ref('stats')

// 2. Variables de control de edición
const isEditing = ref(false)
const localPoints = ref(0) // Rastrea los puntos disponibles manipulados localmente
const editedStats = ref<Record<string, number>>({
  hp: 0,
  mp: 0
})

// Computed para unificar los puntos que se ven en la interfaz
const currentAvailablePoints = computed(() => {
  if (isEditing.value) return localPoints.value
  return props.character.available_points || 0
})

const statsConfig = [
  { key: 'hp', modKey: 'hp_mod', label: 'Cuerpo (Vida)', icon: 'mdi-heart', color: 'red', upgradable: true },
  { key: 'mp', modKey: 'mp_mod', label: 'Mente (Maná)', icon: 'mdi-brain', color: 'deep-purple', upgradable: true },
  { key: 'atk', modKey: 'atk_mod', label: 'Dados de Ataque', icon: 'mdi-sword', color: 'orange-darken-3', upgradable: false },
  { key: 'def', modKey: 'def_mod', label: 'Dados de Defensa', icon: 'mdi-shield', color: 'blue-darken-3', upgradable: false },
  { key: 'mov', modKey: 'mov_mod', label: 'Movimiento Base', icon: 'mdi-run', color: 'teal', upgradable: false }
]

const availableSlots = [
  { key: 'head', label: 'Cabeza', icon: 'mdi-hard-hat' },
  { key: 'talisman', label: 'Amuleto', icon: 'mdi-necklace' },
  { key: 'chest_inner', label: 'Ropa / Túnica', icon: 'mdi-tshirt-crew' },
  { key: 'chest_outer', label: 'Armadura / Capa', icon: 'mdi-vest' },
  { key: 'weapon_1h', label: 'Mano Dch (1H)', icon: 'mdi-sword' },
  { key: 'weapon_2h', label: 'Dos Manos', icon: 'mdi-sword-cross' },
  { key: 'shield', label: 'Mano Izq (Escudo)', icon: 'mdi-shield-star' },
  { key: 'bracers', label: 'Brazales', icon: 'mdi-hand-back-right' },
  { key: 'boots', label: 'Calzado', icon: 'mdi-shoe-print' }
]

const hasAbilities = computed(() => {
  return !!props.character.races?.race_abilities?.length || !!props.character.classes?.class_abilities?.length
})

function isLevelUnlocked(requiredLvl: number): boolean {
  return (props.character.lvl || 1) >= requiredLvl
}

function calculateExpPercentage(exp: number = 0) {
  return Math.min((exp / 1000) * 100, 100)
}

function getEquippedItemInSlot(slotKey: string) {
  if (!props.equipmentList) return null
  return props.equipmentList.find(e => e.slot === slotKey) || null
}

// Inicializa el estado de edición si no se ha hecho ya
function startEdition() {
  if (!isEditing.value) {
    isEditing.value = true
    localPoints.value = props.character.available_points || 0
    editedStats.value = { hp: 0, mp: 0 } // Limpiamos contadores de sesión
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
  // Si devuelve todos los puntos a su origen, cerramos el modo edición automáticamente
  if (Object.values(editedStats.value).every(val => val === 0)) {
    isEditing.value = false
  }
}

function cancelEdition() {
  isEditing.value = false
  localPoints.value = props.character.available_points || 0
  editedStats.value = { hp: 0, mp: 0 }
}

async function saveEdition() {
  const totalSpent = props.character.available_points - localPoints.value
  
  if (totalSpent > 0) {
    const updates: Record<string, number> = {}
    for (const key in editedStats.value) {
      if (editedStats.value[key] > 0) {
        updates[key] = editedStats.value[key]
      }
    }

    // Enviamos el emit y le pasamos una función callback (onSuccess) que ejecutará el padre
    emit('saveStats', {
      characterId: props.character.id,
      updates,
      totalSpent,
      // Pasamos una función que el padre ejecutará al terminar el fetch
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
/* 🎯 ARQUITECTURA DE ALTURA CONGELADA NATIVA (SIN COMPONENTES TRAICIONEROS) */
.hq-hq-card {
  width: 95vw !important;         
  max-width: 950px !important;    
  
  border-radius: 12px;
  overflow: hidden !important;    
  border: 1px solid rgba(0, 0, 0, 0.12);
}

/* Cabecera proporcional */
.hq-header {
  height: 130px;
}

/* El motor del Scroll: solo este div intermedio genera barra de desplazamiento */
.hq-scroll-body {
  flex-grow: 1 !important;
  height: 100% !important; /* Fuerza al contenedor a rellenar el chasis de la carta */
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch;
}

/* Estilos de tipografía compacta HeroQuest */
.bg-gradient-dark {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.2) 100%);
  width: 100%;
}
.border-bottom-thin { border-bottom: 1px solid rgba(0, 0, 0, 0.08); }
.border-top-thin { border-top: 1px solid rgba(0, 0, 0, 0.08); }
.lh-tight { line-height: 1.15; }
.min-h-30 { min-height: 30px; }

.hq-mini-text {
  font-size: 0.7rem;
  letter-spacing: 0.05em;
}
.hq-tab-text {
  font-size: 0.75rem !important;
  font-weight: 800 !important;
  letter-spacing: 0px !important;
}
.hq-mini-desc {
  font-size: 0.75rem;
  line-height: 1.3;
}

/* Cuadrícula de Inventario */
.hq-inventory-slot {
  min-height: 105px;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.06) !important;
}
.hq-slot-tag {
  font-size: 0.58rem;
  letter-spacing: 0.02em;
}
.hq-item-name {
  font-size: 0.75rem;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
/* Borde sutil para el nuevo contenedor de puntos */
.border-indigo-lighten-2 {
  border: 1px solid rgba(63, 81, 181, 0.3) !important;
}
.gap-x-2 {
  column-gap: 8px !important;
}
.gap-x-1 {
  column-gap: 4px !important;
}
.border-amber {
  border: 1px solid rgba(217, 131, 0, 0.3) !important;
}
</style>