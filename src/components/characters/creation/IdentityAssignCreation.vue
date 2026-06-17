<template>
  <div class="pa-2 pa-sm-3">
    <!-- Encabezado compacto -->
    <div class="text-center mb-4">
      <h3 class="text-h6 font-weight-black text-uppercase text-high-emphasis lh-tight">Bautiza a tu Héroe</h3>
      <p class="text-caption text-medium-emphasis mb-0">Dale un nombre legendario y elige su aspecto visual.</p>
    </div>

    <VRow justify="center">
      <VCol cols="12" md="10">
        <!-- 📝 Campo de Nombre Estilizado -->
        <VTextField
          v-model="inputName"
          label="Nombre del Personaje"
          placeholder="Ej. Ragnar Barba de Hierro, Elora Vientoazul..."
          variant="outlined"
          color="warning"
          bg-color="grey-darken-4"
          class="mb-4 rounded-lg"
          hide-details
          prepend-inner-icon="mdi-shield-account"
        />

        <!-- 🖼️ Selector de Avatares -->
        <div class="bg-grey-darken-4 border-thin pa-3 rounded-xl">
          <div class="text-caption font-weight-bold text-uppercase text-warning mb-3 tracking-wide d-flex justify-space-between align-center">
            <span>Selecciona un Retrato de Stock</span>
            <VBtn size="x-small" color="secondary" prepend-icon="mdi-upload" variant="tonal" disabled>
              Subir Propia (Próximamente)
            </VBtn>
          </div>

          <!-- Rejilla de Avatares -->
          <VRow dense>
            <VCol v-for="url in stockAvatars" :key="url" cols="4" sm="3" md="2" class="pa-1">
              <VCard
                clickable
                @click="setImage(url)"
                :class="draft.img === url ? 'border-warning-heavy elevation-8 scale-active' : 'opacity-70'"
                class="bg-grey-darken-3 rounded-lg overflow-hidden cursor-pointer transition-all"
                variant="flat"
              >
                <VImg :src="url" height="90" cover />
              </VCard>
            </VCol>
          </VRow>
        </div>
      </VCol>
    </VRow>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCharacterCreation } from '@/composables/useCharacterCreation'

const { draft, setName, setImage, nextStep, previousStep, canContinue } = useCharacterCreation()

// Proxy reactivo para sincronizar el input del nombre con tu action del composable
const inputName = computed({
  get: () => draft.value.name,
  set: (val: string) => setName(val)
})

// Lista temporal de imágenes de stock (reemplázalas por las tuyas del juego)
const stockAvatars = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
]
</script>

<style scoped>
.transition-all {
  transition: all 0.2s ease-in-out;
}
.opacity-70 {
  opacity: 0.6;
}
.opacity-70:hover {
  opacity: 1;
}
.border-warning-heavy {
  border: 3px solid #ffb300 !important;
}
.scale-active {
  transform: scale(1.03);
}
</style>