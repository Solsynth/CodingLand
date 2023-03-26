<template>
  <div>
    <div class="text-h5">战役成功</div>
    <div class="text-subtitle1">有一名以上的机器人安全的返回了基地</div>
    <div>虽然有的机器人回来了，材料也安全的带回来了，但这一切都值得吗？</div>
    <div class="q-gutter-sm q-pt-lg">
      <q-btn flat color="white" @click="finish">
        再来一局
        <q-tooltip>再接再厉</q-tooltip>
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
  $instance.resetGame()
}
</script>