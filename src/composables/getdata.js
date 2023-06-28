import axios from 'axios'
import { ref } from 'vue'

export const useGetData = () => {
  const data = ref(null)
  const loading = ref(true)

  // eslint-disable-next-line no-unused-vars
  const pokeSprite = async (url) => {
    try {
      const res = await axios.get(url)
      data.value = await res.data.results
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }

  return {
    pokeSprite,
    data,
    loading
  }
}
