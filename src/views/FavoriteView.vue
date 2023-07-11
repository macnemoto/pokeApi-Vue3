<script setup>
import { useFavoriteStore } from '@/store/favorite.js'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

const useFavorites = useFavoriteStore()
const { favorites } = storeToRefs(useFavorites)
const { remove } = useFavorites

</script>

<template>
    <!-- refactor -->
    <div class="container" >
        <div class="row">
            <div class="col">
                <h2 class="m-2">Box 1</h2>
                <h2 v-if="favorites.length === 0">
                    No Tienes Pokédex en la PC
                </h2>
                <div v-else>
                    <div class="floorPoke">
                        <div class="col-12 d-flex flex-wrap">
                            <div class="jump" v-for="poke in favorites" :key="poke.id">
                                <div>
                                    {{ poke.name }}
                                </div>
                                <div>
                                    <router-link class="text-decoration-none m-4" :to="`/pokemon/${poke.name}`"><img
                                        :src='poke.sprites["versions"]["generation-v"]["black-white"]["animated"]["front_default"]' alt='' srcset=''>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
        <div class="row">
            <dir>
                <img class="rounded mt-4" src="../assets/pokepc.webp" alt="" srcset="">
            </dir>
        </div>
    </div>
    </div>
</template>

<style>
h2 {
    color: white;
}

.floorPoke {
    background-image: url(@/assets/floorpokePNG.PNG);
    border: 4px solid #8f8b7a;
    /* Color amarillo para el borde */
    border-radius: 10px;
    /* Borde redondeado */
    border-width: 8px;
    /* Ancho del borde hacia adentro */
    border-style: inset;
    /* Estilo del borde hacia adentro */
    box-shadow: 10px 11px 32px 14px rgba(131, 126, 126, 0.1);
    /* position: relative; */

}

.jump:hover {
    animation-name: jumpJump;
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
}

@keyframes jumpJump {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-5px);
    }
}</style>
