import { VacuumMaterial } from "@/libs/materials/vacuum"
import { DirtMaterial } from "@/libs/materials/dirt"
import { NeutroniumMaterial } from "@/libs/materials/neutronium"
import { Material } from "@/libs/material"
import { IronMaterial } from "@/libs/materials/iron"
import { DiamondMaterial } from "@/libs/materials/diamond"
import { CoalMaterial } from "@/libs/materials/coal"

export const materialModules = [
  Material,
  VacuumMaterial,
  DirtMaterial,
  CoalMaterial,
  IronMaterial,
  DiamondMaterial,
  NeutroniumMaterial
]