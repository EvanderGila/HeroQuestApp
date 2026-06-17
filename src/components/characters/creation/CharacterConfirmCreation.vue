<template>
  <div class="pa-4 text-center">
    <!-- Icono de Advertencia Solemne -->
    <VIcon 
      icon="mdi-alert-decagram" 
      color="warning" 
      size="64" 
      class="mb-3 animate-pulse" 
    />

    <!-- Título y Advertencia -->
    <h3 class="text-h6 font-weight-black text-uppercase text-high-emphasis lh-tight mb-2">
      ¿Todo listo para la aventura?
    </h3>
    
    <VRow justify="center" no-gutters class="mb-4">
      <VCol cols="12" sm="8" md="6">
        <p class="text-body-2 text-medium-emphasis mb-4">
          Estás a punto de inscribir a <span class="text-warning font-weight-bold">{{ draft.name || 'tu héroe' }}</span> en las crónicas. 
        </p>
        
        <!-- Bloque de Advertencia Destacado -->
        <div class="bg-grey-darken-4 border-thin pa-3 rounded-xl text-left border-warning-subtle">
          <div class="d-flex align-start gap-x-2">
            <VIcon icon="mdi-gavel" color="warning" size="18" class="mt-0.5" />
            <div>
              <div class="text-caption font-weight-bold text-uppercase text-warning tracking-wide mb-1">
                Juramento del Héroe
              </div>
              <p class="text-caption text-grey-lighten-1 mb-0 lh-base">
                Una vez forjado el personaje, sus rasgos biológicos, entrenamiento e identidad básica quedarán grabados en la piedra. <strong>No podrás modificar estos datos en el futuro</strong>. Solo la experiencia y el botín moldearán su destino a partir de aquí.
              </p>
            </div>
          </div>
        </div>
      </VCol>
    </VRow>

    <VDivider class="my-4" />

    <!-- Botonera de Decisiones -->
    <div class="d-flex justify-space-between align-center mt-2">
      <VBtn 
        variant="text" 
        color="grey-lighten-1" 
        prepend-icon="mdi-arrow-left" 
        class="font-weight-bold" 
        @click="previousStep"
      >
        Revisar Pasos
      </VBtn>
      
      <VBtn 
        color="success" 
        append-icon="mdi-anvil" 
        class="font-weight-bold px-6 elevation-4" 
        @click="$emit('save')"
      >
        Forjar Personaje
      </VBtn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterCreation } from '@/composables/useCharacterCreation'

defineEmits<{
  (e: 'save'): void
}>()

const { draft, previousStep } = useCharacterCreation()
</script>

<style scoped>
.lh-tight {
  line-height: 1.2;
}
.lh-base {
  line-height: 1.4;
}
.gap-x-2 {
  column-gap: 8px !important;
}
.border-warning-subtle {
  border-color: rgba(255, 179, 0, 0.2) !important;
}
/* Efecto de pulso místico para el icono de confirmación */
.animate-pulse {
  animation: pulse 2s infinite ease-in-out;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.05); opacity: 1; }
}
</style>