<template>
    <div>
        <p>Razas :</p>
        <p v-for="races in charStore.availableRaces" :key="races.id"> {{ races.name }}</p>
    </div>
    <div>
        <p>Clases :</p>
        <p v-for="classes in charStore.availableClasses" :key="classes.id"> {{ classes.name }}</p>
    </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { useCharacterStore } from '@/store/characterStore'
import { useCharacters } from '@/composables/useCharacters'

const charStore = useCharacterStore()
const { loadCreationData, fetchUserCharacters } = useCharacters()

onMounted(async()=>{
    await loadCreationData()
    // await fetchUserCharacters()
})

</script>