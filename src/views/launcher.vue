<template>
  <initializing-inner color="primary" :label="progress.description" :details="progress.stage" :value="progress.value"
    width="200px" />
</template>

<script lang="ts" setup>
import InitializingInner from "@/components/global/initializing-inner.vue";
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStage } from '@/stores/stage';
import { StageEngine } from '../stage/engine';

const $router = useRouter();
const $stage = useStage();

const progress = reactive<any>({
  description: "Loading",
  stage: "Loading worker...",
  value: null,
})

onMounted(() => {
  $stage.instance = new StageEngine()

  setTimeout(() => {
    progress.description = "Ready"
    progress.stage = "Finishing up..."
    progress.value = 100

    setTimeout(() => $router.push({ name: "stage.main" }), 750);
  }, 1250)
})
</script>