import { defineStore } from 'pinia'
import { ref } from 'vue'
// @ts-check

export const useFavoriteStore = defineStore('favorite', () => {
  const favorites = ref([])

  const add = (poke) => {
    favorites.value.push(poke)
  }
  const remove = (id) => {
    favorites.value = favorites.value.filter(item => item.id !== id)
  }
  const findPoke = (name) => {
    return favorites.value.find((item) => item.name === name)
    // console.log('funciono2')
  }

  return {
    favorites,
    add,
    remove,
    findPoke
  }
})
