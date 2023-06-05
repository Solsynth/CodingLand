import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserInterface = defineStore("ui", () => {
  const title = ref("CodingLand")

  return { title }
})
