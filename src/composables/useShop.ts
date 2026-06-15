import { shopService } from '@/services/shopService'
import { inventoryService } from '@/services/inventoryService'

import { useShopStore } from '@/store/shopStore'
import { useInventoryStore } from '@/store/inventoryStore'

export function useShop() {
  const shopStore = useShopStore()
  const invStore = useInventoryStore() // <-- Importamos tu nuevo store

  // Carga inicial coordinada: Usa ambos servicios y actualiza ambos stores
  async function loadShopData() {
    shopStore.setLoading(true)
    invStore.setLoading(true)
    try {
      const [items, resources, inventory] = await Promise.all([
        shopService.getShopItems(),
        inventoryService.getGlobalResources(),
        inventoryService.getGlobalInventory()
      ])
      
      shopStore.setShopItems(items)
      
      // Llenamos el nuevo almacén de inventario global
      invStore.setResources(resources)
      invStore.setSharedInventory(inventory)
    } catch (e) {
      console.error("Error al cargar los datos del mercado:", e)
    } finally {
      shopStore.setLoading(false)
      invStore.setLoading(false)
    }
  }

  // Lógica de compra que cruza el stock de la tienda con la economía del grupo
  async function buyItem(shopItem: any, quantity: number = 1) {
    const totalCost = shopItem.price * quantity

    // Ahora validamos usando el dinero real del invStore
    if (invStore.currentGold < totalCost) {
      alert("¡No hay suficiente oro en el cofre del grupo!")
      return
    }
    if (shopItem.stock < quantity) {
      alert("No hay suficiente stock disponible en el mercado.")
      return
    }

    shopStore.setLoading(true)
    invStore.setLoading(true)
    
    try {
      // 1. Restar Oro utilizando inventoryService
      const goldResource = invStore.resources.find(r => r.type === 'gold')
      if (goldResource) {
        await inventoryService.updateResourceAmount(goldResource.id, goldResource.amount - totalCost)
      }

      // 2. Reducir Stock utilizando shopService
      await shopService.updateShopItemStock(shopItem.id, shopItem.stock, quantity)

      // 3. Añadir a Inventario Común utilizando inventoryService
      const existingInInventory = invStore.sharedInventory.find(inv => inv.item_id === shopItem.item_id)
      if (existingInInventory) {
        await inventoryService.updateGlobalInventoryQuantity(existingInInventory.id, existingInInventory.quantity, quantity)
      } else {
        await inventoryService.insertGlobalInventoryItem(shopItem.item_id, quantity)
      }

      // 4. Refrescar todos los datos en paralelo para sincronizar la UI
      const [items, resources, inventory] = await Promise.all([
        shopService.getShopItems(),
        inventoryService.getGlobalResources(),
        inventoryService.getGlobalInventory()
      ])
      
      shopStore.setShopItems(items)
      invStore.setResources(resources)
      invStore.setSharedInventory(inventory)

    } catch (e) {
      console.error("Error crítico durante la transacción:", e)
      alert("La transacción falló. Los duendes del mercado han revertido los cambios.")
    } finally {
      shopStore.setLoading(false)
      invStore.setLoading(false)
    }
  }

  return { loadShopData, buyItem }
}