import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "@/app.vue"
import router from "@/router"

const app = createApp(App)

import { Dialog, Loading, LoadingBar, Notify, Quasar } from "quasar"
import quasarIconSet from "quasar/icon-set/mdi-v7"
import "@quasar/extras/roboto-font/roboto-font.css"
import "@quasar/extras/mdi-v7/mdi-v7.css"
import "quasar/src/css/index.sass"

app.use(createPinia())
app.use(router)
app.use(Quasar, {
  plugins: { Notify, Loading, LoadingBar, Dialog },
  iconSet: quasarIconSet
})

app.mount("#app")
