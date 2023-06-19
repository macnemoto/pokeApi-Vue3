<template>
<h1>Poke name: {{ $route.params.name }}</h1>
<h2>El tipo de pokemon es {{ typePokemon }}</h2>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const router = useRoute()
const typePokemon = ref('')

const pokemon = async () => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${router.params.name}`)
    const data = await res.json()
    typePokemon.value = data.types[0].type.name
  } catch (e) {
    console.log(e)
  }
}
pokemon()
</script>
