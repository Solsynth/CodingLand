<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <div class="text-h5">Operation Success</div>
      <div class="text-subtitle1">One or more robots still maintain links</div>
      <div>Finally... met a rational commander...</div>
    </q-card-section>
    <q-card-actions>
      <div class="q-gutter-sm">
        <q-btn flat color="primary" @click="$instance.state = 'choosing'">
          Go Ahead
          <q-tooltip>Make persistent efforts</q-tooltip>
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
  accomplished: new Audio("/src/assets/sounds/operation-accomplished.mp3")
}

onMounted(() => {
  sounds.accomplished.play()
})
</script>