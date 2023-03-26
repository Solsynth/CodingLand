import { Entity } from "@/libs/engine/entity"
import { defaults, join } from "@/libs/engine"
import { NeutroniumMaterial } from "@/libs/engine/materials/neutronium"
import { Temperature } from "@/libs/engine/temperature"
import type { GameInstance } from "@/libs/engine/instance"
import type { Material } from "@/libs/engine/material"
import { ScriptRunner } from "@/libs/engine/runner"

export class RobotEntity extends Entity {
  id = join(defaults.namespace, "entities", "robot")

  // Robot holding javascript
  script = "// Start coding here\n// Those code will execute every loop\n"

  // Robot battery power, every tick will decrease one. When the power is 0, robot cannot do anything.
  power = 1600

  // Robot power state, when robot powered off, it cannot perform any tasks and will not count as death
  poweredOff = false

  static style = {
    color: "#f7d000"
  }

  material = new NeutroniumMaterial(200, new Temperature(293.15))

  powerOff() {
    this.poweredOff = true
    this.tasks = []
  }

  calculateDiggingEst(material: Material, remain: number) {
    return remain / (this.efficiency.dig / material.prototype.constructor.attributes.hardness)
  }

  whenUpdate(instance: GameInstance) {
    super.whenUpdate(instance)

    if (this.power > 0 && !this.poweredOff) {
      // Disallow player access difficulty level more than 9
      if (instance.difficulty > 9) {
        instance.messages.push({ level: "warning", message: `The dive depth is too high, the air pressure is too high, and the shell of the robot ${this.name} has been crushed.` })
        this.health -= 100
      }

      // Use battery power every tick(100 millisecond)
      this.power -= Math.round(1.2 * instance.difficulty)

      // Call user script
      return ScriptRunner.runAsRobot(instance, this, this.script)
    }
  }

  beforeExecuteTask(instance: GameInstance, task: unknown): boolean {
    if (this.power <= 0 || this.poweredOff) {
      instance.messages.push({
        level: "warning",
        message: `Robot ${this.name} has run out of battery and cannot perform tasks`
      })
      return false
    } else {
      return super.beforeExecuteTask(instance, task)
    }
  }
}