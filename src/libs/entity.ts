import { Material } from "@/libs/material"
import type { Coordinate, Direction } from "@/libs/map"
import { DirectionRelativePosition } from "@/libs/map"
import { Temperature } from "@/libs/temperature"
import type { GameInstance } from "@/libs/instance"
import { VacuumMaterial } from "@/libs/materials/vacuum"

// Base class of entities
export class Entity {
  // Entity type id
  id = "undefined"

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

  // Entity can reach/go to area relative coordinates
  reachableZone: Coordinate[] = Object.values(DirectionRelativePosition)

  constructor(name: string, health = 100) {
    this.health = health
    this.name = name
  }

  store(instance: GameInstance, material: Material) {
    instance.inventory[material.id] = (instance.inventory[material.id] ?? 0) + material.mass
  }

  move(instance: GameInstance, start: Coordinate, facing: Direction): [Coordinate, boolean] {
    let abs: Coordinate | null = null
    const position = DirectionRelativePosition[facing]
    instance.map.tiles[start.x][start.y].entities.forEach((v) => {
      if (v.name === this.name) {
        v.facing = facing
      }
    })

    for (const coordinate of this.reachableZone) {
      // Check position is reachable, in the map and safe
      if (coordinate.x == position.x && coordinate.y == position.y) {
        abs = { x: start.x + position.x, y: start.y + position.y }
        if (!instance.map.inRange(abs)) {
          return [start, true]
        } else if (!(Object.getPrototypeOf(instance.map.tiles[abs.x][abs.y].material).constructor.attributes.standable)) {
          return [start, true]
        } else {
          break
        }
      }
    }

    if (abs == null) {
      return [start, false]
    } else {
      // Remove from old position
      instance.map.tiles[start.x][start.y].entities = instance.map.tiles[start.x][start.y].entities.filter((v) => v.name !== this.name)
      // Push into new position
      instance.map.tiles[abs.x][abs.y].entities.push(this)

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
        } else if (Object.getPrototypeOf(instance.map.tiles[abs.x][abs.y].material).constructor.attributes.unbreakable) {
          return false
        } else {
          break
        }
      }
    }

    if (abs == null) {
      return false
    } else {
      // Add material to inventory
      this.store(instance, instance.map.tiles[abs.x][abs.y].material)
      // Set tile as vacuum
      instance.map.tiles[abs.x][abs.y].mass = 0
      instance.map.tiles[abs.x][abs.y].material = new VacuumMaterial(0, new Temperature(0))

      return true
    }
  }
}