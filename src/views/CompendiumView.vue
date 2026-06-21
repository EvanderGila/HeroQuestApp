<template>
    <VContainer fluid class="py-8 px-4 px-md-12">
        <div class="mb-6">
            <h1 class="text-h4 font-weight-bold">Compendio</h1>
            <p class="text-subtitle-1 text-medium-emphasis">Recopilatorio de archivos arcanos e historias.</p>
        </div>
        <VTabs 
            v-model="activeTab" 
            color="primary" 
            grow 
            density="compact"
            class="border-bottom-thin flex-shrink-0"
            >
            <VTab value="races" ><VIcon icon="mdi-sword-cross" class="d-sm-inline me-sm-1" size="small" />Razas</VTab>
            <VTab value="classes" ><VIcon icon="mdi-auto-fix" class="d-sm-inline me-sm-1" size="small" />Clases</VTab>
            <VTab value="abilities" ><VIcon icon="mdi-auto-fix" class="d-sm-inline me-sm-1" size="small" />Habilidades</VTab>
            <VTab value="spells" ><VIcon icon="mdi-wizard-hat" class="d-sm-inline me-sm-1" size="small" />Magia</VTab>
            <VTab value="items" ><VIcon icon="mdi-shield-account" class="d-sm-inline me-sm-1" size="small" />Objetos</VTab>
        </VTabs>

        <div class="hq-scroll-body flex-grow-1">
        
        <div v-if="activeTab === 'races'" class="pa-4 pa-sm-6 d-flex flex-column h-100">
            <RacesSearchTab :races="races"/>
        </div>

        <div v-if="activeTab === 'classes'" class="pa-4 pa-sm-6">
            <ClassesSearchTab :classes="classes" />
        </div>

        <div v-if="activeTab === 'abilities'" class="pa-4 pa-sm-6">
            <AbilitiesSearchTab :abilities="abilities" />
        </div>

        <div v-if="activeTab === 'spells'" class="pa-4 pa-sm-6">
            <SpellsSearchTab :spells="spells" />
        </div>

        <div v-if="activeTab === 'items'" class="pa-4">
            <ItemsSearchTab :items="items"/>
        </div>
        </div>
    </VContainer>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useCompendium } from '@/composables/useCompendium'
import RacesSearchTab from '@/components/compendium/RacesSearchTab.vue'
import ClassesSearchTab from '@/components/compendium/ClassesSearchTab.vue'
import AbilitiesSearchTab from '@/components/compendium/AbilitiesSearchTab.vue'
import SpellsSearchTab from '@/components/compendium/SpellsSearchTab.vue'
import ItemsSearchTab from '@/components/compendium/ItemsSearchTab.vue'

const activeTab = ref('races')

const { loadTab } = useCompendium()

watch(activeTab, async (tab) => {
  await loadTab(tab)
}, { immediate: true })

</script>