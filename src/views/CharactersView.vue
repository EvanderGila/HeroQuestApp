<template>
  <VContainer class="py-8">
    <div class="d-flex justify-between align-center mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold">Tus Héroes</h1>
        <p class="text-subtitle-1 text-medium-emphasis">
          Bienvenido de vuelta, {{ authStore.user?.profile?.nickname || 'Explorador' }}
        </p>
      </div>
    </div>

    <div v-if="charStore.isLoading" class="d-flex justify-center align-center py-12">
      <VProgressCircular indeterminate color="primary" size="64" />
    </div>

    <VRow v-else>
      <VCol cols="12" sm="6" md="4" lg="3">
        <VCard
          variant="dashed"
          color="primary"
          class="d-flex flex-column align-center justify-center fill-height min-card-height custom-create-btn"
          @click="goToCharacterCreator"
        >
          <VIcon icon="mdi-plus-circle-outline" size="48" class="mb-2" />
          <span class="text-button font-weight-bold">Crear Personaje</span>
        </VCard>
      </VCol>

      <VCol 
        v-for="character in charStore.myCharacters" 
        :key="character.id" 
        cols="12" 
        sm="6" 
        md="4" 
        lg="3"
      >
        <VCard class="fill-height d-flex flex-column border-thin elevation-2">
          <VImg
            :src="character.races?.img || 'https://placehold.co/400x200?text=HeroQuest'"
            height="160"
            cover
            class="align-end text-white"
          >
            <VCardTitle class="bg-gradient-dark font-weight-bold">
              {{ character.name }}
            </VCardTitle>
          </VImg>

          <VCardSubtitle class="pt-3 font-weight-medium text-primary">
            Nivel {{ character.lvl }} — {{ character.races?.name }} {{ character.classes?.name }}
          </VCardSubtitle>

          <VCardText class="flex-grow-1">
            <div class="d-flex justify-space-between mb-1">
              <span><VIcon icon="mdi-heart" color="red" size="18" class="me-1"/> Vida:</span>
              <span class="font-weight-bold">{{ character.hp }}</span>
            </div>
            <div class="d-flex justify-space-between mb-1">
              <span><VIcon icon="mdi-sword" color="orange" size="18" class="me-1"/> Ataque:</span>
              <span class="font-weight-bold">{{ character.atk }}</span>
            </div>
            <div class="d-flex justify-space-between">
              <span><VIcon icon="mdi-shield" color="blue" size="18" class="me-1"/> Defensa:</span>
              <span class="font-weight-bold">{{ character.def }}</span>
            </div>
          </VCardText>

          <VDivider />

          <VCardActions>
            <VBtn color="primary" variant="text" block prepend-icon="mdi-eye">
              Ver Ficha
            </VBtn>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authStore'
import { useCharacterStore } from '@/store/characterStore'
import { useCharacters } from '@/composables/useCharacters'

const router = useRouter()
const charStore = useCharacterStore()
const authStore = useAuthStore()
const { loadCreationData, fetchUserCharacters } = useCharacters()

onMounted(async () => {
  if (authStore.user?.id) {
    // Cargamos catálogos y luego sus personajes específicos usando el id correcto
    await Promise.all([
      loadCreationData(),
      fetchUserCharacters(authStore.user.id)
    ])
  }
})

function goToCharacterCreator() {
  // Aquí es a donde navegará en el futuro cuando implementes la creación
  console.log('Navegando al creador de personajes...')
  // router.push('/characters/create')
}
</script>

<style scoped>
.min-card-height {
  min-height: 290px;
}
.custom-create-btn {
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.custom-create-btn:hover {
  background-color: rgba(var(--v-theme-primary), 0.05);
}
.bg-gradient-dark {
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
  width: 100%;
}
</style>