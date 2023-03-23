import type { MaterialType } from "@/libs/engine/material"
import { Material } from "@/libs/engine/material"
import { defaults, join } from "@/libs/engine"

export class DirtMaterial extends Material {
  id = join(defaults.namespace, "materials", "dirt")

  static attributes = {
    standable: false,
    unbreakable: false,
    replaceable: false,
    hardness: 10,
    value: 0.05,
  }

  static style = {
    color: "#815c3f"
  }

  static type: MaterialType = "solid"
}