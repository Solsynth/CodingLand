import type { GameInstance } from "@/libs/instance"

export class GameObject {
  whenUpdate(instance: GameInstance) {
  }

  beforeExecuteTask(instance: GameInstance, task: unknown): boolean {
    return true
  }
}