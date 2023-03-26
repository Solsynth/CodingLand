<template>
  <div>
    <div class="text-h5">Start A Campaign</div>
    <div class="text-subtitle1">Start a campaign to collect materials, data, and other resources. </div>
    <div>You will control a robot to explore the ruins of a pre-human civilization to obtain resources. </div>
    <div class="q-pt-md q-gutter-sm">
      <q-btn flat color="white" @click="$instance.newGame()">
        Confirm
        <q-tooltip>This is a road of no return</q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGameInstance } from "@/stores/instance"

const $instance = useGameInstance().instance
</script>