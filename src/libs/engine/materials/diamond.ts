import type { MaterialType } from "@/libs/engine/material"
import { Material } from "@/libs/engine/material"
import { defaults, join } from "@/libs/engine"

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