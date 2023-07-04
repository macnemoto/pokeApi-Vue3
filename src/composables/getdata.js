import axios from 'axios'
import { ref } from 'vue'

export const useGetData = () => {
  const data = ref(null)
  const loading = ref(true)
  const errorData = ref(null)

  const pokeSprite = async (url) => {
    try {
      // console.log('La url tomada es:', url)
      const res = await axios.get(url)
      // console.log(res.data.name)
      data.value = await res.data
    } catch (e) {
      errorData.value = 'Error con el host'
      console.log(errorData.value)
    } finally {
      loading.value = false
    }
  }

  return {
    pokeSprite,
    data,
    loading,
    errorData
  }
}
