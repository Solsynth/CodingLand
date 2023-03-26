<template>
  <q-layout view="hHh LpR fFf">
    <q-header>
      <q-bar dark class="bg-primary text-white">
        <q-btn dense flat icon="mdi-code-braces-box">
          <q-menu>
            <q-list dense style="min-width: 100px">
              <q-item dense clickable>
                <q-item-section>Account</q-item-section>
                <q-item-section side>
                  <q-icon name="mdi-chevron-right" />
                </q-item-section>

                <q-menu anchor="top end" self="top start">
                  <q-item dense clickable v-close-popup :disable="!$account.isLoggedIn" @click="logout">
                    <q-item-section>Logout</q-item-section>
                  </q-item>
                </q-menu>
              </q-item>
              <q-item dense clickable>
                <q-item-section>Gameplay</q-item-section>
                <q-item-section side>
                  <q-icon name="mdi-chevron-right" />
                </q-item-section>

                <q-menu anchor="top end" self="top start">
                  <q-item dense clickable v-close-popup @click="$instance.resetGame()">
                    <q-item-section>Reset</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item dense clickable v-close-popup>
                    <q-item-section>Settings</q-item-section>
                  </q-item>
                </q-menu>
              </q-item>
              <q-item dense clickable>
                <q-item-section>Help</q-item-section>
                <q-item-section side>
                  <q-icon name="mdi-chevron-right" />
                </q-item-section>

                <q-menu anchor="top end" self="top start">
                  <q-item dense clickable v-close-popup href="https://wiki.smartsheep.studio/projects/codingland" target="_blank">
                    <q-item-section>Open Goatpedia...</q-item-section>
                  </q-item>
                </q-menu>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <div class="text-bold">CodingLand</div>

        <q-space />

        <div>{{ date.toLocaleTimeString() }}</div>
      </q-bar>
    </q-header>

    <q-drawer v-model="layouts.drawer.left" side="left" bordered>
    </q-drawer>

    <q-drawer v-model="layouts.drawer.right" side="right" bordered>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { useLayoutOptions } from "@/stores/layouts"
import { useGameInstance } from "@/stores/instance"
import { useAccountData } from "@/stores/account"
import { useRouter } from "vue-router"
import { ref } from "vue"

const $router = useRouter()
const $account = useAccountData()
const $instance = useGameInstance().instance

const layouts = useLayoutOptions().options
const date = ref(new Date())

setInterval(() => date.value = new Date(), 1000)

function logout() {
  $account.logout()
  $router.push({ name: "launch" }).then(() => $router.go(0))
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

</style>