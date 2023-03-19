import { Map } from "@/libs/map"
import { defineStore } from "pinia"
import { reactive } from "vue"

export const useGameplayData = defineStore("gameplay", () => {
  const map = reactive<Map>(new Map())

  return { map }
})
