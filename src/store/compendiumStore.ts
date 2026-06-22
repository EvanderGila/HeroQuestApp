import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Item } from '@/types/item'
import type { Race } from '@/types/race'
import type { Class } from '@/types/class'
import type { Ability } from '@/types/ability'
import type { Spell } from '@/types/spell'


export const useCompendiumStore = defineStore('compendium', () => {

  const races = ref<Race[]>([])
  const classes = ref<Class[]>([])
  const items = ref<Item[]>([])
  const abilities = ref<Ability[]>([])
  const spells = ref<Spell[]>([])

  const selectedRace = ref<Race | null>(null)
  const selectedClass = ref<Class | null>(null)
  const selectedItem = ref<Item | null>(null)
  const selectedAbility = ref<Ability | null>(null)
  const selectedSpell = ref<Spell | null>(null)

  const isLoading = ref(false)

  const loaded = ref({

    races:false,
    classes:false,
    items:false,
    abilities:false,
    spells:false

  })

  function setRaces(racesNew: Race[]) { races.value = racesNew }
  function setClasses(classesNew: Class[]) { classes.value = classesNew }
  function setAbilities(abilitiesNew: Ability[]) { abilities.value = abilitiesNew }
  function setSpells(spellsNew: Spell[]) { spells.value = spellsNew }
  function setItems(itemsNew: Item[]) { items.value = itemsNew }

  function setSelectedRace(race: Race | null) { selectedRace.value = race }
  function setSelectedClass(cls: Class | null) { selectedClass.value = cls }
  function setSelectedAbility(ablty: Ability | null) { selectedAbility.value = ablty }
  function setSelectedSpell(spell: Spell | null) { selectedSpell.value = spell }
  function setSelectedItem(item: Item | null) { selectedItem.value = item }

  return {

    races,
    classes,
    items,
    abilities,
    spells,

    selectedRace,
    selectedClass,
    selectedItem,
    selectedAbility,
    selectedSpell,

    loaded,

    isLoading,

    setRaces,
    setClasses,
    setAbilities,
    setSpells,
    setItems,

    setSelectedRace,
    setSelectedClass,
    setSelectedAbility,
    setSelectedSpell,
    setSelectedItem
  }

})