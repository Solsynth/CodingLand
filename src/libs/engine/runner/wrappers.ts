import type { GameInstance } from "@/libs/engine/instance"
import type { RobotEntity } from "@/libs/engine/entities/robot"

// Game engine contexts readonly version. For user created script.
export class SafeWrappedEngineContext {
  constructor(public readonly instance: GameInstance) {
  }
}

export class SafeWrappedRobotEntity {
  constructor(public readonly robot: RobotEntity) {
  }
}