<template>
    <div class="hq-header flex-shrink-0">
      <VImg
        :src="characterRace.img || 'https://placehold.co/800x300?text=HeroQuest'"
        height="100%"
        cover
        crossorigin="anonymous"
        class="align-end text-white"
      >
        <div class="bg-gradient-dark px-4 py-3 d-flex justify-space-between align-end">
          <div>
            <h2 class="text-h5 text-sm-h4 font-weight-black text-uppercase tracking-wide mb-0 text-white line-clamp-1">
              {{ character.name }}
            </h2>
            <div class="text-caption text-sm-subtitle-2 text-grey-lighten-2 font-weight-bold">
              {{ characterRace.name }} — {{ characterClass.name }}
            </div>
          </div>
          <VAvatar color="warning" size="48" class="elevation-3 border-thin font-weight-black text-subtitle-1 text-black flex-shrink-0">
            {{ character.lvl || 1 }}
          </VAvatar>
        </div>
      </VImg>
    </div>

    <div class="px-4 py-2 bg-grey-lighten-4 border-bottom-thin flex-shrink-0">
      <div class="d-flex justify-space-between hq-mini-text font-weight-bold mb-1">
        <span>EXPERIENCIA</span>
        <span>{{ character.current_xp || 0 }} / 1000 PX</span>
      </div>
      <VProgressLinear
        :model-value="calculateExpPercentage(character.current_xp)"
        color="warning"
        height="6"
        rounded
        striped
      />
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  character: any // Tu interfaz de personaje de Supabase
}>()

const characterClass = computed(() => props.character?.classes || {})
const characterRace = computed(() => props.character?.races || {})

function calculateExpPercentage(exp: number = 0) {
  return Math.min((exp / 1000) * 100, 100)
}
</script>
<style scoped>
/* Cabecera proporcional */
.hq-header {
  height: 130px;
}

/* Estilos de tipografía compacta HeroQuest */
.bg-gradient-dark {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.2) 100%);
  width: 100%;
}
.border-bottom-thin { border-bottom: 1px solid rgba(0, 0, 0, 0.08); }

.hq-mini-text {
  font-size: 0.7rem;
  letter-spacing: 0.05em;
}


.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}



</style>