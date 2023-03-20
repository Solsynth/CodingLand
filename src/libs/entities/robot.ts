import { Entity } from "@/libs/entity"
import { defaults, join } from "@/libs"
import { NeutroniumMaterial } from "@/libs/materials/neutronium"
import { Temperature } from "@/libs/temperature"

export class RobotEntity extends Entity {
  id = join(defaults.namespace, "entities", "robot")

  static style = {
    color: "#f7d000"
  }

  material = new NeutroniumMaterial(200, new Temperature(293.15))
}