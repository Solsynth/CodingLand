<template>
  <q-page class="menu-background">
    <div class="menu-header">
      <div>GameEngine v1.1.5</div>
    </div>

    <div class="menu-content">
      <div class="text-center">
        <div class="text-h4">CodingLand</div>
        <div class="text-subtitle1">Code Your World</div>
        <div class="text-caption">v1.1.5</div>

        <div class="q-pt-lg flex justify-center">
          <q-form class="q-gutter-sm" @submit.prevent="submit">
            <q-input outlined dense stack-label label="Username" v-model="payload.username" />
            <q-input outlined dense stack-label label="Password" v-model="payload.password" />
            <q-btn round flat :loading="submitting" type="submit" color="primary" icon="mdi-fingerprint" />
          </q-form>
        </div>
      </div>
    </div>

    <div class="menu-footer">
      <div>Services Status</div>
      <div>Source Code</div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import { http } from "@/utils/http"
import { useQuasar } from "quasar"
import { useAccountData } from "@/stores/account"
import { useCookies } from "@vueuse/integrations/useCookies"

const $q = useQuasar()

const cookies = useCookies(["authorization"])
const account = useAccountData()
const submitting = ref(false)
const payload = reactive({
  username: "",
  password: ""
})

async function submit() {
  try {
    submitting.value = true
    const res = await http.post("/o/oauth/token", {
      "grant_type": "password",
      "redirect": "https://codingland.smartsheep.studio",
      "password": payload.password,
      "username": payload.username,
      "client_secret": "4",
      "client_id": "6e42bf01f77849a0",
      "scope": "all"
    })

    cookies.set("authorization", res.data["access_token"])
    await account.fetch()

    $q.notify({ message: `Welcome back, Commander ${res.data.identity.nickname}!`, type: "positive" })
  } catch (e: any) {
    submitting.value = false
    if (e.response.status === 401) {
      $q.notify({ message: "Invalid username or password.", type: "warning" })
    } else {
      $q.notify({ message: `Something's wrong... ${e}`, type: "negative" })
    }
  }
}
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
</style>