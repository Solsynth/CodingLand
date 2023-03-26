<template>
  <div>
    <div class="text-h5">Battle Success</div>
    <div class="text-subtitle1">More than one robot returned to the base safely</div>
    <div>Although some robots have returned and the materials have been brought back safely, is it all worth it? </div>
    <div class="q-gutter-sm q-pt-lg">
      <q-btn flat color="white" @click="$instance.state = 'pending'">
        Try Again
        <q-tooltip>Make persistent efforts</q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGameInstance } from "@/stores/instance"

const $instance = useGameInstance().instance
</script>