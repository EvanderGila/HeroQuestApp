<template>
  <VApp>
    <component :is="layoutComponent" v-if="layoutComponent">
      <RouterView v-slot="{ Component }">
        <!-- <SnackbarDisplay /> -->
        <Suspense>
          <div>
            <component :is="Component" />
          </div>
        </Suspense>
      </RouterView>
    </component>
  </VApp>
</template>

<script setup lang="ts">
import { shallowRef, defineAsyncComponent, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authStore'
import { useAuth } from './composables/useAuth'
import supabase from '@/lib/supabase'


// === STATE ===
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const { initAuth } = useAuth()

onMounted(() => {
  initAuth()
})

// Tipamos el shallowRef para componentes de Vue
const layoutComponent = shallowRef()

// === LÓGICA DE SESIÓN (PERSISTENCIA) ===

// === WATCHERS ===

// Manejo de Layouts dinámicos
watch(
  () => route.meta.layout,
  (layoutName) => {
    const name = (layoutName as string) || 'Default'
    layoutComponent.value = defineAsyncComponent(() =>
      import(`@/components/layouts/${name}Layout.vue`)
    )
  },
  { immediate: true }
)

</script>