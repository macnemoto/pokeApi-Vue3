<template>
    <img class="rounded mx-auto d-block neko" :src="sprite" alt="" srcset="">

    <div class="card m-4" style="width: 18rem;" v-for="pokemon in dataPokemon" :key="pokemon.name">
      <img :src="pokemon.spriteUrl" class="card-img-top" alt="...">
      <div class="card-body">
        <h2 class="text-center">{{ pokemon.name }}</h2>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
    </div>
  </template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

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

  <style>
  .neko {
    height: 20em;
    width: auto;
  }
  </style>
