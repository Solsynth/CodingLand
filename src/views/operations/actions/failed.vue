<template>
  <div>
    <div class="text-h5">Battle Failed</div>
    <div class="text-subtitle1">All robots have lost links</div>
    <div>Although robots are not alive, they also have emotions. #RobotLifeMatter #RLM</div>
    <div class="q-gutter-sm q-pt-lg">
      <q-btn flat color="white" @click="$instance.resetGame()">
        Restart
        <q-tooltip>Run! Commander is going to Huo Huo more robots again! </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGameInstance } from "@/stores/instance"

const $instance = useGameInstance().instance
</script>