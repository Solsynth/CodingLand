import { defineStore } from "pinia"
import { reactive, watch } from "vue"
import { useLocalStorage } from "@vueuse/core"
import { GameInstance } from "@/libs/instance"
import { SaveLoader } from "@/libs/loader"

const debug = console.log

export const useGameInstance = defineStore("play-instance", () => {
  const store = useLocalStorage<GameInstance>("world-save", new GameInstance(), {
    serializer: {
      read(v) {
        return JSON.parse(v)
      },
      write(v) {
        return JSON.stringify(v, (k, v) => {
          if (k === "innerEntity") {
            return undefined
          } else {
            return v
          }
        })
      }
    }
  })

  const instance = reactive<GameInstance>(store.value ? SaveLoader.fromJSON2Instance(store.value) : new GameInstance())

  watch(instance, (v) => {
    store.value = v
  }, { deep: true, immediate: true })

  return { instance }
})
