<script setup>
import MainFooter from './components/MainFooter.vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="">
  <nav class="navbar bg-dark ">
  <div class="container-fluid ">
    <router-link class="navbar-brand" to="/pokemon">
      <img src="@/assets/logo.svg" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
    <span class="text-light">PokeApi Marcos Con Vue</span>
    </router-link>
    <div>
      <router-link class="btn btn-success  m-1" to="/">Pokemones</router-link>
      <router-link  class="btn btn-success  " to="/pokemon">About</router-link>
    </div>
  </div>
</nav>
</div>
<div class="container-fluid text-center bg">
  <RouterView />
</div>
<MainFooter/>
</template>

<style scoped>
.bg {
  background-color: #202124;
}
</style>
