import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "gameplay.core",
      component: () => import("@/views/gameplay/renderer.vue")
    }
  ]
})

export default router
