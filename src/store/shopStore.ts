import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ShopItem } from '@/types/item'

export const useShopStore = defineStore('shop', () => {
  const availableItems = ref<ShopItem[]>([])
  const isLoading = ref(false)

  function setShopItems(items: ShopItem[]) {
    availableItems.value = items
  }
  function setLoading(status: boolean) {
    isLoading.value = status
  }

  return {
    availableItems,
    isLoading,
    setShopItems,
    setLoading
  }
})
