import type { MaterialType } from "@/libs/material"
import { Material } from "@/libs/material"
import { defaults, join } from "@/libs"

export class VacuumMaterial extends Material {
  id = join(defaults.namespace, "materials", "vacuum")

  static attributes = {
    standable: true,
    unbreakable: true,
    replaceable: true
  }

  static style = {
    color: "blue"
  }

  static type: MaterialType = "gas"
}