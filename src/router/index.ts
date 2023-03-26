import { createRouter, createWebHistory } from "vue-router"
import { useAccountData } from "@/stores/account"

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
      path: "/operations/play",
      name: "operations.play",
      component: () => import("@/views/operations/play.vue")
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { isLoggedIn } = useAccountData()
  if (!isLoggedIn && to.name !== "launch") {
    next({ name: "launch" })
  } else {
    next()
  }
})

export default router
