import { defaults, join } from "@/libs/index"
import type { Material } from "@/libs/material"
import { MaterialTypes } from "@/libs/material"

export enum EntityTypes {
  ROBOT = "robot"
}

export namespace EntityTypes {
  export function toString(material: EntityTypes) {
    return join(defaults.namespace, material)
  }
}

export class Entity {
  // Entity name
  name: string

  // Entity type
  type: EntityTypes

  // Entity mass(kilograms)
  mass: number

  // Entity material
  material: Material

  // Entity health
  health: number

  constructor(type: EntityTypes, material: Material, mass: number, health = 100, name: string) {
    this.type = type
    this.material = material
    this.mass = mass
    this.health = health
    this.name = name
  }

  getColor() {
    switch (this.type) {
      case EntityTypes.ROBOT:
        return "gold"
    }
  }
}