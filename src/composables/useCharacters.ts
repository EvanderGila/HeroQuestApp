import { characterService } from '@/services/characterService'
import { useCharacterStore } from '@/store/characterStore'

export function useCharacters() {
  const charStore = useCharacterStore()

  // Cargar datos necesarios para crear personajes (Razas + Clases)
  async function loadCreationData() {
    charStore.setLoading(true)
    try {
      // Lanzamos ambas peticiones a la vez (Promise.all)
      const [races, classes] = await Promise.all([
        characterService.getRaces(),
        characterService.getClasses()
      ])
      charStore.setRaces(races)
      charStore.setClasses(classes)
    } catch (e) {
      console.error("Error al cargar especies:", e)
    } finally {
      charStore.setLoading(false)
    }
  }

  async function fetchUserCharacters(userId: string) {
    charStore.setLoading(true)
    try {
      const chars = await characterService.getCharactersByUserId(userId)
      charStore.setMyCharacters(chars)
    } catch (e) {
      console.error("Error al cargar personajes:", e)
    } finally {
      charStore.setLoading(false)
    }
  }

  return { loadCreationData, fetchUserCharacters }
}