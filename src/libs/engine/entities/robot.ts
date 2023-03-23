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
  script = "function robot(context) {\t\n// Start coding here\n\n}\n\nrobot(this)"

  // Robot battery power, every tick will decrease one. When the power is 0, robot cannot do anything.
  power = 1600

  static style = {
    color: "#f7d000"
  }

  material = new NeutroniumMaterial(200, new Temperature(293.15))

  calculateDiggingEst(material: Material, remain: number) {
    return remain / (this.efficiency.dig / material.prototype.constructor.attributes.hardness)
  }

  whenUpdate(instance: GameInstance) {
    super.whenUpdate(instance)

    if (this.power > 0) {
      // Use 1Wh battery power every tick(100 millisecond)
      this.power -= 1

      // Call user script
      return ScriptRunner.runAsRobot(instance, this, this.script)
    }
  }

  beforeExecuteTask(instance: GameInstance, task: unknown): boolean {
    if (this.power <= 0) {
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