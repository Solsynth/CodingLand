<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <div class="text-h5">Operation Failed</div>
      <div class="text-subtitle1">All robots have lost links</div>
      <div>Commander, I think that if you shut down the robots and wait for recycling before the battery power reaches 0, you won’t be reduced to the present situation...</div>
    </q-card-section>
    <q-card-actions>
      <div class="q-gutter-sm">
        <q-btn flat color="primary" @click="$instance.state = 'finished'">
          Next Step
          <q-tooltip>Sometimes, the braver you are, the more you suffer</q-tooltip>
        </q-btn>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
import { useGameInstance } from "@/stores/instance"
import { onMounted } from "vue"

const $instance = useGameInstance().instance

const sounds = {
  failed: new Audio("/src/assets/sounds/operation-failed.mp3")
}

onMounted(() => {
  sounds.failed.play()
})
</script>