import { Map } from "@/libs/map"
import { defineStore } from "pinia"
import { reactive, watch } from "vue"
import { useLocalStorage } from "@vueuse/core"

export const useGameInstance = defineStore("play-instance", () => {
  const store = useLocalStorage<Map>("world-save", new Map([], { x: 0, y: 0 }))
  const console = reactive<any>({ messages: [] })
  const map = reactive<Map>(store.value ? Map.fromJSON(store.value) : new Map([], { x: 0, y: 0 }))

  watch(map, (v) => {
    store.value = v
  }, { deep: true, immediate: true })

  function log(level: "debug" | "info" | "warning" | "error" | "fatal", ...messages: any[]) {
    for (const message of messages) {
      console.messages.push({ level, message: message.toString() })
    }
  }

  return { map, console, log }
})
