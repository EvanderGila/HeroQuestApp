import { compendiumService } from '@/services/compendiumService'
import { characterService } from '@/services/characterService'
import { useCompendiumStore } from '@/store/compendiumStore'

export function useCompendium() {

    const compStore = useCompendiumStore()
    const { getRaces, getClasses, getAbilities, getSpells, getItems } = compendiumService


    async function loadRaces() {

        if(compStore.loaded.races)
            return

        compStore.isLoading = true

        try {
            const races = await getRaces()

            compStore.races = races
            compStore.loaded.races = true
        }
        finally {
            compStore.isLoading = false
        }
    }

    async function loadClasses() {

        if(compStore.loaded.classes)
            return

        compStore.isLoading = true

        try {
            const classes = await getClasses()

            compStore.classes = classes
            compStore.loaded.classes = true
        }
        finally {
            compStore.isLoading = false
        }
    }

    async function loadItems() {

        if(compStore.loaded.items)
            return

        compStore.isLoading = true

        try {
            const items = await getItems()

            compStore.items = items
            compStore.loaded.items = true
        }
        finally {
            compStore.isLoading = false
        }
    }

    async function loadAbilities() {

        if(compStore.loaded.abilities)
            return

        compStore.isLoading = true

        try {
            const abilities = await getAbilities()

            compStore.abilities = abilities
            compStore.loaded.abilities = true
        }
        finally {
            compStore.isLoading = false
        }
    }

    async function loadSpells() {

        if(compStore.loaded.spells)
            return

        compStore.isLoading = true

        try {
            const spells = await getSpells()

            compStore.spells = spells
            compStore.loaded.spells = true
        }
        finally {
            compStore.isLoading = false
        }
    }

    async function loadTab(tab:string){

        switch(tab){

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

    return { loadTab }
}