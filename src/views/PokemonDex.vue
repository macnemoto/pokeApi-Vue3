<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const dataPokemon = ref([])
const sprite = ref('')

const pokeSprite = async () => {
  try {
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon')
    dataPokemon.value = data.results

    for (const pokemon of dataPokemon.value) {
      const pokeData = await axios.get(pokemon.url)
      const spriteUrl = pokeData.data.sprites.other.dream_world.front_default
      pokemon.spriteUrl = spriteUrl
    }

    console.log(dataPokemon.value)
  } catch (e) {
    console.log(e)
  }
}

pokeSprite()
</script>

<template>

  <!-- cambio radical -->
  <div class="container">
  <div class="row">
    <div class="col-sm">
  <div class="card m-4 col-sm" style="width: 18rem;" v-for="pokemon in dataPokemon" :key="pokemon.name">
    <div class="card-body text-bg-dark rounded">
      <img :src="pokemon.spriteUrl" class="card-img-top" alt="pokemon">
      <div class="text-bg-dark">
      <h2 class="text-center text-bg-light card-header">
          <router-link class="text-decoration-none" :to="`/pokemon/${ pokemon.name }`"> {{ pokemon.name }} </router-link>
      </h2>
      <p class="card-text text-bg-light">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    </div>
  </div>
    </div>
  </div>
</div>
</template>

  <style>

  </style>
