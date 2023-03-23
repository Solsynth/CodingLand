import type {MaterialType} from "@/libs/engine/material"
import { Material } from "@/libs/engine/material"
import { defaults, join } from "@/libs/engine"

export class NeutroniumMaterial extends Material {
  id = join(defaults.namespace, "materials", "neutronium")

  static attributes = {
    standable: false,
    unbreakable: true,
    replaceable: false,
    hardness: 0,
    value: 0,
  }

  static style = {
    color: "#000000"
  }

  static type: MaterialType = "solid"
}