<template>
  <div>
    <div class="text-h5">展开战役</div>
    <div class="text-subtitle1">展开战役收集材料、资料与其他资源。</div>
    <div>您将控制 1 名机器人前往一个前人类文明的遗迹探索以获取资源。</div>
    <div class="q-pt-md q-gutter-sm">
      <q-btn flat color="white" @click="$instance.newGame()">
        确认
        <q-tooltip>这是一条没法回头的道路</q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGameInstance } from "@/stores/instance"

const $instance = useGameInstance().instance
</script>