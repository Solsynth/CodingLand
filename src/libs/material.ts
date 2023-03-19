import { defaults, join } from "@/libs/index"
import { Temperature } from "@/libs/temperature"
import { MapTile } from "@/libs/map"

export enum MaterialTypes {
  VACUUM = "Vacuum",
  DIRT = "Dirt",
  WOOD = "Wood",
  STONE = "Stone",
  COAL = "Coal",
  COPPER = "Copper",
  IRON = "Iron",
  ALUMINUM = "Aluminum",
  STEEL = "Steel",
  NEUTRONIUM = "Neutronium"
}

export namespace MaterialTypes {
  export function toString(material: MaterialTypes) {
    return join(defaults.namespace, material)
  }
}

export const MATERIAL_CHANGE_TEMPERATURE = 3

export class Material {
  // Material current type
  type: MaterialTypes

  // Material current temperature
  temperature: Temperature

  // Types of materials subjected to high temperature liquefaction/vaporization
  prevType?: MaterialTypes

  // The temperature at which the material liquefaction/vaporization
  prevTemperature?: Temperature

  // Types of material subjected to low temperature condensation/solidification
  nextType?: MaterialTypes

  // The temperature at which the material condensation/solidification
  nextTemperature?: Temperature

  constructor(type: MaterialTypes, temperature: Temperature = new Temperature(0)) {
    this.type = type
    this.temperature = temperature
  }

  static fromJSON(save: any): Material {
    save.temperature = Temperature.fromJSON(save.temperature)
    return Object.setPrototypeOf(save, Material.prototype)
  }

  getType(): string {
    return MaterialTypes.toString(this.type)
  }

  getColor(): string {
    switch (this.type) {
      case MaterialTypes.DIRT:
        return "black"
      case MaterialTypes.WOOD:
        return "brown"
      case MaterialTypes.VACUUM:
        return "blue"
      default:
        return "#FFFFFF"
    }
  }

  isNextTypeReachable(): boolean {
    if (this.nextTemperature == null) {
      return false
    } else {
      return this.temperature.temperature <= this.nextTemperature.temperature + MATERIAL_CHANGE_TEMPERATURE
    }
  }

  isPrevTypeReachable(): boolean {
    if (this.prevTemperature == null) {
      return false
    } else {
      return this.temperature.temperature >= this.prevTemperature.temperature + MATERIAL_CHANGE_TEMPERATURE
    }
  }
}