import type { StageEngine } from "@/stage/engine"
import { StageEventBus } from "@/stage/eventbus"
import { Inventory } from "@/stage/inventory/inventory"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useStage = defineStore("stage", () => {
  const inventory = new Inventory()
  const eventbus = new StageEventBus()
  const instance = ref<StageEngine | null>()

  return { instance, inventory, eventbus }
})
