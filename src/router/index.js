import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/pokemon',
      name: 'pokemon',
      component: () => import('../views/PokemonDex.vue')
    }, {
      path: '/pokemon/:name',
      name: 'poke',
      component: () => import('../views/PokeView.vue')
    }
  ]
})

export default router
