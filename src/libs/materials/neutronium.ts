import type {MaterialType} from "@/libs/material"
import { Material } from "@/libs/material"
import { defaults, join } from "@/libs"

export class NeutroniumMaterial extends Material {
  id = join(defaults.namespace, "materials", "neutronium")

  static attributes = {
    standable: false,
    unbreakable: true,
    replaceable: false,
    hardness: 0,
  }

  static style = {
    color: "#000000"
  }

  static type: MaterialType = "solid"
}