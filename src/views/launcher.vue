<template>
  <initializing-inner color="primary" :label="progress.description" :details="progress.stage" :value="progress.value"
    width="200px" />
</template>

<script lang="ts" setup>
import InitializingInner from "@/components/global/initializing-inner.vue";
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStage } from '@/stores/stage';
import * as PIXI from "pixi.js";

const $router = useRouter();
const $stage = useStage();

const progress = reactive<any>({
  description: "Loading",
  stage: "Loading worker...",
  value: null,
})

onMounted(() => {
  $stage.instance = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight - 64,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: "#edeef0"
  })

  setTimeout(() => {
    progress.description = "Ready"
    progress.stage = "Cleaning up..."
    progress.value = 100

    setTimeout(() => $router.push({ name: "stage.main" }), 750);
  }, 1250)
})
</script>