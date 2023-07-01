<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useGetData } from '../composables/getdata'

const { data, pokeSprite, loading } = useGetData()
const pokemonDescription = ref(null)
const loading2 = ref(true)

const getPokemonSpriteUrls = async () => {
  for (const pokemon of data.value.results) {
    const response = await axios.get(pokemon.url)
    pokemon.spriteUrl = response.data.sprites.other.dream_world.front_default
  }
}

const getPokemonDescription = async (urlpokemon) => {
  loading2.value = false
  try {
    const response = await fetch(urlpokemon)
    if (response.ok) {
      const data = await response.json()
      const flavorTextEntries = data.flavor_text_entries
      const spanishFlavorTextEntry = flavorTextEntries.find(entry => entry.language.name === 'es')
      if (spanishFlavorTextEntry) {
        const spanishFlavorText = spanishFlavorTextEntry.flavor_text
        pokemonDescription.value = spanishFlavorText
        console.log(spanishFlavorText)
      } else {
        console.log('No hay descripción')
      }
    } else {
      throw new Error('Error en la solicitud')
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading2.value = false
  }
}

onMounted(async () => {
  await pokeSprite('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
  await getPokemonSpriteUrls()
  await getPokemonDescription('https://pokeapi.co/api/v2/pokemon-species/metapod')
})
</script>

<template>
<div v-if="loading">
  <div class="container">
    <div class="loader row justify-content-center align-items-center ">
      <div class="spinner-grow" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</div>
</div>
  <div v-else>
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-3 col-lg-3 m-4" v-for="pokemon in data.results" :key="pokemon.name">
          <div class="card card-pokemon borde-card ">
            <div class="card-body text-bg-dark">
              <div class="img-container bg-poke-plata rounded-top">
                <img :src="pokemon.spriteUrl" class="card-img-top img-card" alt="pokemon">
              </div>
              <div class="text-bg-dark">
                <h2 class="text-center text-bg-light card-header">
                  <router-link class="text-decoration-none" :to="`/pokemon/${pokemon.name}`">{{ pokemon.name }}</router-link>
                </h2>
                <div v-if="loading2">
                  <div class="spinner-grow" role="status">
                   <span class="sr-only"></span>
                     </div>
                </div>
                <div v-else>
                  <p class="card-text text-bg-light"> {{ pokemonDescription }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  </div>
</template>

<style>
.card-pokemon {
  border: 4px solid #FFCB05; /* Color amarillo para el borde */
  border-radius: 10px; /* Borde redondeado */
  border-width: 8px; /* Ancho del borde hacia adentro */
  border-style: inset; /* Estilo del borde hacia adentro */
  box-shadow: 10px 11px 32px 14px rgba(0, 0, 0, 0.1);
}

.borde-card {
  min-width: 20rem;
  max-width: 28rem;
  min-height: 28rem;
  max-height: 42rem;
}

.img-container {
  width: 100%;
  height: 15rem; /* Establece el alto fijo para todas las imágenes */
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-card {
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
}
.bg-poke-plata{
  background-image: url("../assets/plata.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.loader {
  height: 100vh;
  overflow-y: auto;
  max-height: 90vh;
}
</style>
