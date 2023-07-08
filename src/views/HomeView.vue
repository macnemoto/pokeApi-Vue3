<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import { useCounterStore } from '@/store/conuter.js'
import { storeToRefs } from 'pinia'

const useCounter = useCounterStore()
const { increment } = useCounter
const { double, count } = storeToRefs(useCounter)
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
<h1 class="text-light"> Es numero es
{{ count }}
</h1>
<button @click="increment">aumentar</button>
<h2>Doble {{ double }}</h2>

  </main>
</template>
