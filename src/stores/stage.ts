import type { StageEngine } from "@/stage/engine"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useStage = defineStore("stage", () => {
  const instance = ref<StageEngine>()

  return { instance }
})
