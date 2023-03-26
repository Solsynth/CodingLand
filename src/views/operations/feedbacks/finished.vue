<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <div class="text-h5">行动成功</div>
      <div class="text-subtitle1">有一个及以上的机器人任然保持着链接</div>
      <div>终于…… 碰上了一个理智的指挥官了……</div>
    </q-card-section>
    <q-card-actions>
      <div class="q-gutter-sm">
        <q-btn flat color="primary" @click="$instance.state = 'choosing'">
          前进
          <q-tooltip>再接再厉</q-tooltip>
        </q-btn>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
import { useGameInstance } from "@/stores/instance"

const $instance = useGameInstance().instance
</script>