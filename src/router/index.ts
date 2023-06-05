import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "layouts.menu",
      component: () => import("@/layouts/menu-layout.vue"),
      children: [
        {
          path: "/",
          name: "main.menu",
          component: () => import("@/views/menu.vue")
        },
        {
          path: "/launch",
          name: "main.menu.launcher",
          component: () => import("@/views/launcher.vue")
        }
      ]
    },
    {
      path: "/stage",
      name: "stage",
      component: () => import("@/layouts/stage-layout.vue"),
      children: [
        {
          path: "/stage",
          name: "stage.main",
          component: () => import("@/views/stage.vue")
        }
      ]
    }
  ]
})

export default router
