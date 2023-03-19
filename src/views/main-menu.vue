<template>
  <q-page style="display: flex; justify-content: center; align-items: center">
    <div class="text-center">
      <div class="text-h5">CodingLand</div>
      <div class="text-subtitle1">Code your world</div>
      <div class="q-pt-md">
        <q-btn flat color="primary" @click="start">Start Game</q-btn>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { useGameInstance } from "@/stores/instance"
import { EarthMapGenerator } from "@/libs/map-generator"
import { useRouter } from "vue-router"

const $instance = useGameInstance()
const $router = useRouter()

function start() {
  $instance.map.randomGenerate(new EarthMapGenerator(), 20, 20)
  $router.push({ name: "play" })
}
</script>