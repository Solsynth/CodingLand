import type { GameInstance, LoggerLevel } from "@/libs/engine/instance"
import type { RobotEntity } from "@/libs/engine/entities/robot"

class ScriptRunner {
  static prepareBaseContext(instance: GameInstance) {
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
      instance: instance
    }
  }

  static runAsRobot(instance: GameInstance, robot: RobotEntity, script: string) {
    return ScriptRunner.run.call({
      ...ScriptRunner.prepareBaseContext(instance),

      robot: robot
    }, script)
  }

  static run(script: string) {
    eval("console = this.console")
    return eval(script)
  }
}

export { ScriptRunner }