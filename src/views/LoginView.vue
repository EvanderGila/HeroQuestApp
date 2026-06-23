<template>
  <!-- 🌌 Contenedor Principal con patrón de micro-ruido RPG de fondo -->
  <VContainer
    fluid
    class="pa-0 d-flex align-center justify-center hq-login-page"
    style="min-height: 100vh"
  >
    <div class="hq-noise-overlay"></div>

    <!-- ✨ Orbes de luminiscencia ambiental profunda (Fusión Azul Arcana) -->
    <div class="hq-glow-orb hq-orb-blue-deep"></div>
    <div class="hq-glow-orb hq-orb-cyan-electric"></div>

    <!-- 🪪 Tarjeta de Login Premium con Borde de Energía Activa Celesta -->
    <div class="hq-login-card-wrapper w-100">
      <VCard
        max-width="430"
        class="pa-9 rounded-xl hq-login-card text-white"
        variant="flat"
      >
        <!-- 👑 Cabecera Monumental con Destellos Arcanos -->
        <div class="text-center mb-8 relative-container">
          <h1
            class="text-h3 font-weight-black text-uppercase tracking-widest text-white hq-game-title"
          >
            HeroQuest
          </h1>

          <!-- Separador de Líneas con Runa/Gema Central Azul -->
          <div class="hq-rune-separator my-3">
            <div class="hq-rune-line left"></div>
            <VIcon
              icon="mdi-rhombus-medium"
              size="14"
              class="text-warning hq-rune-icon"
            />
            <div class="hq-rune-line right"></div>
          </div>

          <span
            class="text-xxs font-weight-bold text-uppercase tracking-widest text-blue-lighten-3 opacity-60 block-span"
          >
            — Edición de Forja v1.0 —
          </span>
        </div>

        <!-- 📝 Formulario con Micro-Interacciones -->
        <VForm @submit.prevent="handleLogin">
          <!-- Input Email -->
          <div class="hq-input-wrapper mb-4">
            <label class="hq-input-label">Email</label>
            <VTextField
              v-model="email"
              type="email"
              prepend-inner-icon="mdi-shield-account-outline"
              variant="outlined"
              color="primary"
              class="hq-custom-input"
              density="comfortable"
              placeholder="nombre@email.com"
              hide-details="auto"
            ></VTextField>
          </div>

          <!-- Input Contraseña -->
          <div class="hq-input-wrapper mb-6">
            <label class="hq-input-label">Contraseña</label>
            <VTextField
              v-model="password"
              type="password"
              prepend-inner-icon="mdi-key"
              variant="outlined"
              color="primary"
              class="hq-custom-input"
              density="comfortable"
              placeholder="••••••••"
              hide-details="auto"
            ></VTextField>
          </div>

          <!-- ⚠️ Alerta de Error de la Mazmorra -->
          <VAlert
            v-if="authStore.authError"
            type="error"
            variant="tonal"
            density="compact"
            class="mb-5 rounded-lg text-caption font-weight-medium border-thin hq-alert-error animate-shake"
          >
            <template #prepend>
              <VIcon icon="mdi-skull-crossbones" size="16" class="mr-2" />
            </template>
            {{ authStore.authError }}
          </VAlert>

          <!-- ⚔️ Botón de Acción Forjado en Energía Azul Espectral -->
          <VBtn
            block
            size="large"
            type="submit"
            color="primary"
            :loading="authStore.isLoading"
            class="font-weight-black text-uppercase tracking-widest rounded-lg hq-btn-epic"
          >
            <span class="d-flex align-center justify-center gap-x-2">
              Iniciar Gesta
              <VIcon icon="mdi-sword" size="16" class="hq-sword-icon" />
            </span>
          </VBtn>
        </VForm>
      </VCard>
    </div>
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

<style scoped>
.text-xxs {
  font-size: 0.6rem !important;
}

.tracking-widest {
  letter-spacing: 0.2em !important;
}

.block-span {
  display: block;
}

/* ── 🌌 FONDO RADIAL CON MEZCLA AZUL PROFUNDO ── */
.hq-login-page {
  background: radial-gradient(circle at 50% 40%, #0d162d 0%, #04060a 85%) !important;
  position: relative;
  overflow: hidden;
}

/* Micro-ruido sutil transparente */
.hq-noise-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.02;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

/* ✨ ORBES DE LUMINISCENCIA AZULES Y CIANES (Magia de Escarcha) */
.hq-glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(140px);
  pointer-events: none;
  z-index: 0;
  animation: orbPulse 8s infinite alternate ease-in-out;
}

.hq-orb-blue-deep {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgb(33 150 243 / 15%) 0%, rgb(0 0 0 / 0%) 70%);
  top: 10%;
  left: 15%;
}

