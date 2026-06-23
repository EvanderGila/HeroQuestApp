import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { GlobalResource, GlobalInventory } from '@/types/item'

export const useInventoryStore = defineStore('inventory', () => {
  const resources = ref<GlobalResource[]>([])
  const sharedInventory = ref<GlobalInventory[]>([])
  const isLoading = ref(false)

  // El getter del oro ahora vive de forma centralizada aquí
  const currentGold = computed(() => {
    const goldResource = resources.value.find((r) => r.type === 'gold')
    return goldResource ? goldResource.amount : 0
  })

  // Funciones simples para alterar el estado
  function setResources(res: GlobalResource[]) {
    resources.value = res
  }
  function setSharedInventory(inv: GlobalInventory[]) {
    sharedInventory.value = inv
  }
  function setLoading(status: boolean) {
    isLoading.value = status
  }

  return {
    resources,
    sharedInventory,
    isLoading,
    currentGold,
    setResources,
    setSharedInventory,
    setLoading
  }
})
