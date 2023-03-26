import { defineStore } from "pinia"
import { reactive, ref, watch } from "vue"
import { useStorage } from "@vueuse/core"

export const useGlobalData = defineStore("game-store", () => {
  const $storage = useStorage("global-save", { score: 0, inventory: {} })

  const score = ref($storage.value.score)
  const inventory = reactive<any>($storage.value.inventory)

  watch(score, (v) => $storage.value.score = v)
  watch(inventory, (v) => $storage.value.inventory = v)

  return { score, inventory }
})