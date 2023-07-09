<script setup>
import { useFavoriteStore } from '@/store/favorite.js'
import { storeToRefs } from 'pinia'

const useFavorites = useFavoriteStore()
const { favorites } = storeToRefs(useFavorites)

const { remove } = useFavorites
</script>

<template>
<h2>Favoritos</h2>
<h2 v-if="favorites.length === 0">
Sin favoritos
</h2>
<div v-else>
    <ul class="list-group">
        <li class="list-group-item" v-for="poke in favorites" :key="poke.id">
            <div>
                {{ poke.name }}
            </div>
            <div>
                <button class="btn btn-sm btn-danger" @click="remove(poke.id)" >Eliminar</button>
            </div>
        </li>
    </ul>
</div>
</template>

<style>
h2{
    color: white;
}
</style>
