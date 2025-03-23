import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SalaryRange from '../views/SalaryRange.vue'
import AvaliablePositions from '@/views/AvaliablePositions.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/salary',
      name: 'salary',
      component: SalaryRange
    },
    {
      path: '/positions',
      name: 'positions',
      component: AvaliablePositions
    }
  ],
})

export default router
