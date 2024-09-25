import { createRouter, createWebHistory } from 'vue-router'
import AddFlashcard from '@/views/AddFlashcard.vue'
import ListFlashcards from '@/views/ListFlashcards.vue'

const routes = [
  {
    path: '/',
    name: 'ListFlashcards',
    component: ListFlashcards
  },
  {
    path: '/add',
    name: 'AddFlashcard',
    component: AddFlashcard
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
