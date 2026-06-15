<template>
  <VContainer class="fill-height d-flex align-center justify-center py-8">
    <div class="menu-container text-center w-100" style="max-width: 900px;">
      
      <!-- Título de Bienvenida del Tablero -->
      <VIcon icon="mdi-shield-crown" size="64" color="primary" class="mb-4" />
      <h1 class="text-h3 font-weight-black mb-2 text-uppercase tracking-wide">
        Tablero del <span class="text-primary">Héroe</span>
      </h1>
      <p class="text-subtitle-1 text-medium-emphasis mb-8">
        Prepara tu equipo, consulta tus estadísticas y adéntrate en la mazmorra.
      </p>

      <!-- Rejilla de Opciones del Menú Principal -->
      <VRow>
        
        <!-- OPCIÓN 1: EMPEZAR PARTIDA -->
        <VCol cols="12" sm="6">
          <VCard
            class="py-6 h-100 d-flex flex-column align-center justify-center menu-card border-thin"
            elevation="3"
            hover
            @click="actionNotImplemented('Iniciar Partida')"
          >
            <VIcon icon="mdi-sword-cross" size="40" color="error" class="mb-3" />
            <VCardItem>
              <VCardTitle class="font-weight-bold">Iniciar / Unirse a Partida</VCardTitle>
              <VCardSubtitle class="text-wrap mt-1">
                Entra en la mazmorra en vivo y enfréntate a los desafíos de Morcar.
              </VCardSubtitle>
            </VCardItem>
          </VCard>
        </VCol>

        <!-- OPCIÓN 2: TUS PERSONAJES (ACTIVO) -->
        <VCol cols="12" sm="6">
          <VCard
            to="/characters"
            class="py-6 h-100 d-flex flex-column align-center justify-center menu-card border-thin"
            elevation="3"
            hover
          >
            <VIcon icon="mdi-account-group" size="40" color="primary" class="mb-3" />
            <VCardItem>
              <VCardTitle class="font-weight-bold">Mis Personajes</VCardTitle>
              <VCardSubtitle class="text-wrap mt-1">
                Gestiona tus fichas de héroe, sube de nivel y mira tus atributos reales.
              </VCardSubtitle>
            </VCardItem>
          </VCard>
        </VCol>

        <!-- OPCIÓN 3: TIENDA DE OBJETOS -->
        <VCol cols="12" sm="6">
          <VCard
            class="py-6 h-100 d-flex flex-column align-center justify-center menu-card border-thin"
            elevation="3"
            hover
            @click="actionNotImplemented('Tienda de Objetos')"
          >
            <VIcon icon="mdi-treasure-chest" size="40" color="warning" class="mb-3" />
            <VCardItem>
              <VCardTitle class="font-weight-bold">Tienda de Alquimista</VCardTitle>
              <VCardSubtitle class="text-wrap mt-1">
                Gasta tus monedas de oro en armas, armaduras y pociones de curación.
              </VCardSubtitle>
            </VCardItem>
          </VCard>
        </VCol>

        <!-- OPCIÓN 4: COMPENDIO / REGISTRO -->
        <VCol cols="12" sm="6">
          <VCard
            class="py-6 h-100 d-flex flex-column align-center justify-center menu-card border-thin"
            elevation="3"
            hover
            @click="actionNotImplemented('Compendio del Juego')"
          >
            <VIcon icon="mdi-book-open-page-variant" size="40" color="info" class="mb-3" />
            <VCardItem>
              <VCardTitle class="font-weight-bold">Compendio y Registro</VCardTitle>
              <VCardSubtitle class="text-wrap mt-1">
                Consulta el bestiario, el listado de hechizos elementales y artefactos míticos.
              </VCardSubtitle>
            </VCardItem>
          </VCard>
        </VCol>

      </VRow>

      <!-- Pie de página informativo temporal -->
      <div class="mt-8 text-caption text-disabled">
        HeroQuest Alpha — Versión de desarrollo
      </div>

    </div>
  </VContainer>
</template>

<script setup lang="ts">
// De momento, como estas funciones no hacen nada, ponemos un aviso controlado por consola o alert
function actionNotImplemented(menuName: string) {
  console.log(`[Menú] Se ha hecho clic en "${menuName}", pero el módulo aún está en desarrollo.`);
  // Si quieres un feedback visual rápido puedes descomentar la siguiente línea:
  // alert(`¡La forja de "${menuName}" está en proceso! Estará listo en futuras versiones.`);
}
</script>

<style scoped>
.menu-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.menu-card:hover {
  transform: translateY(-4px);
}

.tracking-wide {
  letter-spacing: 0.1em;
}
</style>