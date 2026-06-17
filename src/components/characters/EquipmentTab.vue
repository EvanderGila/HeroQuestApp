<template>
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
                  {{ getEquippedItemInSlot(slot.key)?.name }}
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
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { Character } from '@/types/character'

const props = defineProps<{
  character: Character // Tu interfaz de personaje de Supabase
}>()

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

const characterEquipment = computed(() => props.character?.character_equipment || [])

function getEquippedItemInSlot(slotKey: string) {
  if (!characterEquipment) return null
  return characterEquipment.value.find((e:any) => e.slot === slotKey) || null
}
</script>