import { defineStore } from "pinia"
import { reactive } from "vue"

export const useLayoutOptions = defineStore("layouts", () => {
  const options = reactive({
    header: {
      display: true,
      elevated: true,
      bordered: false
    },
    drawer: {
      left: false,
      right: false
    }
  })

  return { options }
})

