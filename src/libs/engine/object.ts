import type { GameInstance } from "@/libs/engine/instance"
import chance from "chance"

export class GameObject {
  // Element id when draw on the scene
  drawingId: string

  constructor() {
    this.drawingId = chance().guid()
  }

  whenUpdate(instance: GameInstance) {
  }

  beforeExecuteTask(instance: GameInstance, task: unknown): boolean {
    return true
  }
}