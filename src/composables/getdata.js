import axios from 'axios'
import { ref } from 'vue'

export const useGetData = () => {
  const data = ref(null)

  // eslint-disable-next-line no-unused-vars
  const pokeSprite = async (url) => {
    try {
      const res = await axios.get(url)
      data.value = res.data.results
    } catch (e) {
      console.log(e)
    }
  }

  return {
    pokeSprite,
    data
  }
}
