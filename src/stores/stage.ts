import { defineStore } from "pinia"
import { ref } from "vue"
import * as PIXI from "pixi.js"

export const useStage = defineStore("stage", () => {
  const instance = ref<PIXI.Application>()

  return { instance }
})
