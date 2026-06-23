import { computed, type Ref } from 'vue'
import type { Character } from '@/types/character'

export function useCharacterStats(character: Ref<Character>) {
  const equipmentStats = computed(() => {
    const equipment = character.value.character_equipment || []

    return equipment.reduce(
      (acc, eq) => {
        const item = eq.items

        acc.hp += item?.hp_mod || 0
        acc.atk += item?.atk_mod || 0
        acc.def += item?.def_mod || 0
        acc.mp += item?.mp_mod || 0
        acc.mov += item?.mov_mod || 0

        return acc
      },

      {
        hp: 0,
        atk: 0,
        def: 0,
        mp: 0,
        mov: 0
      }
    )
  })

  const totalStats = computed(() => ({
    hp: character.value.hp + equipmentStats.value.hp,

    atk: character.value.atk + equipmentStats.value.atk,

    def: character.value.def + equipmentStats.value.def,

    mp: character.value.mp + equipmentStats.value.mp,

    mov: character.value.mov + equipmentStats.value.mov
  }))

  return {
    equipmentStats,
    totalStats
  }
}
