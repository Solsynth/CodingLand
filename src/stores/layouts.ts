import { defineStore } from "pinia"
import { reactive } from "vue"

export const useLayoutOptions = defineStore("layouts", () => {
  const options = reactive({
    drawer: {
      left: false,
      right: false
    }
  })

  return { options }
})

