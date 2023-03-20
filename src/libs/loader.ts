import { Map, MapTile } from "@/libs/map"
import { Entity } from "@/libs/entity"
import { Material } from "@/libs/material"
import { GameInstance } from "@/libs/instance"
import { VacuumMaterial } from "@/libs/materials/vacuum"
import { DirtMaterial } from "@/libs/materials/dirt"
import { NeutroniumMaterial } from "@/libs/materials/neutronium"
import { Temperature } from "@/libs/temperature"
import { RobotEntity } from "@/libs/entities/robot"
import { join, defaults } from "@/libs/index"

export class SaveLoader {
  static fromJSON2Instance(save: any): GameInstance {
    save.map = SaveLoader.fromJSON2Map(save.map)
    return Object.setPrototypeOf(save, GameInstance.prototype)
  }

  static fromJSON2Map(save: any): Map {
    const tiles: MapTile[][] = []
    for (const rows of save.tiles) {
      const buffer: MapTile[] = []
      for (const tile of rows) {
        buffer.push(SaveLoader.fromJSON2MapTile(tile))
      }
      tiles.push(buffer)
    }
    save.tiles = tiles
    return Object.setPrototypeOf(save, Map.prototype)
  }

  static fromJSON2MapTile(save: any): MapTile {
    const entities: Entity[] = []
    for (const entity of save.entities) {
      entities.push(SaveLoader.fromJSON2Entity(entity))
    }
    save.entities = entities
    save.material = SaveLoader.fromJSON2Material(save.material)
    return Object.setPrototypeOf(save, MapTile.prototype)
  }

  static fromJSON2Entity(save: any): Entity {
    const index: { [id: string]: Entity } = {
      [join(defaults.namespace, "entities", "robot")]: RobotEntity.prototype,
      ["undefined"]: Entity.prototype
    }

    if (save.id === "undefined") {
      console.error("[SaveLoader] Load entity failed. Unexpected id in save", save)
    }

    save.material = SaveLoader.fromJSON2Material(save.material)
    return Object.setPrototypeOf(save, index[save.id])
  }

  static fromJSON2Material(save: any): Material {
    const index: { [id: string]: Material } = {
      [join(defaults.namespace, "materials", "vacuum")]: VacuumMaterial.prototype,
      [join(defaults.namespace, "materials", "dirt")]: DirtMaterial.prototype,
      [join(defaults.namespace, "materials", "neutronium")]: NeutroniumMaterial.prototype,
      ["undefined"]: Material.prototype
    }

    if (save.id === "undefined") {
      console.error("[SaveLoader] Load material failed. Unexpected id in save", save)
    }

    save.temperature = Temperature.fromJSON(save.temperature)
    return Object.setPrototypeOf(save, index[save.id])
  }
}