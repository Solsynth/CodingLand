import type { MaterialType } from "@/libs/material"
import { Material } from "@/libs/material"
import { defaults, join } from "@/libs"

export class CoalMaterial extends Material {
  id = join(defaults.namespace, "materials", "coal")

  static attributes = {
    standable: false,
    unbreakable: false,
    replaceable: false,
    hardness: 20
  }

  static style = {
    color: "#252525"
  }

  static type: MaterialType = "solid"
}