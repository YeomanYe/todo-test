import { createRouter, createWebHashHistory } from 'vue-router'
import TodoView from '../views/TodoView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todo',
      component: TodoView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
