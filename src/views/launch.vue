<template>
  <q-page class="menu-background">
    <div class="menu-header">
      <div>
        <div>GameEngine v1.1.5</div>
        <div class="text-h4 text-uppercase plex">CodingLand</div>
      </div>
    </div>

    <div class="menu-content" v-if="!reverting">
      <div class="text-center">
        <div class="text-h4">CodingLand</div>
        <div class="text-subtitle1">Code Your World</div>
        <div class="text-caption">v1.1.5</div>

        <div class="q-pt-lg flex justify-center">
          <q-form class="q-gutter-sm" @submit.prevent="submit" v-if="!account.isLoggedIn">
            <q-input outlined dense stack-label label="Username" v-model="payload.username" />
            <q-input outlined dense stack-label type="password" label="Password" v-model="payload.password" />
            <q-btn round flat :loading="submitting" type="submit" color="primary" icon="mdi-fingerprint" />
          </q-form>
          <div v-else>
            <q-btn round flat color="primary" icon="mdi-login" :to="{ name: 'dashboard' }" />
          </div>
        </div>
      </div>
    </div>
    <div class="menu-content" v-else>
      <div class="text-center">
        <q-spinner-puff color="primary" size="54px" class="q-pa-sm" />
        <div>Exchanging electrical signals with the neural network...</div>
        <div><a class="text-primary" href="https://status.smartsheep.studio/status/goatworks" target="_blank">Check services status</a></div>
      </div>
    </div>

    <div class="menu-footer">
      <div>The Project Is Open Sourced Under The GNU GPL v3 License</div>
      <div>Made By SmartSheep Studio With ❤️</div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue"
import { http } from "@/utils/http"
import { useQuasar } from "quasar"
import { useAccountData } from "@/stores/account"
import { useCookies } from "@vueuse/integrations/useCookies"
import { useRouter } from "vue-router"

const $q = useQuasar()
const $router = useRouter()

const reverting = ref(true)

const cookies = useCookies(["authorization"])
const account = useAccountData()
const submitting = ref(false)
const payload = reactive({
  username: "",
  password: ""
})

const sounds = {
  welcome: new Audio("/src/assets/sounds/welcome.mp3")
}

async function submit() {
  if (payload.username.length <= 0 || payload.password.length <= 0) {
    return
  }

  try {
    submitting.value = true
    const res = await http.post("/o/oauth/token", {
      "grant_type": "password",
      "redirect": "https://codingland.smartsheep.studio",
      "password": payload.password,
      "username": payload.username,
      "client_id": 4,
      "client_secret": "6e42bf01f77849a0",
      "scope": "all"
    })

    cookies.set("authorization", res.data["access_token"])
    await account.fetch()

    await sounds.welcome.play()
    $q.notify({ message: `Welcome back, Commander ${res.data.identity.nickname}!`, type: "positive" })
  } catch (e: any) {
    submitting.value = false
    if (e.response?.status === 401) {
      $q.notify({ message: "Invalid username or password.", type: "warning" })
    } else {
      $q.notify({ message: `Something's wrong... ${e}`, type: "negative" })
    }
  }
}

onMounted(() => {
  Promise.all([useAccountData().fetch()]).then(() => {
    reverting.value = false
  })
})
</script>

<style scoped>
.menu-header {
  height: 80px;
  background-color: rgba(52, 52, 52, 0.85);
  color: white;
  text-align: center;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.menu-footer {
  height: 80px;
  background-color: rgba(52, 52, 52, 0.85);
  color: white;
  text-align: center;
  padding: 10px;
}

.menu-content {
  height: calc(100vh - 32px - 160px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-background {
  background: #f3f3f3;
}

.plex {
  font-family: 'IBM Plex Mono', monospace;
  animation-duration: 800ms;
  animation-name: breath;
  animation-timing-function: ease;
}

@keyframes breath {
  from {
    letter-spacing: 100px;
  }
  to {
    letter-spacing: 1px;
  }
}
</style>