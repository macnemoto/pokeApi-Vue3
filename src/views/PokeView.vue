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
  bug: 'success',
  electric: 'warning',
  ice: 'info',
  flying: 'flying',
  poison: 'poison',
  fighting: 'fighting',
  psychic: 'psychic',
  ground: 'ground',
  rock: 'rock',
  ghost: 'ghost',
  dragon: 'dragon',
  dark: 'dark',
  steel: 'steel',
  fairy: 'fairy'
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

<style>
/* En tu archivo de hojas de estilo CSS */
.text-bg-flying {
  background-color: #87CEEB; /* Color adecuado para el tipo "flying" */
}

.text-bg-poison {
  background-color: #9932CC; /* Color adecuado para el tipo "poison" */
}

.text-bg-fighting {
  background-color: #8B4513; /* Color adecuado para el tipo "fighting" */
}

.text-bg-psychic {
  background-color: #FF1493; /* Color adecuado para el tipo "psychic" */
}

.text-bg-ground {
  background-color: #B8860B; /* Color adecuado para el tipo "ground" */
}

.text-bg-rock {
  background-color: #ca770b; /* Color adecuado para el tipo "rock" */
}

.text-bg-ghost {
  background-color: #4B0082; /* Color adecuado para el tipo "ghost" */
}

.text-bg-dragon {
  background-color: #9400D3; /* Color adecuado para el tipo "dragon" */
}

.text-bg-dark {
  background-color: #3a3737; /* Color adecuado para el tipo "dark" */
}

.text-bg-steel {
  background-color: #708090; /* Color adecuado para el tipo "steel" */
}

.text-bg-fairy {
  background-color: #FFB6C1; /* Color adecuado para el tipo "fairy" */
}

</style>
