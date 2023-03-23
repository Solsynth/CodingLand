import { defineStore } from "pinia"
import { reactive, ref, watch } from "vue"
import { useLocalStorage } from "@vueuse/core"
import { GameInstance } from "@/libs/engine/instance"
import { GameLoader } from "@/libs/engine/loader"
import { useQuasar } from "quasar"

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

  const instance = reactive<GameInstance>(store.value ? GameLoader.fromJSON2Instance(store.value) : new GameInstance())
  const saved = ref(true)

  const $q = useQuasar()

  function save() {
    store.value = instance
    saved.value = true

    $q.notify({ message: "Game saved.", type: "positive" })
  }

  watch(instance, () => saved.value = false, { deep: true })

  return { instance, saved, save }
})
