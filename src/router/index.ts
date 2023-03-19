import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main-menu",
      component: () => import("@/views/main-menu.vue")
    },
    {
      path: "/play",
      name: "play",
      component: () => import("@/views/play.vue")
    }
  ]
})

export default router
