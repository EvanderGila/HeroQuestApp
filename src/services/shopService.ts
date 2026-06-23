import supabase from '@/lib/supabase'
import type { ShopItem } from '@/types/item'

export const shopService = {
  // Obtener catálogo de la tienda con JOIN a items
  async getShopItems(): Promise<ShopItem[]> {
    const { data, error } = await supabase
      .from('shop_items')
      .select('*, items:item_id (*)')
      .not('item_id', 'is', null)

    if (error) throw error
    return data as unknown as ShopItem[]
  },

  // Modificar el stock de un artículo a la venta
  async updateShopItemStock(shopItemId: number, currentStock: number, quantity: number) {
    const { error } = await supabase
      .from('shop_items')
      .update({ stock: currentStock - quantity })
      .eq('id', shopItemId)

    if (error) throw error
  }
}
