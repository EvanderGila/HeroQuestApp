<template>
  <VContainer v-if="authStore.isLoading" class="fill-height d-flex align-center justify-center">
    <VProgressCircular indeterminate color="primary" size="64" />
  </VContainer>

  <template v-else-if="authStore.user">
    <DefaultNavbar :items="navItems" :user="authStore.user" />
    <VMain>
      <VContainer fluid class="pa-0">
        <slot /> 
      </VContainer>
    </VMain>
  </template>

  <VContainer v-else class="fill-height d-flex flex-column align-center justify-center">
    <p class="mb-4">No se ha podido cargar la sesión o ha expirado.</p>
    <VBtn color="primary" to="/login">Ir al Login</VBtn>
  </VContainer>
</template>
<script setup>
import { useAuthStore } from '@/store/authStore'
import { useAuth } from '@/composables/useAuth'
import DefaultNavbar from '@/components/common/DefaultNavbar.vue'

const authStore = useAuthStore()
const { logout } = useAuth()

// Array de elementos a introducir en el navbar
const navItems = [
  { text: 'Logout', icon: 'mdi-logout', color: 'error', action: logout},
]

</script>