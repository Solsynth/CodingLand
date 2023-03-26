<template>
  <div>
    <div class="text-h5">战役失败</div>
    <div class="text-subtitle1">所有机器人均已失去链接</div>
    <div>机器人虽然没有生命，但是它们也有感情的。#RobotLifeMatter #RLM</div>
    <div class="q-gutter-sm q-pt-lg">
      <q-btn flat color="white" @click="$instance.resetGame()">
        重新开始
        <q-tooltip>快跑啊！指挥官又要去霍霍更多机器人啦！</q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGameInstance } from "@/stores/instance"

const $instance = useGameInstance().instance
</script>