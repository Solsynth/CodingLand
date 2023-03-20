import { Material } from "@/libs/material"
import type { Coordinate, Direction } from "@/libs/map"
import { DirectionRelativePosition } from "@/libs/map"
import { Temperature } from "@/libs/temperature"
import type { GameInstance } from "@/libs/instance"
import type { Task } from "@/libs/task"
import { GameObject } from "@/libs/object"
import { EntityDigTask, EntityMoveTask } from "@/libs/tasks/entity"

// Base class of entities
export class Entity extends GameObject {
  // Entity type id
  id = "undefined"

  // Get entity prototype
  get prototype() {
    return Object.getPrototypeOf(this)
  }

  // Render styles
  static style = {
    color: "red"
  }

  // Entity name
  name: string

  // Entity facing
  facing: Direction = "north"

  // Entity material
  material: Material = new Material(0, new Temperature(0))

  // Entity health
  health: number

  // Entity holding tasks
  tasks: Task[] = []

  // Entity can reach/go to area relative coordinates
  reachableZone: Coordinate[] = Object.values(DirectionRelativePosition)

  constructor(name: string, health = 100) {
    super()
    this.health = health
    this.name = name
  }

  store(instance: GameInstance, material: Material) {
    instance.inventory[material.id] = (instance.inventory[material.id] ?? 0) + material.mass
  }

  move(instance: GameInstance, start: Coordinate, facing: Direction): [Coordinate, boolean] {
    let abs: Coordinate | null = null
    const position = DirectionRelativePosition[facing]

    for (const coordinate of this.reachableZone) {
      // Check position is reachable, in the map and safe
      if (coordinate.x == position.x && coordinate.y == position.y) {
        abs = { x: start.x + position.x, y: start.y + position.y }
        if (!instance.map.inRange(abs)) {
          return [start, true]
        } else {
          break
        }
      }
    }

    if (abs == null) {
      return [start, false]
    } else {
      const task = new EntityMoveTask(this, start, abs, facing)
      this.tasks.push(task)
      return [abs, true]
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
      const task = new EntityDigTask(abs)
      task.callback = (task) => {
        this.store(instance, instance.map.tiles[task.data.position.x][task.data.position.y].material)
      }

      this.tasks.push(task)
      return true
    }
  }
}