import { Task } from "@/libs/task"
import { defaults, join } from "@/libs"
import type { Coordinate, Direction } from "@/libs/map"
import type { GameInstance } from "@/libs/instance"
import type { Entity } from "@/libs/entity"
import { VacuumMaterial } from "@/libs/materials/vacuum"
import { Temperature } from "@/libs/temperature"
import type { Material } from "@/libs/material"

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
        const entities = instance.map.tiles[this.data.start.x][this.data.start.y].entities
        instance.map.tiles[this.data.start.x][this.data.start.y].entities = entities.filter((v) => v.name !== this.data.innerEntity?.name)
        instance.map.tiles[this.data.position.x][this.data.position.y].entities.push(this.data.innerEntity)
        this.callback != null && this.callback(this)
      }
      this.destroyable = true
    }
  }
}

export class EntityDigTask extends Task {
  id = join(defaults.namespace, "tasks", "entity.dig")

  data: { material?: Material, position?: Coordinate } = {}

  constructor(material?: Material, position?: Coordinate, priority = 5) {
    super(priority)

    this.data.material = material
    this.data.position = position
  }

  get executable() {
    return this.data.material != null && this.data.position != null
  }

  action(instance: GameInstance) {
    super.action(instance)
    if (this.data.position == null) {
      this.destroyable = true
      return
    } else {
      const hardness = instance.map.tiles[this.data.position.x][this.data.position.y].material.prototype.constructor.attributes.hardness
      const efficiency = 100 / hardness // All Digging Speed = Base Digging Speed(100) / Hardness
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