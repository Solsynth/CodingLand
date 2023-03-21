import { Entity } from "@/libs/entity"
import { defaults, join } from "@/libs"
import { NeutroniumMaterial } from "@/libs/materials/neutronium"
import { Temperature } from "@/libs/temperature"
import type { GameInstance } from "@/libs/instance"
import type { Material } from "@/libs/material"

export class RobotEntity extends Entity {
  id = join(defaults.namespace, "entities", "robot")

  // Robot complete task speed
  efficiency = {
    dig: 100
  }

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
      this.power -= 1 // Use 1Wh battery power every tick(100 millisecond)
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