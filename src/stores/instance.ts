import { Map } from "@/libs/map"
import { defineStore } from "pinia"
import { reactive, watch } from "vue"
import { useLocalStorage } from "@vueuse/core"

export const useGameInstance = defineStore("play-instance", () => {
  const store = useLocalStorage<Map>("world-save", new Map())
  const map = reactive<Map>(store.value ? Map.fromJSON(store.value) : new Map())
  console.log(map)

  watch(map, (v) => {
    store.value = v
  }, { deep: true, immediate: true })

  return { map }
})
