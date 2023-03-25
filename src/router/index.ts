import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "launch",
      component: () => import("@/views/launch.vue")
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/views/dashboard.vue")
    },
    {
      path: "/play",
      name: "play",
      component: () => import("@/views/play.vue")
    }
  ]
})

export default router
