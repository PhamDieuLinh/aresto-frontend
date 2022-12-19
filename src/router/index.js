import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import KategorieView from '@/views/KategorieView'
import RErstellenView from '@/views/RErstellenView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/kategorie',
    name: 'kategorie',
    component: KategorieView
  },
  {
    path: '/restauranterstellen',
    name: 'restauranterstellen',
    component: RErstellenView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
