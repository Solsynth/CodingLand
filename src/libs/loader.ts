import { Map, MapTile } from "@/libs/map"
import type { Entity } from "@/libs/entity"
import type { Material } from "@/libs/material"
import { GameInstance } from "@/libs/instance"
import { Temperature } from "@/libs/temperature"
import { entityModules } from "@/libs/entities"
import { materialModules } from "@/libs/materials"
import { taskModules } from "@/libs/tasks"

export class GameLoader {
  static entityModuleTree = GameLoader.modulesTreeBuilder("entities", ...entityModules)
  static materialModuleTree = GameLoader.modulesTreeBuilder("materials", ...materialModules)
  static taskModuleTree = GameLoader.modulesTreeBuilder("tasks", ...taskModules)
  static modulesTreeBuilder(namespace: string, ...modules: any[]) {
    const tree: { [id: string]: Material } = {}
    for (const module of modules) {
      const id = new module().id
      const prototype = module.prototype
      tree[id] = prototype
    }
    return tree
  }

  static fromJSON2Instance(save: any): GameInstance {
    save.map = GameLoader.fromJSON2Map(save.map)
    return Object.setPrototypeOf(save, GameInstance.prototype)
  }

  static fromJSON2Map(save: any): Map {
    const tiles: MapTile[][] = []
    for (const rows of save.tiles) {
      const buffer: MapTile[] = []
      for (const tile of rows) {
        buffer.push(GameLoader.fromJSON2MapTile(tile))
      }
      tiles.push(buffer)
    }
    save.tiles = tiles
    return Object.setPrototypeOf(save, Map.prototype)
  }

  static fromJSON2MapTile(save: any): MapTile {
    const entities: Entity[] = []
    for (const entity of save.entities) {
      entities.push(GameLoader.fromJSON2Entity(entity))
    }
    save.entities = entities
    save.material = GameLoader.fromJSON2Material(save.material)
    return Object.setPrototypeOf(save, MapTile.prototype)
  }

  static fromJSON2Entity(save: any): Entity {
    const tasks = []
    for(const task of save.tasks) {
      tasks.push(GameLoader.fromJSON2Task(task))
    }
    save.tasks = tasks

    if (save.id === "undefined") {
      console.error("[SaveLoader] Load entity failed. Unexpected id in save", save)
    }

    save.material = GameLoader.fromJSON2Material(save.material)
    return Object.setPrototypeOf(save, GameLoader.entityModuleTree[save.id])
  }

  static fromJSON2Material(save: any): Material {
    if (save.id === "undefined") {
      console.error("[SaveLoader] Load material failed. Unexpected id in save", save)
    }

    save.temperature = Temperature.fromJSON(save.temperature)
    return Object.setPrototypeOf(save, GameLoader.materialModuleTree[save.id])
  }

  static fromJSON2Task(save: any) {
    if (save.id === "undefined") {
      console.error("[SaveLoader] Load task failed. Unexpected id in save", save)
    }

    return Object.setPrototypeOf(save, GameLoader.taskModuleTree[save.id])
  }
}