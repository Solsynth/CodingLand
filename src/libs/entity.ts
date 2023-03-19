import { defaults, join } from "@/libs/index"
import { Material, MaterialTypes } from "@/libs/material"
import type { Coordinate } from "@/libs/map"
import type { Map, MapTile } from "@/libs/map"

export enum EntityTypes {
  ROBOT = "Robot"
}

export namespace EntityTypes {
  export function toString(material: EntityTypes) {
    return join(defaults.namespace, material)
  }
}

export const STANDABLE_MATERIAL_TYPES = [MaterialTypes.VACUUM]

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

  // Entity can reach/go to area relative coordinates
  reachableZone: Coordinate[] = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }]

  constructor(type: EntityTypes, material: Material, mass: number, health = 100, name: string, reach?: Coordinate[]) {
    this.type = type
    this.material = material
    this.mass = mass
    this.health = health
    this.name = name
    this.reachableZone = reach ?? this.reachableZone
  }

  static fromJSON(save: any): Entity {
    save.material = Material.fromJSON(save.material)
    return Object.setPrototypeOf(save, Entity.prototype)
  }

  getType(): string {
    return EntityTypes.toString(this.type)
  }

  getColor(): string {
    switch (this.type) {
      case EntityTypes.ROBOT:
        return "gold"
    }
  }

  move(map: Map, start: Coordinate, position: Coordinate): [Map, Coordinate, boolean] {
    let abs: Coordinate | null = null
    for (const coordinate of this.reachableZone) {
      // Check position is reachable, in the map and safe
      if (coordinate.x == position.x && coordinate.y == position.y) {
        abs = { x: start.x + position.x, y: start.y + position.y }
        if (!map.inRange(abs)) {
          return [map, start, false]
        } else if (!STANDABLE_MATERIAL_TYPES.includes(map.tiles[abs.x][abs.y].material.type)) {
          return [map, start, false]
        } else {
          break
        }
      }
    }

    if (abs == null) {
      return [map, start, false]
    } else {
      // Remove from old position
      map.tiles[start.x][start.y].entities = map.tiles[start.x][start.y].entities.filter((v) => v.name !== this.name)
      // Push into new position
      map.tiles[abs.x][abs.y].entities.push(this)

      return [map, abs, true]
    }
  }
}