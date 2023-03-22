import { Temperature } from "@/libs/engine/temperature"
import { GameObject } from "@/libs/engine/object"

export type MaterialType = "gas" | "liquid" | "solid"

export const MaterialChangeTemperature = 3

// Base class of materials
export class Material extends GameObject {
  // Material type id
  id = "undefined"

  // Get material prototype
  get prototype() {
    return Object.getPrototypeOf(this)
  }

  // Material attributes
  static attributes = {
    standable: true,
    unbreakable: true,
    replaceable: true,
    hardness: 200,
  }

  // Material display styles
  static style = {
    color: "red"
  }

  // Material type
  static type: MaterialType = "gas"

  // Material current mass(kilogram)
  mass: number

  // Material current temperature
  temperature: Temperature

  // Types of materials subjected to high temperature liquefaction/vaporization
  prevType?: Material

  // The temperature at which the material liquefaction/vaporization
  prevTemperature?: Temperature

  // Types of material subjected to low temperature condensation/solidification
  nextType?: Material

  // The temperature at which the material condensation/solidification
  nextTemperature?: Temperature

  // The material health
  durability: number = 100

  constructor(mass: number = 0, temperature: Temperature = new Temperature(0)) {
    super()
    this.mass = mass
    this.temperature = temperature
  }

  isNextTypeReachable(): boolean {
    if (this.nextTemperature == null) {
      return false
    } else {
      return this.temperature.temperature <= this.nextTemperature.temperature + MaterialChangeTemperature
    }
  }

  isPrevTypeReachable(): boolean {
    if (this.prevTemperature == null) {
      return false
    } else {
      return this.temperature.temperature >= this.prevTemperature.temperature + MaterialChangeTemperature
    }
  }
}
