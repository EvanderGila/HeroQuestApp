<template>
  <VAppBar 
    elevation="0" 
    scroll-behavior="hide" 
    scroll-threshold="5"
    class="hq-main-navbar px-6"
    height="65"
  >
    <div class="hq-navbar-noise"></div>

    <RouterLink to="/" class="d-flex align-center text-decoration-none hq-brand-link">
      <div class="hq-logo-wrapper me-3">
        <div class="hq-logo-pulse-glow"></div>
        <div class="hq-logo-box">
          <VIcon icon="mdi-shield-crown" color="primary" size="22" class="hq-logo-icon" />
        </div>
      </div>
      <VAppBarTitle class="hq-brand-text font-weight-black tracking-widest">
        HERO<span class="hq-brand-text-glow">QUEST</span>
      </VAppBarTitle>
    </RouterLink>

    <VSpacer />

    <div class="d-flex align-center gap-x-4">
      
      <div v-if="user?.profile?.nickname" class="hq-player-display d-flex align-center me-2">
        <div class="hq-status-indicator mr-2">
          <span class="hq-status-ping"></span>
          <span class="hq-status-dot"></span>
        </div>
        <span class="hq-player-name text-xxs font-weight-bold text-uppercase tracking-wider">
          {{ user.profile.nickname }}
        </span>
      </div>

      <div class="nav-items-container d-flex gap-x-1 align-center">
        <VBtn
          v-for="(item, index) in items"
          :key="index"
          :to="item.to"
          variant="text"
          class="hq-nav-btn px-4 text-caption font-weight-bold text-uppercase tracking-wider rounded-lg"
          :ripple="false"
          @click="item.action && item.action()"
        >
          <template #prepend>
            <VIcon :color="item.color || 'primary'" size="16" class="hq-nav-icon me-1">
              {{ item.icon }}
            </VIcon>
          </template>
          <span class="hq-nav-text text-grey-lighten-1">{{ item.text }}</span>
        </VBtn>
        </div>

    </div>
  </VAppBar>
</template>

<script setup>
// === PROPS & EMITS ===
defineProps({
  items: {
    type: Array,
    required: true
  },
  user: {
    type: Object,
    required: true,
  }
})
</script>

<style scoped>
.text-xxs { font-size: 0.75rem !important; }
.tracking-widest { letter-spacing: 0.18em !important; }
.tracking-wider { letter-spacing: 0.08em !important; }
.gap-x-1 { column-gap: 6px !important; }
.gap-x-4 { column-gap: 16px !important; }

/* ── 🌌 BARRA DE NAVEGACIÓN BASE ── */
.hq-main-navbar {
  background: linear-gradient(180deg, rgba(10, 14, 24, 0.94) 0%, rgba(5, 6, 8, 0.98) 100%) !important;
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(33, 150, 243, 0.15) !important;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.5) !important;
  position: relative;
}

.hq-navbar-noise {
  position: absolute;
  inset: 0;
  opacity: 0.015;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

/* ── 👑 LOGO HIPER-LLAMATIVO ── */
.hq-logo-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* Aura circular trasera latiendo */
.hq-logo-pulse-glow {
  position: absolute;
  width: 32px;
  height: 32px;
  background: radial-gradient(circle, rgba(33, 150, 243, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  animation: logoPulse 2.5s infinite ease-in-out;
}
/* Marco del icono */
.hq-logo-box {
  position: relative;
  z-index: 2;
  width: 34px;
  height: 34px;
  background: rgba(33, 150, 243, 0.05);
  border: 1px solid rgba(33, 150, 243, 0.3);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 8px rgba(33, 150, 243, 0.2);
}
.hq-logo-icon {
  filter: drop-shadow(0 0 4px rgba(33, 150, 243, 0.6));
}
/* Texto con degradado metálico */
.hq-brand-text {
  font-size: 1.05rem !important;
  background: linear-gradient(180deg, #ffffff 40%, #b0bec5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hq-brand-text-glow {
  background: linear-gradient(180deg, #90caf9 40%, #2196f3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 6px rgba(33, 150, 243, 0.5));
}

/* ── 🪪 DISPLAY DE USUARIO DISCRETO ── */
.hq-player-display {
  cursor: default;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}
.hq-player-display:hover {
  background-color: rgba(255, 255, 255, 0.03);
}
.hq-player-display:hover .hq-player-name {
  color: #ffffff;
}
.hq-player-name {
  color: rgba(255, 255, 255, 0.4); /* Apagado por defecto */
  transition: color 0.2s ease;
}
/* Luces de estado de red fijas */
.hq-status-indicator {
  position: relative;
  display: flex;
  width: 6px;
  height: 6px;
}
.hq-status-dot {
  position: relative;
  width: 6px;
  height: 6px;
  background-color: #00e5ff;
  border-radius: 50%;
}
.hq-status-ping {
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: #00e5ff;
  border-radius: 50%;
  animation: statusPing 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
  opacity: 0.6;
}

/* ── 🗺️ BOTONES DEL MENÚ ── */
.hq-nav-btn {
  height: 36px !important;
  transition: all 0.2s ease-in-out !important;
  border: 1px solid transparent;
}
.hq-nav-btn:hover {
  background-color: rgba(33, 150, 243, 0.04) !important;
  border-color: rgba(33, 150, 243, 0.15) !important;
}
.hq-nav-btn:hover .hq-nav-text { color: #ffffff !important; }
.hq-nav-btn.v-btn--active {
  background-color: rgba(33, 150, 243, 0.08) !important;
  border-color: rgba(33, 150, 243, 0.3) !important;
}
.hq-nav-btn.v-btn--active .hq-nav-text { color: #ffffff !important; font-weight: 800 !important; }

/* ── 🚪 BOTÓN LOGOUT SUTIL/CRIMSON ── */
.hq-logout-btn {
  color: rgba(255, 255, 255, 0.3) !important;
  transition: all 0.25s ease !important;
  width: 36px !important;
  height: 36px !important;
}
.hq-logout-btn:hover {
  color: #ff5252 !important; /* Rojo sutil en hover */
  background-color: rgba(255, 82, 82, 0.08) !important;
  box-shadow: 0 0 12px rgba(255, 82, 82, 0.2) !important;
}

/* 🎭 ANIMACIONES MÍSTICAS */
@keyframes logoPulse {
  0%, 100% { transform: scale(0.9); opacity: 0.4; }
  50% { transform: scale(1.2); opacity: 0.9; filter: blur(1px); }
}
@keyframes statusPing {
  0% { transform: scale(1); opacity: 0.8; }
  70%, 100% { transform: scale(2.5); opacity: 0; }
}
</style>