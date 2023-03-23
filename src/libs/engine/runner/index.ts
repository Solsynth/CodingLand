import type { GameInstance, LoggerLevel } from "@/libs/engine/instance"
import type { RobotEntity } from "@/libs/engine/entities/robot"
import { SafeWrappedEngineContext, SafeWrappedRobotEntity } from "@/libs/engine/runner/wrappers"

class ScriptRunner {
  static prepareBaseContext(instance: GameInstance) {
    const engine = new SafeWrappedEngineContext(instance)

    return {
      // Override console object
      console: {
        log: (message: string, level: LoggerLevel = "info") => instance.messages.push({ level, message }),
        clear: () => instance.messages = [],
        debug: (message: string) => instance.messages.push({ level: "debug", message }),
        info: (message: string) => instance.messages.push({ level: "info", message }),
        warn: (message: string) => instance.messages.push({ level: "warning", message }),
        error: (message: string) => instance.messages.push({ level: "error", message })
      },
      instance: engine.instance
    }
  }

  static runAsRobot(instance: GameInstance, robot: RobotEntity, script: string) {
    return ScriptRunner.run.call({
      ...ScriptRunner.prepareBaseContext(instance),

      // Provide safe wrapped types
      robot: new SafeWrappedRobotEntity(robot)
    }, script)
  }

  static run(script: string) {
    return eval(script)
  }
}

export { ScriptRunner }