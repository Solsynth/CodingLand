import type { MaterialType } from "@/libs/engine/material"
import { Material } from "@/libs/engine/material"
import { defaults, join } from "@/libs/engine"

export class IronMaterial extends Material {
  id = join(defaults.namespace, "materials", "iron")

  static attributes = {
    standable: false,
    unbreakable: false,
    replaceable: false,
    hardness: 50,
    value: 2,
  }

  static style = {
    color: "#ad8c76"
  }

  static type: MaterialType = "solid"
}