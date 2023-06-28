import axios from 'axios'
import { ref } from 'vue'

export const useGetData = () => {
  const dataPokemon = ref(null)

  // eslint-disable-next-line no-unused-vars
  const pokeSprite = async (url) => {
    try {
      const { data } = await axios.get(url)
      dataPokemon.value = data.results
      await console.log(dataPokemon.value)
    } catch (e) {
      console.log(e)
    }
  }

  return {
    pokeSprite,
    dataPokemon
  }
}
