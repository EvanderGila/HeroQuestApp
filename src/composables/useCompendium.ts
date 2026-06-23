import { computed } from 'vue'
import { compendiumService } from '@/services/compendiumService'
import { useCompendiumStore } from '@/store/compendiumStore'

export function useCompendium() {
  const compStore = useCompendiumStore()
  const {
    getRaces,
    getClasses,
    getAbilities,
    getSpells,
    getItems,
    getRaceById,
    getClassById,
    getAbilityById,
    getSpellById,
    getItemById
  } = compendiumService

  const selectedRace = computed(() => compStore.selectedRace)
  const selectedClass = computed(() => compStore.selectedClass)
  const selectedAbility = computed(() => compStore.selectedAbility)
  const selectedSpell = computed(() => compStore.selectedSpell)
  const selectedItem = computed(() => compStore.selectedItem)

  async function loadRaces() {
    if (compStore.loaded.races) return

    compStore.isLoading = true

    try {
      const races = await getRaces()

      compStore.races = races
      compStore.loaded.races = true
    } finally {
      compStore.isLoading = false
    }
  }

  async function loadClasses() {
    if (compStore.loaded.classes) return

    compStore.isLoading = true

    try {
      const classes = await getClasses()

      compStore.classes = classes
      compStore.loaded.classes = true
    } finally {
      compStore.isLoading = false
    }
  }

  async function loadItems() {
    if (compStore.loaded.items) return

    compStore.isLoading = true

    try {
      const items = await getItems()

      compStore.items = items
      compStore.loaded.items = true
    } finally {
      compStore.isLoading = false
    }
  }

  async function loadAbilities() {
    if (compStore.loaded.abilities) return

    compStore.isLoading = true

    try {
      const abilities = await getAbilities()

      compStore.abilities = abilities
      compStore.loaded.abilities = true
    } finally {
      compStore.isLoading = false
    }
  }

  async function loadSpells() {
    if (compStore.loaded.spells) return

    compStore.isLoading = true

    try {
      const spells = await getSpells()

      compStore.spells = spells
      compStore.loaded.spells = true
    } finally {
      compStore.isLoading = false
    }
  }

  async function loadTab(tab: string) {
    switch (tab) {
      case 'races':
        return loadRaces()

      case 'classes':
        return loadClasses()

      case 'items':
        return loadItems()

      case 'abilities':
        return loadAbilities()

      case 'spells':
        return loadSpells()
    }
  }

  async function fetchRaceDetails(id: number) {
    // Si ya está cargada y coincide, no hacemos nada
    if (compStore.selectedRace?.id === id) {
      return
    }

    compStore.isLoading = true

    try {
      const race = await getRaceById(id)
      compStore.setSelectedRace(race)
    } catch (e) {
      console.error(e)
    } finally {
      compStore.isLoading = false
    }
  }

  async function fetchClassDetails(id: number) {
    // Si ya está cargada y coincide, no hacemos nada
    if (compStore.selectedClass?.id === id) {
      return
    }

    compStore.isLoading = true

    try {
      const cls = await getClassById(id)
      compStore.setSelectedClass(cls)
    } catch (e) {
      console.error(e)
    } finally {
      compStore.isLoading = false
    }
  }

  async function fetchAbilityDetails(id: number) {
    // Si ya está cargada y coincide, no hacemos nada
    if (compStore.selectedAbility?.id === id) {
      return
    }

    compStore.isLoading = true

    try {
      const abl = await getAbilityById(id)
      compStore.setSelectedAbility(abl)
    } catch (e) {
      console.error(e)
    } finally {
      compStore.isLoading = false
    }
  }

  async function fetchSpellDetails(id: number) {
    // Si ya está cargada y coincide, no hacemos nada
    if (compStore.selectedSpell?.id === id) {
      return
    }

    compStore.isLoading = true

    try {
      const spell = await getSpellById(id)
      compStore.setSelectedSpell(spell)
    } catch (e) {
      console.error(e)
    } finally {
      compStore.isLoading = false
    }
  }

  async function fetchItemDetails(id: number) {
    // Si ya está cargada y coincide, no hacemos nada
    if (compStore.selectedItem?.id === id) {
      return
    }

    compStore.isLoading = true

    try {
      const item = await getItemById(id)
      compStore.setSelectedItem(item)
    } catch (e) {
      console.error(e)
    } finally {
      compStore.isLoading = false
    }
  }

  return {
    selectedRace,
    selectedClass,
    selectedAbility,
    selectedSpell,
    selectedItem,
    fetchRaceDetails,
    fetchClassDetails,
    fetchAbilityDetails,
    fetchSpellDetails,
    fetchItemDetails,
    loadTab
  }
}
