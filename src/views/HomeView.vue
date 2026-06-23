<template>
  <VContainer
    class="fill-height d-flex align-center justify-center py-8 position-relative"
  >
    <div class="menu-container text-center w-100" style="max-width: 900px; z-index: 2">
      <!-- 🏰 Encabezado Místico (Mismo estilo que el Logo) -->
      <div class="hq-home-header mb-8 animate-fade-in">
        <div class="hq-header-logo-wrapper mb-3 mx-auto">
          <div class="hq-header-pulse-glow"></div>
          <div class="hq-header-logo-box">
            <VIcon
              icon="mdi-shield-crown"
              color="primary"
              size="36"
              class="hq-header-icon"
            />
          </div>
        </div>
        <h1
          class="text-h3 font-weight-black mb-2 text-uppercase tracking-widest hq-main-title"
        >
          Tablero del
          <span class="hq-title-glow">Héroe</span>
        </h1>
        <p class="text-subtitle-1 hq-subtitle text-grey-md mb-0">
          Prepara tu equipo, consulta tus estadísticas y adéntrate en la mazmorra.
        </p>
      </div>

      <!-- ⚔️ Rejilla de Opciones del Menú Principal (Estilo Celdas RPG de Obsidiana) -->
      <VRow class="gap-y-4">
        <!-- OPCIÓN 1: EMPEZAR PARTIDA -->
        <VCol cols="12" sm="6">
          <div
            class="py-6 px-4 h-100 d-flex flex-column align-center justify-center hq-rpg-card border-thin hq-card-combat"
            @click="actionNotImplemented('Iniciar Partida')"
          >
            <div class="hq-navbar-noise"></div>
            <div class="hq-icon-frame mb-3 color-combat">
              <VIcon icon="mdi-sword-cross" size="32" />
            </div>
            <div class="text-center card-content">
              <h2 class="hq-card-title text-h6 font-weight-bold mb-1">
                Iniciar / Unirse a Partida
              </h2>
              <p class="hq-card-subtitle text-wrap mb-0 text-body-2">
                Entra en la mazmorra en vivo y enfréntate a los desafíos de Morcar.
              </p>
            </div>
          </div>
        </VCol>

        <!-- OPCIÓN 2: TUS PERSONAJES -->
        <VCol cols="12" sm="6">
          <RouterLink
            to="/characters"
            class="text-decoration-none d-block h-100"
            prefetch="false"
          >
            <div
              class="py-6 px-4 h-100 d-flex flex-column align-center justify-center hq-rpg-card border-thin hq-card-primary"
            >
              <div class="hq-navbar-noise"></div>
              <div class="hq-icon-frame mb-3 color-primary">
                <VIcon icon="mdi-account-group" size="32" />
              </div>
              <div class="text-center card-content">
                <h2 class="hq-card-title text-h6 font-weight-bold mb-1">
                  Mis Personajes
                </h2>
                <p class="hq-card-subtitle text-wrap mb-0 text-body-2">
                  Gestiona tus fichas de héroe, sube de nivel y mira tus atributos reales.
                </p>
              </div>
            </div>
          </RouterLink>
        </VCol>

        <!-- OPCIÓN 3: TIENDA DE OBJETOS -->
        <VCol cols="12" sm="6">
          <RouterLink to="/shop" class="text-decoration-none d-block h-100">
            <div
              class="py-6 px-4 h-100 d-flex flex-column align-center justify-center hq-rpg-card border-thin hq-card-warning"
            >
              <div class="hq-navbar-noise"></div>
              <div class="hq-icon-frame mb-3 color-warning">
                <VIcon icon="mdi-treasure-chest" size="32" />
              </div>
              <div class="text-center card-content">
                <h2 class="hq-card-title text-h6 font-weight-bold mb-1">
                  Tienda de Alquimista
                </h2>
                <p class="hq-card-subtitle text-wrap mb-0 text-body-2">
                  Gasta tus monedas de oro en armas, armaduras y pociones de curación.
                </p>
              </div>
            </div>
          </RouterLink>
        </VCol>

        <!-- OPCIÓN 4: COMPENDIO / REGISTRO -->
        <VCol cols="12" sm="6">
          <RouterLink to="/compendium" class="text-decoration-none d-block h-100">
            <div
              class="py-6 px-4 h-100 d-flex flex-column align-center justify-center hq-rpg-card border-thin hq-card-info"
            >
              <div class="hq-navbar-noise"></div>
              <div class="hq-icon-frame mb-3 color-info">
                <VIcon icon="mdi-book-open-page-variant" size="32" />
              </div>
              <div class="text-center card-content">
                <h2 class="hq-card-title text-h6 font-weight-bold mb-1">
                  Compendio y Registro
                </h2>
                <p class="hq-card-subtitle text-wrap mb-0 text-body-2">
                  Consulta el bestiario, el listado de hechizos elementales y artefactos
                  míticos.
                </p>
              </div>
            </div>
          </RouterLink>
        </VCol>
      </VRow>

      <!-- 📜 Pie de Página Sutil -->
      <div class="mt-12 hq-footer-text text-uppercase tracking-wider">
        HeroQuest Alpha — Versión de desarrollo
      </div>
    </div>
  </VContainer>
</template>
<script setup lang="ts">
function actionNotImplemented(menuName: string) {
  console.log(
    `[Menú] Se ha hecho clic en "${menuName}", pero el módulo aún está en desarrollo.`
  )
}
</script>

