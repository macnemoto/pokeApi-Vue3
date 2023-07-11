import { defineStore } from 'pinia'
import { ref } from 'vue'
// @ts-check

export const useFavoriteStore = defineStore('favorite', () => {
  const favorites = ref([])
  console.log(favorites.value + 'este es otro')
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

  const favoritesButton = (poke, id) => {
    console.log(poke.name)
    const appearsPoke = favorites.value.some((favorite) => {
      return favorite.name === poke.name
    })
    if (!appearsPoke) {
      favorites.value.push(poke)
      localStorage.setItem('favoritos', JSON.stringify(favorites.value))
    } else {
      favorites.value = favorites.value.filter(item => item.id !== id)
      localStorage.setItem('favoritos', JSON.stringify(favorites.value))
    }
  }

  const findPoke = (name) => {
    return favorites.value.find((item) => item.name === name)
  }

  return {
    favorites,
    add,
    remove,
    findPoke,
    favoritesButton
  }
})
