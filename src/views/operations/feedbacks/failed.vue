<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <div class="text-h5">行动失败</div>
      <div class="text-subtitle1">所有机器人均已失去链接</div>
      <div>指挥官，我认为您但凡在机器人电量归 0 前让他们关机等待回收也不至于沦落到现在这个地步……</div>
    </q-card-section>
    <q-card-actions>
      <div class="q-gutter-sm">
        <q-btn flat color="primary" @click="$instance.state = 'finished'">
          下一步
          <q-tooltip>有时候，越勇敢越吃亏</q-tooltip>
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