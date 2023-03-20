import { defineStore } from "pinia"
import { reactive, watch } from "vue"
import { useLocalStorage } from "@vueuse/core"
import { GameInstance } from "@/libs/instance"
import { SaveLoader } from "@/libs/loader"

export const useGameInstance = defineStore("play-instance", () => {
  const store = useLocalStorage<GameInstance>("world-save", new GameInstance())
  const console = reactive<{ messages: any[] }>({ messages: [] })
  const instance = reactive<GameInstance>(store.value ? SaveLoader.fromJSON2Instance(store.value) : new GameInstance())

  watch(instance, (v) => {
    store.value = v
  }, { deep: true, immediate: true })

  function log(level: "debug" | "info" | "warning" | "error" | "fatal", ...messages: any[]) {
    for (const message of messages) {
      console.messages.push({ level, message: message.toString() })
    }
  }

  return { instance, console, log }
})
