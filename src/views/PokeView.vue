<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Logic
const typePokemon = ref('')
const poke = ref({})
const badgesType = ref('')
const pokemonType = ref('')
const typeColor = {
  fire: 'danger',
  grass: 'success',
  water: 'primary',
  normal: 'secondary',
  bug: 'success'
}

const back = () => {
  router.push('/pokemon')
}

const getType = (typeColor, pokemonType) => {
  for (const key in typeColor) {
    if (key === pokemonType) {
      return typeColor[key]
    }
  } return null
}

const pokemon = async () => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.name}`)
    const data = await res.json()
    // eslint-disable-next-line space-infix-ops, no-undef
    poke.value = data.sprites.other.home.front_default
    pokemonType.value = data.types[0].type.name
    console.log(pokemonType.value)
    console.log(data)
    typePokemon.value = data.types[0].type.name
    badgesType.value = await getType(typeColor, pokemonType.value)
    console.log(`el tipo ahora es:${badgesType.value}`)
  } catch (e) {
    console.log(e)
  }
}
pokemon()
</script>

<template>
<div>
  <div class="text-center">
    <img :src="poke" alt="" srcset="">
    <h1 class="text-center">Name: {{ $route.params.name }}</h1>
    <h2 :class="['text-center', 'badge', 'p-2', 'fs-2',`badge text-bg-${badgesType}`]"> Type: {{ typePokemon }}</h2>
  </div>
<button class="flex text-center" @click="back"> Volver </button>
</div>
</template>
