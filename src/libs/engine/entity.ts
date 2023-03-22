import { Material } from "@/libs/engine/material"
import type { Coordinate, Direction } from "@/libs/engine/map"
import { DirectionRelativePosition } from "@/libs/engine/map"
import { Temperature } from "@/libs/engine/temperature"
import type { GameInstance } from "@/libs/engine/instance"
import type { Task } from "@/libs/engine/task"
import { GameObject } from "@/libs/engine/object"
import { EntityDigTask, EntityMoveTask } from "@/libs/engine/tasks/entity"
import { effect } from "vue"

// Base class of entities
export class Entity extends GameObject {
  id = "undefined"

  get prototype() {
    return Object.getPrototypeOf(this)
  }

  // Render styles
  static style = {
    color: "red"
  }

  name: string

  position: Coordinate

  facing: Direction = "north"

  material: Material = new Material(0, new Temperature(0))

  health = 100

  efficiency = {
    dig: 100
  }

  tasks: Task[] = []
  reachableZone: Coordinate[] = Object.values(DirectionRelativePosition)

  constructor(name: string, position: Coordinate, health = 100) {
    super()
    this.position = position
    this.health = health
    this.name = name
  }

  store(instance: GameInstance, material: Material) {
    instance.inventory[material.id] = (instance.inventory[material.id] ?? 0) + material.mass
  }

  move(instance: GameInstance, start: Coordinate, facing: Direction, callback: (n: Coordinate) => void): boolean {
    let abs: Coordinate | null = null
    const position = DirectionRelativePosition[facing]

    for (const coordinate of this.reachableZone) {
      // Check position is reachable, in the map and safe
      if (coordinate.x == position.x && coordinate.y == position.y) {
        abs = { x: start.x + position.x, y: start.y + position.y }
        if (!instance.map.inRange(abs)) {
          return false
        } else {
          break
        }
      }
    }

    if (abs == null) {
      return false
    } else {
      const task = new EntityMoveTask(this, start, abs, facing)
      task.callback = () => callback(abs as Coordinate)
      this.tasks.push(task)
      return false
    }
  }

  dig(instance: GameInstance, start: Coordinate): boolean {
    let abs: Coordinate | null = null
    const position: Coordinate = DirectionRelativePosition[this.facing]
    for (const coordinate of this.reachableZone) {
      // Check position is reachable, in the map and breakable
      if (coordinate.x == position.x && coordinate.y == position.y) {
        abs = { x: start.x + position.x, y: start.y + position.y }
        if (!instance.map.inRange(abs)) {
          return false
        } else if (instance.map.tiles[abs.x][abs.y].material.prototype.constructor.attributes.unbreakable) {
          return false
        } else {
          break
        }
      }
    }

    if (abs == null) {
      return false
    } else {
      const task = new EntityDigTask(this.efficiency.dig, instance.map.tiles[abs.x][abs.y].material, abs)
      task.callback = (task) => {
        this.store(instance, task.data.material)
      }

      this.tasks.push(task)
      return true
    }
  }
}