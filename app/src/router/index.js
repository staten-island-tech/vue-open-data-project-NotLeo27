import { createRouter, createWebHistory } from 'vue-router'
import SalaryRange from '../views/SalaryRange.vue'
import AvailablePositions from '../views/AvaliablePositions.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/salary-range',
      name: 'salary-range',
      component: SalaryRange,
    },
    {
      path: '/available-position',
      name: 'available-position', 
      component: AvailablePositions,
    },
  ],
})

export default router
