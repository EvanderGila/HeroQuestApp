<template>
  <VAppBar 
    elevation="0" 
    scroll-behavior="hide" 
    scroll-threshold="5"
    class="custom-main-navbar px-4"
    height="70"
  >
    <RouterLink to="/" class="d-flex align-center text-decoration-none">
      <div class="logo-box me-3">
        <VIcon icon="mdi-shield-crown" color="primary" size="28" />
      </div>
      <VAppBarTitle class="brand-text">
        HERO<span class="text-primary">QUEST</span>
      </VAppBarTitle>
    </RouterLink>

    <VSpacer />

    <div class="nav-items-container d-flex gap-2">
      <span>{{ user.profile.nickname }}</span>
      <VBtn
        v-for="(item, index) in items"
        :key="index"
        :to="item.to"
        variant="text"
        class="nav-btn px-4"
        :ripple="false"
        @click="item.action && item.action()"
      >
        <template #prepend>
          <VIcon :color="item.color || 'primary'" size="20" class="nav-icon">
            {{ item.icon }}
          </VIcon>
        </template>
        <span class="nav-text">{{ item.text }}</span>
      </VBtn>
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