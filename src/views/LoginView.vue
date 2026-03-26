<template>
  <VContainer fluid class="pa-0 d-flex align-center justify-center"  style="min-height: 100vh;">

    <VCard width="450" class="pa-8 elevation-12" color="grey-darken-4">
      <VCardTitle class="text-h4 text-center mb-6">HeroQuest Game</VCardTitle>
      
      <VForm @submit.prevent="handleLogin">
        <VTextField
          v-model="email"
          label="Email"
          type="email"
          prepend-inner-icon="mdi-email"
          variant="outlined"
        ></VTextField>

        <VTextField
          v-model="password"
          label="Contraseña"
          type="password"
          prepend-inner-icon="mdi-lock"
          variant="outlined"
        ></VTextField>

        <VAlert
          v-if="authStore.authError"
          type="error"
          variant="tonal"
          class="mb-4"
        >
          {{ authStore.authError }}
        </VAlert>

        <VBtn
          block
          color="deep-purple-accent-4"
          size="large"
          type="submit"
          :loading="authStore.isLoading"
          append-icon="mdi-sword"
        >
          Entrar al juego
        </VBtn>
      </VForm>
    </VCard>
  </VContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/store/authStore'
import { useAuth } from '@/composables/useAuth'

const { login } = useAuth()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const handleLogin = () => {
  login(email.value, password.value)
}
</script>