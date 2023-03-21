import type { MaterialType } from "@/libs/material"
import { Material } from "@/libs/material"
import { defaults, join } from "@/libs"

export class IronMaterial extends Material {
  id = join(defaults.namespace, "materials", "iron")

  static attributes = {
    standable: false,
    unbreakable: false,
    replaceable: false,
    hardness: 50
  }

  static style = {
    color: "#ad8c76"
  }

  static type: MaterialType = "solid"
}