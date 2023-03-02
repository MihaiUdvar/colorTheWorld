import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mealsSelector',
      component: () => import('../views/MealsSelector.vue')
    }
  ]
})

export default router