.hq-orb-cyan-electric {
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgb(0 229 255 / 8%) 0%, rgb(0 0 0 / 0%) 70%);
  bottom: 10%;
  right: 15%;
  animation-delay: -4s;
}

/* 🪪 BORDE DE ENERGÍA DEGRADADO (Estilo Cristal Helado) */
.hq-login-card-wrapper {
  position: relative;
  padding: 1px;
  border-radius: 24px;
  background: linear-gradient(
    135deg,
    rgb(255 255 255 / 10%) 0%,
    rgb(33 150 243 / 25%) 40%,
    rgb(0 229 255 / 15%) 70%,
    rgb(255 255 255 / 2%) 100%
  );
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 80%);
  z-index: 1;
  max-width: 430px;
  margin: 0 16px; /* Evita que choque contra los bordes físicos del móvil */
}

/* 🪪 TARJETA INTERNA: Cristal de Obsidiana con reflejos azulados */
.hq-login-card {
  background: linear-gradient(
    180deg,
    rgb(10 14 24 / 90%) 0%,
    rgb(6 7 10 / 96%) 100%
  ) !important;
  backdrop-filter: blur(20px);
  box-shadow: inset 0 1px 1px rgb(255 255 255 / 5%) !important;
}

/* 👑 TÍTULO HEROQUEST CON EFECTO FILO MÁGICO AZUL/BLANCO */
.hq-game-title {
  background: linear-gradient(180deg, #fff 40%, #90caf9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 8px rgb(33 150 243 / 30%));
}

/* 🏛️ SEPARADOR RÚNICO AZUL CRISTAL */
.hq-rune-separator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.hq-rune-line {
  height: 1px;
  flex-grow: 1;
}

.hq-rune-line.left {
  background: linear-gradient(to right, transparent, rgb(243 212 33 / 40%));
}

.hq-rune-line.right {
  background: linear-gradient(to left, transparent, rgb(243 212 33 / 40%));
}

.hq-rune-icon {
  margin: 0 10px;
  filter: drop-shadow(0 0 4px rgb(243 212 33 / 60%));
  animation: runeGlow 3s infinite ease-in-out;
}

/* 📝 ESTRUCTURA DE INPUT CON LABELS AZULADAS */
.hq-input-wrapper {
  display: flex;
  flex-direction: column;
}

.hq-input-label {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgb(144 202 249 / 60%); /* Azul suave text-disabled */
  margin-bottom: 6px;
  padding-left: 2px;
}

:deep(.hq-custom-input .v-field) {
  background-color: rgb(0 0 0 / 35%) !important;
  border-radius: 10px !important;
  transition: all 0.2s ease-in-out;
}

:deep(.hq-custom-input .v-field__outline) {
  --v-field-border-color: rgb(255 255 255 / 5%) !important;
}

:deep(.hq-custom-input .v-field--focused) {
  box-shadow: 0 0 15px rgb(33 150 243 / 15%) !important;
  background-color: rgb(0 0 0 / 45%) !important;
}

:deep(.hq-custom-input .v-field--focused .v-field__outline) {
  --v-field-border-color: rgb(33 150 243 / 40%) !important;
}

/* ⚠️ ALERTA CON BORDE EMBOSADO */
.hq-alert-error {
  border-color: rgb(244 67 54 / 30%) !important;
  background-color: rgb(244 67 54 / 6%) !important;
  color: #ff8a80 !important;
}

/* ⚔️ BOTÓN ÉPICO: Forjado en la paleta de azul primario nativo */
.hq-btn-epic {
  border: 1px solid rgb(255 255 255 / 8%) !important;
  box-shadow:
    0 4px 15px rgb(var(--v-theme-primary), 0.35),
    inset 0 1px 0 rgb(255 255 255 / 15%) !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
}

.hq-btn-epic:hover {
  box-shadow: 0 0 25px rgb(var(--v-theme-primary), 0.5) !important;
  transform: translateY(-2px);
}

.hq-btn-epic:hover .hq-sword-icon {
  transform: rotate(15deg) scale(1.1);
}

.hq-sword-icon {
  transition: transform 0.2s ease;
}

/* 🎭 ANIMACIONES MÍSTICAS */
@keyframes orbPulse {
  0% {
    transform: scale(1) translate(0, 0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1.1) translate(15px, -10px);
    opacity: 0.16;
  }
}

@keyframes runeGlow {
  0%,
  100% {
    opacity: 0.6;
    filter: drop-shadow(0 0 2px rgb(243 194 33 / 40%));
  }

  50% {
    opacity: 1;
    filter: drop-shadow(0 0 8px rgb(255 230 0 / 70%));
  }
}

.animate-shake {
  animation: shake 0.4s ease-in-out;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }

  20%,
  60% {
    transform: translateX(-4px);
  }

  40%,
  80% {
    transform: translateX(4px);
  }
}
</style>
