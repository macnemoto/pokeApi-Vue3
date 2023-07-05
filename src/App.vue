<script setup>
import MainFooter from './components/MainFooter.vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="bg">
  <nav class="navbar bg-body-tertiary">
  <div class="container-fluid">
    <router-link class="navbar-brand" to="/pokemon">
      <img src="@/assets/logo.svg" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
      PokeApi Marcos Con Vue
    </router-link>
    <div>
      <router-link class="btn btn-success  m-1" to="/">Home</router-link>
      <router-link  class="btn btn-success  " to="/pokemon">Pokemones</router-link>
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
