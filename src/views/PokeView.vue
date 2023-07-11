<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGetData } from '../composables/getdata'
import { useFavoriteStore } from '../store/favorite.js'

const route = useRoute()
const router = useRouter()
const { data, pokeSprite, errorData } = useGetData()
const useFavorites = useFavoriteStore()
const { findPoke, favoritesButton } = useFavorites

// Logic

const typePokemon = ref('')
const poke = ref({})
const badgesType = ref('')
const pokemonType = ref('')
const namePokemon = ref(route.params.name)
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
    poke.value = data.value.sprites.other.home.front_default
    pokemonType.value = data.value.types[0].type.name
    typePokemon.value = data.value.types[0].type.name
    badgesType.value = await getType(typeColor, pokemonType.value)
  } catch (e) {
    console.log(e)
  }
}

onMounted(async () => {
  await pokeSprite(`https://pokeapi.co/api/v2/pokemon/${namePokemon.value}`)
  await pokemon()
})
</script>

<!-- Template Card Pokemon -->

<template>
  <div v-if="errorData" class="vh-100 d-flex justify-content-center align-items-center ">
    <div class="alert alert-danger " role="alert">
      No hay pokemon 😓
    </div>
  </div>
  <div v-else>
    <div class="container">
      <div class="d-flex flex-column align-items-center">
        <div class="mb-3">
          <div class="card-body bg-primary2 m-4 pb-4 rounded">
            <div class="d-flex justify-content-end">
              <button class="flex text-center btn btn-danger m-1" @click="favoritesButton(data, data.id)">
                <samp v-if="findPoke(data?.name)">❤️</samp>
                <samp class="emptyHeart" v-else>♡</samp>
              </button>
            </div>
            <img :src="poke" alt="" srcset="">
          </div>
        </div>
        <div class="mb-3">
          <h1 class="text-center text-white m-3">Name: {{ $route.params.name }}</h1>
          <h2 :class="['text-center', 'badge', 'p-3', 'fs-2', `badge text-bg-${badgesType}`]"> Type: {{ typePokemon }}</h2>
        </div>
        <div class="mb-3">
          <button class="flex text-center btn btn-secondary m-4" @click="back"> Volver </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.emptyHeart {
  font-size: 20px;

}

.bg-primary2 {
  background: linear-gradient(395deg, #08973a, #9f5be4);
  background-size: 250% 250%;
  animation: gradientAnimation 10s ease infinite;

  /* Color defautl */

  /*   background: linear-gradient(135deg, #957DAD, #A8EDFF);
  background-size: 200% 200%;
  animation: gradientAnimation 10s ease infinite; */
}

/* En tu archivo de hojas de estilo CSS */
.text-bg-flying {
  background-color: #87CEEB;
  /* Color adecuado para el tipo "flying" */
}

.text-bg-poison {
  background-color: #9932CC;
  /* Color adecuado para el tipo "poison" */
}

.text-bg-fighting {
  background-color: #8B4513;
  /* Color adecuado para el tipo "fighting" */
}

.text-bg-psychic {
  background-color: #FF1493;
  /* Color adecuado para el tipo "psychic" */
}

.text-bg-ground {
  background-color: #B8860B;
  /* Color adecuado para el tipo "ground" */
}

.text-bg-rock {
  background-color: #ca770b;
  /* Color adecuado para el tipo "rock" */
}

.text-bg-ghost {
  background-color: #4B0082;
  /* Color adecuado para el tipo "ghost" */
}

.text-bg-dragon {
  background-color: #9400D3;
  /* Color adecuado para el tipo "dragon" */
}

.text-bg-dark {
  background-color: #3a3737;
  /* Color adecuado para el tipo "dark" */
}

.text-bg-steel {
  background-color: #708090;
  /* Color adecuado para el tipo "steel" */
}

.text-bg-fairy {
  background-color: #FFB6C1;
  /* Color adecuado para el tipo "fairy" */
}</style>
