<template>
  <q-card class="bg-primary text-white situation">
    <q-card-section class="row q-col-gutter-lg">
      <div class="col-grow">
        <q-card flat class="bg-indigo-8 q-pa-md">
          <q-icon name="mdi-layers" size="128px" />
          <div class="difficulty">
            <div class="text-h3 text-black">{{ $instance.difficulty }}</div>
          </div>
        </q-card>
      </div>
      <div class="col">
        <start v-if="$instance.state === 'pending'" />
        <keep-going v-else-if="$instance.state === 'choosing'" />
        <finished v-else-if="$instance.alive && $instance.state === 'finished'" />
        <failed v-else-if="$instance.state === 'finished'" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import KeepGoing from "@/views/operations/actions/keep-going.vue"
import Start from "@/views/operations/actions/start.vue"
import Finished from "@/views/operations/actions/finished.vue"
import Failed from "@/views/operations/actions/failed.vue"
import { useGameInstance } from "@/stores/instance"
import { watch } from "vue"
import { useRouter } from "vue-router"

const $router = useRouter()
const $instance = useGameInstance().instance

watch($instance, (v) => {
  if (v.state === "playing") {
    $router.push({ name: "operations.play" })
  }
})
</script>

<style scoped>
.difficulty {
  position: absolute;
  bottom: 20px;
  left: 100px;
  font-family: 'IBM Plex Mono', monospace;
  -webkit-text-stroke: 1pt #fff;
}
</style>