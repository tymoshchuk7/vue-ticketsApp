import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import FilmView from "@/views/FilmView.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/film/:id',
    name: 'FilmView',
    component: FilmView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
