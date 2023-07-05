<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useGetData } from '../composables/getdata'

const { data, pokeSprite, loading, errorData } = useGetData()
const loading2 = ref(true)
const dataDescription = ref([])
const descriptionNumber = ref(1)
const pokeSpriteUrl = ref('https://pokeapi.co/api/v2/pokemon?limit=40&offset=0')

const getPokemonSpriteUrls = async () => {
  await Promise.all(
    data.value.results.map(async (pokemon) => {
      const response = await axios.get(pokemon.url)
      pokemon.spriteUrl = response.data.sprites.other.dream_world.front_default
    })
  )
}

const getDescription = async () => {
  loading2.value = true
  await Promise.all(
    data.value.results.map(async (_, index) => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${index + descriptionNumber.value}`)
        const flavorTextEntries = response.data.flavor_text_entries
        const spanishFlavorTextEntry = flavorTextEntries.find(entry => entry.language.name === 'es')
        if (spanishFlavorTextEntry) {
          const spanishFlavorText = spanishFlavorTextEntry.flavor_text
          dataDescription.value[index] = (spanishFlavorText)
          console.log(dataDescription.value)
        } else {
          console.log('No hay descripción')
        }
      } catch (error) {
        console.log(error)
      } finally {
        loading2.value = false
      }
    })
  )
}

const clickMe = async (boton) => {
  if (boton === 'boton1') {
    await pokeSprite(data.value.previous)
    await getPokemonSpriteUrls()
    await getDescription()
  } else if (boton === 'boton2') {
    await pokeSprite(data.value.next)
    await getPokemonSpriteUrls()
    await getOffsetFromUrl(data.value.next)
    await getDescription()
  }
}

// Get number in url

const getOffsetFromUrl = async (url) => {
  console.log('Esta es la URL que pasas: ' + url)
  const regex = /offset=(\d+)/
  const match = await url.match(regex)
  const offset = await match ? parseInt(match[1]) : null
  descriptionNumber.value = offset
  console.log(offset)
}
onMounted(async () => {
  await pokeSprite(pokeSpriteUrl.value)
  console.log(data.value.next)
  await Promise.all([getDescription(), getPokemonSpriteUrls()])
})
</script>

<template>
  <div v-if="loading">
    <div class="container">
      <div class="loader row justify-content-center align-items-center">
        <div class="spinner-grow" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
  <!-- Error -->
  <div v-else-if="errorData" class="vh-100 d-flex justify-content-center align-items-center " >
    <div class="alert alert-danger " role="alert">
      No hay pokemon 😓
    </div>
  </div>
  <div v-else>
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-3 col-lg-3 m-4" v-for="(pokemon, index) in data.results" :key="pokemon.name">
          <div class="card card-pokemon borde-card">
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
                  <p class="card-text text-bg-light"> {{ dataDescription[index] }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button :disabled="!data.previous" @click="clickMe('boton1')" type="button" class="btn btn-secondary m-4">Previous</button>
    <button :disabled="!data.next" @click="clickMe('boton2')" type="button" class="btn btn-secondary">Next</button>
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
