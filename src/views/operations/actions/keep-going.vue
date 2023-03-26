<template>
  <div>
    <div class="text-h5">经典二选一</div>
    <div class="text-subtitle1">是见好就收，还是继续前进？</div>
    <div>继续前进难度则会增加一点，并且所有机器人死亡的话一路上收集的物资都将丢失。</div>
    <div class="q-pt-md q-gutter-sm">
      <q-btn flat color="grey-5" @click="finish">
        见好就收
        <q-tooltip>你看这个彬彬就是逊啦！才过几个个区块就回基地了~</q-tooltip>
      </q-btn>
      <q-btn flat color="white" @click="$instance.newGame()">
        继续前进
        <q-tooltip>我超勇的</q-tooltip>
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
  $instance.state = 'finished'
}
</script>