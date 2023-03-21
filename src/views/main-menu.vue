<template>
  <q-page style="display: flex; justify-content: center; align-items: center">
    <div class="text-center">
      <div class="text-h5">CodingLand</div>
      <div class="text-subtitle1">Code your world</div>
      <div class="q-pt-md">
        <q-btn flat color="primary" @click="start">Start Game</q-btn>
      </div>

      <div style="padding-top: 2px">
        <q-btn flat round dense size="sm" icon="mdi-book" color="primary" @click="$storage.unwatch = true" />
      </div>

      <q-dialog v-model="$storage.unwatch">
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h6">Welcome to CodingLand</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle2">Welcome to CodingLand Alpha version!</div>
            <div>Control your world by your code. That's CodingLand.</div>
            <div>You gonna control the robots by JavaScript and create value.</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div>
              In the game. You need control your robots dig more valuable resources. And you
              cannot recharge your robot's battery. So when all your robot battery has run out. The game is ended.
              Our system will calculate your final score in few seconds. Try to get higher score!
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="text-subtitle2">Keys</div>
            <div class="text-subtitle2 q-mb-md">
              Current version safe javascript runtime still in development. So you need control your robots by your
              keyboard.
            </div>

            <div>Left Mouse Button - Select / Unselect</div>
            <div>W A S D - Movement</div>
            <div>Space - Dig</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="text-subtitle2">
              You don't have to worry about losing your game progress because the browser refreshes the page, all
              changes are saved immediately.
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { useGameInstance } from "@/stores/instance"
import { EarthMapGenerator } from "@/libs/map-generator"
import { useRouter } from "vue-router"
import { useLocalStorage } from "@vueuse/core"
import { reactive } from "vue"
import { GameInstance } from "@/libs/instance"

const $storage = useLocalStorage("guides-data", { unwatch: true })
const $instance = useGameInstance()
const $router = useRouter()

const modals = reactive({
  modes: {
    speed: false
  }
})

function start() {
  $instance.instance.score = 0
  $instance.instance.messages = []
  $instance.instance.inventory = {}
  $instance.instance.newGame(new EarthMapGenerator())
  $router.push({ name: "play" })
}
</script>