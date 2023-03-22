import { Task } from "@/libs/engine/task"
import { defaults, join } from "@/libs/engine"
import type { Coordinate, Direction } from "@/libs/engine/map"
import type { GameInstance } from "@/libs/engine/instance"
import type { Entity } from "@/libs/engine/entity"
import { VacuumMaterial } from "@/libs/engine/materials/vacuum"
import { Temperature } from "@/libs/engine/temperature"
import type { Material } from "@/libs/engine/material"

export class EntityMoveTask extends Task {
  id = join(defaults.namespace, "tasks", "entity.move")

  data: { innerEntity?: Entity, start?: Coordinate, position?: Coordinate, facing?: Direction } = {}

  constructor(entity?: Entity, start?: Coordinate, position?: Coordinate, facing?: Direction, priority = 5) {
    super(priority)

    this.data.innerEntity = entity
    this.data.facing = facing
    this.data.start = start
    this.data.position = position
  }

  get executable() {
    return this.data.innerEntity != null && this.data.facing != null && this.data.start != null && this.data.position != null
  }

  action(instance: GameInstance) {
    super.action(instance)
    if (this.data.innerEntity == null || this.data.facing == null || this.data.start == null || this.data.position == null) {
      this.destroyable = true
      return
    } else {
      instance.map.tiles[this.data.start.x][this.data.start.y].entities.forEach((v) => {
        if (v.name === this.data.innerEntity?.name) {
          v.facing = this.data.facing as Direction
        }
      })
      if (instance.map.tiles[this.data.position.x][this.data.position.y].material.prototype.constructor.attributes.standable) {
        // Cleanup
        const entities = instance.map.tiles[this.data.start.x][this.data.start.y].entities
        instance.map.tiles[this.data.start.x][this.data.start.y].entities = entities.filter((v) => v.name !== this.data.innerEntity?.name)
        // Place into tile
        this.data.innerEntity.position = this.data.position
        instance.map.tiles[this.data.position.x][this.data.position.y].entities.push(this.data.innerEntity)
        // Run callback
        this.callback != null && this.callback(this)
      }
      this.destroyable = true
    }
  }
}

export class EntityDigTask extends Task {
  id = join(defaults.namespace, "tasks", "entity.dig")

  data: { efficiency?: number, material?: Material, position?: Coordinate } = {}

  constructor(efficiency?: number, material?: Material, position?: Coordinate, priority = 5) {
    super(priority)

    this.data.efficiency = efficiency
    this.data.material = material
    this.data.position = position
  }

  get executable() {
    return this.data.efficiency != null && this.data.material != null && this.data.position != null
  }

  action(instance: GameInstance) {
    super.action(instance)
    if (this.data.position == null || this.data.efficiency == null) {
      this.destroyable = true
      return
    } else {
      const hardness = instance.map.tiles[this.data.position.x][this.data.position.y].material.prototype.constructor.attributes.hardness
      const efficiency = this.data.efficiency / hardness
      instance.map.tiles[this.data.position.x][this.data.position.y].material.durability -= efficiency

      const remain = instance.map.tiles[this.data.position.x][this.data.position.y].material.durability

      if (remain <= 0) {
        this.destroyable = true
        // Add score into instance
        const material = instance.map.tiles[this.data.position.x][this.data.position.y].material
        instance.score += material.mass * material.prototype.constructor.attributes.hardness
        // Clear tile material
        instance.map.tiles[this.data.position.x][this.data.position.y].material = new VacuumMaterial(0, new Temperature(0))
        this.callback != null && this.callback(this)
      }
    }
  }
}