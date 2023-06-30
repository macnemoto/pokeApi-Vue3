import axios from 'axios'
import { ref } from 'vue'

export const useGetData = () => {
  const data = ref(null)
  const loading = ref(true)

  // eslint-disable-next-line no-unused-vars
  const pokeSprite = async (url) => {
    try {
      // console.log('La url tomada es:', url)
      const res = await axios.get(url)
      // console.log(res.data.name)
      data.value = await res.data
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
