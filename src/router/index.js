import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/PokemonDex.vue')
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
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: () => import('../views/FavoriteView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
