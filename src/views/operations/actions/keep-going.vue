<template>
  <div>
    <div class="text-h5">Benefit Temptation</div>
    <div class="text-subtitle1">Should I just let it go, or move on? </div>
    <div>The difficulty of moving forward will increase a little, and if all the robots die, the materials collected along the way will be lost. </div>
    <div class="q-pt-md q-gutter-sm">
      <q-btn flat color="grey-5" @click="finish">
        take it
        <q-tooltip> You see, this Binbin is so rude! Return to the base after only a few blocks~</q-tooltip>
      </q-btn>
      <q-btn flat color="white" @click="$instance.newGame()">
        Keep Going
        <q-tooltip>I am super brave</q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGameInstance } from "@/stores/instance"
import { useGlobalData } from "@/stores/global"

const $global = useGlobalData()
const $instance = useGameInstance().instance

function finish() {
  Object.entries($instance.inventory).forEach(([k, v]) => {
    $global.score += $instance.score
    $global.inventory[k] = v
  })
  $instance.resetGame(false)
  $instance.state = 'finished'
}
</script>