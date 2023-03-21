import type { MaterialType } from "@/libs/material"
import { Material } from "@/libs/material"
import { defaults, join } from "@/libs"

export class DiamondMaterial extends Material {
  id = join(defaults.namespace, "materials", "diamond")

  static attributes = {
    standable: false,
    unbreakable: false,
    replaceable: false,
    hardness: 200
  }

  static style = {
    color: "#4aedd9"
  }

  static type: MaterialType = "solid"
}