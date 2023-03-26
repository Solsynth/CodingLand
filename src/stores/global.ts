import { defineStore } from "pinia"
import { reactive, ref } from "vue"

export const useGlobalData = defineStore("game-store", () => {
  const score = ref(0)
  const inventory = reactive<any>({})

  return { score, inventory }
})