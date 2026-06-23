import supabase from '@/lib/supabase'
import type { GlobalResource, GlobalInventory } from '@/types/item'

export const inventoryService = {
  // Obtener los recursos globales (oro, etc.)
  async getGlobalResources(): Promise<GlobalResource[]> {
    const { data, error } = await supabase.from('global_resources').select('*')

    if (error) throw error
    return data
  },

  // Obtener el inventario común del grupo
  async getGlobalInventory(): Promise<GlobalInventory[]> {
    const { data, error } = await supabase
      .from('global_inventory')
      .select('*, items:item_id (*)')

    if (error) throw error
    return data as unknown as GlobalInventory[]
  },

  // Actualizar el valor de un recurso (como restar o sumar oro)
  async updateResourceAmount(resourceId: number, newAmount: number) {
    const { error } = await supabase
      .from('global_resources')
      .update({ amount: newAmount })
      .eq('id', resourceId)

    if (error) throw error
  },

  // Insertar un nuevo tipo de objeto en la mochila común
  async insertGlobalInventoryItem(itemId: number, quantity: number) {
    const { error } = await supabase
      .from('global_inventory')
      .insert({ item_id: itemId, quantity: quantity })

    if (error) throw error
  },

  // Modificar la cantidad de un objeto ya existente en el inventario común
  async updateGlobalInventoryQuantity(
    inventoryId: number,
    currentQuantity: number,
    quantityToAdd: number
  ) {
    const { error } = await supabase
      .from('global_inventory')
      .update({ quantity: currentQuantity + quantityToAdd })
      .eq('id', inventoryId)

    if (error) throw error
  }
}
