import { VacuumMaterial } from "@/libs/engine/materials/vacuum"
import { DirtMaterial } from "@/libs/engine/materials/dirt"
import { NeutroniumMaterial } from "@/libs/engine/materials/neutronium"
import { Material } from "@/libs/engine/material"
import { IronMaterial } from "@/libs/engine/materials/iron"
import { DiamondMaterial } from "@/libs/engine/materials/diamond"
import { CoalMaterial } from "@/libs/engine/materials/coal"

export const materialModules = [
  Material,
  VacuumMaterial,
  DirtMaterial,
  CoalMaterial,
  IronMaterial,
  DiamondMaterial,
  NeutroniumMaterial
]