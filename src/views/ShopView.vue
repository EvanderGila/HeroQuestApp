<template>
  <VContainer class="py-8">
    <VCard class="mb-6 border-thin bg-surface" elevation="2">
      <VCardText
        class="d-flex flex-column flex-sm-row justify-space-between align-center gap-4"
      >
        <div class="d-flex align-center">
          <VIcon icon="mdi-storefront" size="48" color="warning" class="me-4" />
          <div>
            <h1 class="text-h4 font-weight-black text-uppercase">
              La Forja del Alquimista
            </h1>
            <p class="text-subtitle-2 text-medium-emphasis mb-0">
              <VChip
                color="error"
                size="small"
                variant="flat"
                class="font-weight-bold me-2"
              >
                DM PANEL
              </VChip>
              Fase de preparación: Gestiona las compras para el inventario del grupo.
            </p>
          </div>
        </div>

        <VCard
          color="amber-darken-3"
          variant="flat"
          class="px-6 py-3 d-flex align-center rounded-lg"
        >
          <VIcon
            icon="mdi-coins"
            size="32"
            class="me-3 text-amber-lighten-4 animate-pulse"
          />
          <div>
            <div class="text-caption text-amber-lighten-4 font-weight-bold uppercase">
              Cofre del Grupo
            </div>
            <div class="text-h5 font-weight-black">
              {{ invStore.currentGold }}
              <span class="text-body-2">G</span>
            </div>
          </div>
        </VCard>
      </VCardText>
    </VCard>

    <div
      v-if="shopStore.isLoading || invStore.isLoading"
      class="d-flex justify-center align-center py-12"
    >
      <VProgressCircular indeterminate color="warning" size="64" />
    </div>

    <VRow v-else>
      <VCol cols="12" md="8">
        <h2 class="text-h5 font-weight-bold mb-4 d-flex align-center">
          <VIcon icon="mdi-shield-sword" class="me-2" color="primary" />
          Artículos Disponibles
        </h2>

        <VRow>
          <VCol v-for="item in shopStore.availableItems" :key="item.id" cols="12" sm="6">
            <VCard
              class="h-100 d-flex flex-column border-thin elevation-1"
              :disabled="item.stock <= 0"
            >
              <VImg
                :src="
                  item.items?.img || 'https://placehold.co/400x150?text=Objeto+Mítico'
                "
                crossorigin="anonymous"
                height="120"
                cover
                class="align-end text-white"
              >
                <div
                  class="w-100 px-4 py-2"
                  style="
                    background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
                  "
                >
                  <div
                    class="font-weight-bold text-h6 d-flex justify-space-between align-center"
                  >
                    {{ item.items?.name }}
                    <VChip
                      v-if="item.items?.reliq"
                      color="warning"
                      size="x-small"
                      variant="flat"
                    >
                      Reliquia
                    </VChip>
                  </div>
                </div>
              </VImg>

              <VCardText class="flex-grow-1 pt-3">
                <p class="text-body-2 text-medium-emphasis mb-3 italic">
                  "{{
                    item.items?.effect?.description ||
                    'Un objeto forjado con acero templado.'
                  }}"
                </p>

                <div class="d-flex flex-wrap gap-2 mb-2">
                  <VChip
                    v-if="item.items?.atk_mod"
                    color="red-lighten-5"
                    text-color="red"
                    size="small"
                    class="font-weight-bold"
                    prepend-icon="mdi-sword"
                  >
                    +{{ item.items.atk_mod }} ATK
                  </VChip>
                  <VChip
                    v-if="item.items?.def_mod"
                    color="blue-lighten-5"
                    text-color="blue"
                    size="small"
                    class="font-weight-bold"
                    prepend-icon="mdi-shield"
                  >
                    +{{ item.items.def_mod }} DEF
                  </VChip>
                  <VChip
                    v-if="item.items?.hp_mod"
                    color="green-lighten-5"
                    text-color="green"
                    size="small"
                    class="font-weight-bold"
                    prepend-icon="mdi-heart"
                  >
                    +{{ item.items.hp_mod }} PV
                  </VChip>
                  <VChip
                    v-if="item.items?.slot"
                    color="purple-lighten-5"
                    text-color="purple"
                    size="small"
                    class="font-weight-medium text-uppercase"
                  >
                    Slot: {{ item.items.slot }}
                  </VChip>
                </div>
              </VCardText>

              <VDivider />

              <VCardActions class="justify-space-between px-4 py-3 bg-grey-lighten-5">
                <div>
                  <div class="text-caption text-medium-emphasis">
                    Stock: {{ item.stock }} uds.
                  </div>
                  <div class="text-subtitle-1 font-weight-black text-amber-darken-4">
                    <VIcon icon="mdi-coins" size="18" class="me-1" />
                    {{ item.price }} G
                  </div>
                </div>

                <VBtn
                  color="warning"
                  variant="flat"
                  prepend-icon="mdi-cart-plus"
                  :disabled="item.stock <= 0 || invStore.currentGold < item.price"
                  @click="openBuyDialog(item)"
                >
                  {{ item.stock <= 0 ? 'Agotado' : 'Comprar' }}
                </VBtn>
              </VCardActions>
            </VCard>
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12" md="4">
        <h2 class="text-h5 font-weight-bold mb-4 d-flex align-center">
          <VIcon icon="mdi-treasure-chest" class="me-2" color="warning" />
          Mochila del Grupo
        </h2>

        <VCard class="border-thin elevation-2">
          <VList v-if="invStore.sharedInventory.length > 0" lines="two">
            <VListItem v-for="inv in invStore.sharedInventory" :key="inv.id" class="py-2">
              <template #prepend>
                <VAvatar color="grey-lighten-3" class="border-thin">
                  <VIcon
                    :icon="
                      inv.items?.type === 'equipment'
                        ? 'mdi-shield-account'
                        : 'mdi-bottle-tonic-plus'
                    "
                    color="secondary"
                  />
                </VAvatar>
              </template>

              <VListItemTitle class="font-weight-bold">
                {{ inv.items?.name }}
              </VListItemTitle>
              <VListItemSubtitle class="text-caption">
                Slot: {{ inv.items?.slot || 'Consumible' }}
              </VListItemSubtitle>

              <template #append>
                <VBadge
                  color="secondary"
                  :content="inv.quantity"
                  inline
                  class="font-weight-black"
                />
              </template>
            </VListItem>
          </VList>

          <VCardText v-else class="text-center py-8 text-medium-emphasis">
            <VIcon icon="mdi-package-variant" size="48" class="mb-2 text-disabled" />
            <p class="mb-0 text-body-2">
              El inventario común está vacío.
              <br />
              ¡Compra equipo para la aventura!
            </p>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <VDialog v-model="dialog" max-width="400px">
      <VCard class="border-thin">
        <VCardTitle class="text-h6 font-weight-bold pt-4 px-6">
          ¿Cuántas unidades quieres comprar?
        </VCardTitle>
        <VCardText class="px-6">
          <p class="text-subtitle-1 mb-4 font-weight-medium text-primary">
            {{ selectedItem?.items?.name }}
          </p>

          <VSlider
            v-model="quantityToBuy"
            :max="selectedItem?.stock"
            :min="1"
            step="1"
            thumb-label="always"
            color="warning"
            class="mt-6"
          />

          <div
            class="d-flex justify-space-between class text-body-1 bg-grey-lighten-4 pa-3 rounded-lg border-thin mt-2"
          >
            <span class="font-weight-medium">Coste total:</span>
            <span class="font-weight-black text-amber-darken-4">
              <VIcon icon="mdi-coins" class="me-1" />
              {{ (selectedItem?.price || 0) * quantityToBuy }} G
            </span>
          </div>
        </VCardText>

        <VCardActions class="px-6 pb-4 pt-2">
          <VSpacer />
          <VBtn variant="text" @click="dialog = false">Cancelar</VBtn>
          <VBtn
            color="warning"
            variant="flat"
            :disabled="invStore.currentGold < (selectedItem?.price || 0) * quantityToBuy"
            @click="confirmPurchase"
          >
            Confirmar Oro
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VContainer>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useShop } from '@/composables/useShop'
import { useShopStore } from '@/store/shopStore'
import { useInventoryStore } from '@/store/inventoryStore'

// Composables y Stores
const { loadShopData, buyItem } = useShop()
const shopStore = useShopStore()
const invStore = useInventoryStore()

// Estado local para el modal de cantidad
const dialog = ref(false)
const selectedItem = ref<any>(null)
const quantityToBuy = ref(1)

onMounted(async () => {
  await loadShopData()
})

function openBuyDialog(shopItem: any) {
  selectedItem.value = shopItem
  quantityToBuy.value = 1 // Resetear por defecto a 1
  dialog.value = true
}

async function confirmPurchase() {
  if (!selectedItem.value) return

  dialog.value = false
  await buyItem(selectedItem.value, quantityToBuy.value)
}
</script>

<style scoped>
.gap-4 {
  gap: 16px;
}
.italic {
  font-style: italic;
}
</style>