<style scoped>
.tracking-widest {
  letter-spacing: 0.16em !important;
}
.tracking-wider {
  letter-spacing: 0.1em !important;
}
.text-grey-md {
  color: rgba(255, 255, 255, 0.5);
}

/* ── 👑 ENCABEZADO ESTILO PREMIUM ── */
.hq-header-logo-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
}
.hq-header-pulse-glow {
  position: absolute;
  width: 50px;
  height: 50px;
  background: radial-gradient(circle, rgba(33, 150, 243, 0.35) 0%, transparent 70%);
  border-radius: 50%;
  animation: headerPulse 3s infinite ease-in-out;
}
.hq-header-logo-box {
  position: relative;
  z-index: 2;
  width: 52px;
  height: 52px;
  background: rgba(33, 150, 243, 0.04);
  border: 1px solid rgba(33, 150, 243, 0.25);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 12px rgba(33, 150, 243, 0.15);
}
.hq-header-icon {
  filter: drop-shadow(0 0 6px rgba(33, 150, 243, 0.5));
}

/* Títulos Metálicos con degradado */
.hq-main-title {
  background: linear-gradient(180deg, #ffffff 30%, #cfd8dc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hq-title-glow {
  background: linear-gradient(180deg, #90caf9 30%, #2196f3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(33, 150, 243, 0.4));
}
.hq-subtitle {
  font-size: 1rem !important;
  font-weight: 400;
}

/* ── ⚔️ TARJETAS DEL MENÚ PRINCIPAL (CRISTAL DE OBSIDIANA) ── */
.hq-rpg-card {
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(13, 18, 30, 0.75) 0%,
    rgba(7, 8, 12, 0.9) 100%
  ) !important;
  border-radius: 14px !important;
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4) !important;
  cursor: pointer;
  overflow: hidden;
  transition:
    transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

/* Micro-ruido orgánico de fondo en tarjetas */
.hq-navbar-noise {
  position: absolute;
  inset: 0;
  opacity: 0.012;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

.card-content {
  position: relative;
  z-index: 2;
}

.hq-card-title {
  color: #ffffff;
  transition: color 0.2s ease;
}
.hq-card-subtitle {
  color: rgba(255, 255, 255, 0.4) !important;
  transition: color 0.2s ease;
  line-height: 1.4;
}

/* Marcos contenedores de Iconos */
.hq-icon-frame {
  position: relative;
  z-index: 2;
  width: 56px;
  height: 56px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
}

/* 🎨 VARIANTES DE COLOR REACTIVAS (Hover individualizado) */

/* Combate (Rojo / Iniciar partida) */
.color-combat {
  color: #ff5252;
}
.hq-card-combat:hover {
  border-color: rgba(255, 82, 82, 0.35) !important;
  box-shadow:
    0 12px 35px rgba(255, 82, 82, 0.1),
    inset 0 0 15px rgba(255, 82, 82, 0.02) !important;
  transform: translateY(-5px);
}
.hq-card-combat:hover .hq-icon-frame {
  background: rgba(255, 82, 82, 0.08);
  border-color: rgba(255, 82, 82, 0.4);
  filter: drop-shadow(0 0 6px rgba(255, 82, 82, 0.5));
}

/* Personajes (Azul Principal) */
.color-primary {
  color: #2196f3;
}
.hq-card-primary:hover {
  border-color: rgba(33, 89, 243, 0.479) !important;
  box-shadow:
    0 12px 35px rgba(29, 132, 216, 0.1),
    inset 0 0 15px rgba(28, 149, 248, 0.02) !important;
  transform: translateY(-5px);
}
.hq-card-primary:hover .hq-icon-frame {
  background: rgba(33, 150, 243, 0.08);
  border-color: rgba(33, 150, 243, 0.4);
  filter: drop-shadow(0 0 6px rgba(33, 150, 243, 0.5));
}

/* Tienda (Oro / Warning) */
.color-warning {
  color: #ffa726;
}
.hq-card-warning:hover {
  border-color: rgba(255, 167, 38, 0.35) !important;
  box-shadow:
    0 12px 35px rgba(255, 167, 38, 0.1),
    inset 0 0 15px rgba(255, 167, 38, 0.02) !important;
  transform: translateY(-5px);
}
.hq-card-warning:hover .hq-icon-frame {
  background: rgba(255, 167, 38, 0.08);
  border-color: rgba(255, 167, 38, 0.4);
  filter: drop-shadow(0 0 6px rgba(255, 167, 38, 0.5));
}

/* Compendio (Cian / Info) */
.color-info {
  color: #00e5ff;
}
.hq-card-info:hover {
  border-color: rgba(0, 229, 255, 0.35) !important;
  box-shadow:
    0 12px 35px rgba(0, 229, 255, 0.1),
    inset 0 0 15px rgba(0, 229, 255, 0.02) !important;
  transform: translateY(-5px);
}
.hq-card-info:hover .hq-icon-frame {
  background: rgba(0, 229, 255, 0.08);
  border-color: rgba(0, 229, 255, 0.4);
  filter: drop-shadow(0 0 6px rgba(0, 229, 255, 0.5));
}

/* Cambio global de textos en hover */
.hq-rpg-card:hover .hq-card-title {
  color: #ffffff;
}
.hq-rpg-card:hover .hq-card-subtitle {
  color: rgba(255, 255, 255, 0.75) !important;
}

/* 📜 FOOTER TEXT */
.hq-footer-text {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.2);
}

/* 🎭 ANIMACIONES */
@keyframes headerPulse {
  0%,
  100% {
    transform: scale(0.95);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.9;
  }
}
</style>
