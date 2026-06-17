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
  async function upgradeCharacterStats(payload: { characterId: number; updates: Record<string, number>; totalSpent: number }) {
    // 1. Buscamos el personaje actual en el almacén de Pinia para tener sus valores base reales
    const currentChar = charStore.myCharacters.find(c => c.id === payload.characterId)
    if (!currentChar) {
      console.error("Personaje no encontrado en el store global.")
      return false
    }

    charStore.setLoading(true)
    try {
      const hpAdded = payload.updates.hp || 0
      const mpAdded = payload.updates.mp || 0

      // 2. Llamamos al servicio pasando los valores actuales y los incrementos
      const updatedCharacter = await characterService.updateCharacterStats(
        payload.characterId,
        currentChar.hp,
        currentChar.mp,
        currentChar.available_points || 0,
        hpAdded,
        mpAdded,
        payload.totalSpent
      )

      // 3. Sincronizamos el Store de Pinia reemplazando el personaje en el array local
      const updatedList = charStore.myCharacters.map(char => 
        char.id === payload.characterId ? { ...char, ...updatedCharacter } : char
      )
      charStore.setMyCharacters(updatedList)
      
      return true
    } catch (e) {
      console.error("Error al mejorar los atributos en Supabase:", e)
      alert("Los dioses de la mazmorra rechazaron tu ofrenda. No se guardaron los cambios.")
      return false
    } finally {
      charStore.setLoading(false)
    }
  }

  async function saveNewCharacter(characterData: any) {
    charStore.setLoading(true)
    try {
      await characterService.createCharacter(characterData)
      // Opcional: Volver a cargar los personajes del usuario para que aparezca el nuevo
      // await fetchUserCharacters(characterData.user_id) 
      return true
    } catch (e) {
      console.error("Error al forjar el personaje:", e)
      alert("El personaje no pudo ser creado. Los dioses no son propicios.")
      return false
    } finally {
      charStore.setLoading(false)
    }
  }

  return { loadCreationData, fetchUserCharacters, saveNewCharacter, upgradeCharacterStats }
}