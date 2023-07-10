import { defineStore } from 'pinia'
import { ref } from 'vue'
// @ts-check

export const useFavoriteStore = defineStore('favorite', () => {
  const favorites = ref([])

  if (localStorage.getItem('favoritos')) {
    favorites.value = JSON.parse(localStorage.getItem('favoritos'))
  }

  const add = (poke) => {
    favorites.value.push(poke)
    localStorage.setItem('favoritos', JSON.stringify(favorites.value))
  }
  const remove = (id) => {
    favorites.value = favorites.value.filter(item => item.id !== id)
    localStorage.setItem('favoritos', JSON.stringify(favorites.value))
  }
  const findPoke = (name) => {
    return favorites.value.find((item) => item.name === name)
  }

  return {
    favorites,
    add,
    remove,
    findPoke
  }
})
