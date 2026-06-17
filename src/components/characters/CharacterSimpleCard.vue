<template>
  <VCard class="fill-height d-flex flex-column border-thin elevation-2 character-card">
    <VImg
      :src="character.races?.img || 'https://placehold.co/400x200?text=HeroQuest'"
      height="160"
      cover
      crossorigin="anonymous"
      class="align-end text-white"
    >
      <div class="bg-gradient-dark font-weight-bold text-h5 px-4 py-2">
        {{ character.name }}
      </div>
    </VImg>

    <VCardSubtitle class="pt-4 font-weight-bold text-primary text-uppercase letter-spacing-wide">
      Nivel {{ character.lvl || 1 }} — {{ character.races?.name }} {{ character.classes?.name }}
    </VCardSubtitle>

    <VCardText class="flex-grow-1 pt-2">
      <VRow dense>
        <VCol cols="6">
          <div class="d-flex align-center mb-2">
            <VIcon icon="mdi-heart" color="red" class="me-2" size="20" />
            <div>
              <div class="text-caption text-medium-emphasis lh-1">Vida</div>
              <div class="font-weight-black text-body-1">{{ character.hp }}</div>
            </div>
          </div>
        </VCol>
        
        <VCol cols="6">
          <div class="d-flex align-center mb-2">
            <VIcon icon="mdi-brain" color="deep-purple" class="me-2" size="20" />
            <div>
              <div class="text-caption text-medium-emphasis lh-1">Mente</div>
              <div class="font-weight-black text-body-1">{{ character.mp || 0 }}</div>
            </div>
          </div>
        </VCol>

        <VCol cols="6">
          <div class="d-flex align-center">
            <VIcon icon="mdi-sword" color="orange-darken-2" class="me-2" size="20" />
            <div>
              <div class="text-caption text-medium-emphasis lh-1">Ataque</div>
              <div class="font-weight-black text-body-1">{{ character.atk }}</div>
            </div>
          </div>
        </VCol>

        <VCol cols="6">
          <div class="d-flex align-center">
            <VIcon icon="mdi-shield" color="blue-darken-2" class="me-2" size="20" />
            <div>
              <div class="text-caption text-medium-emphasis lh-1">Defensa</div>
              <div class="font-weight-black text-body-1">{{ character.def }}</div>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>

    <VDivider />

    <VCardActions class="pa-3 bg-grey-lighten-5">
      <VBtn 
        color="primary" 
        variant="text" 
        block 
        prepend-icon="mdi-eye-circle"
        @click="$emit('inspect', character)"
      >
        Ver Ficha Completa
      </VBtn>
    </VCardActions>
  </VCard>
</template>

<script setup lang="ts">
import type { Character } from '@/types/character'

// Definimos las Props tipadas que recibirá de la vista madre
defineProps<{
  character: Character
}>()

// Definimos los eventos que la tarjeta puede disparar hacia afuera
defineEmits<{
  (e: 'inspect', character: Character): void
}>()
</script>

<style scoped>
.character-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.character-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1) !important;
}
.bg-gradient-dark {
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%);
  width: 100%;
}
.lh-1 {
  line-height: 1;
}
.letter-spacing-wide {
  letter-spacing: 0.05em;
}
</style>