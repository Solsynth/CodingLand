import { defaults, join } from "@/libs/index"
import { Material, MaterialTypes } from "@/libs/material"
import type { Coordinate, Direction, Map } from "@/libs/map"
import { DirectionRelativePosition } from "@/libs/map"
import { Temperature } from "@/libs/temperature"

export enum EntityTypes {
  ROBOT = "Robot"
}

export namespace EntityTypes {
  export function toString(material: EntityTypes) {
    return join(defaults.namespace, material)
  }
}

export const StandableMaterialTypes = [MaterialTypes.VACUUM]

export const UnbreakableMaterialTypes = [MaterialTypes.VACUUM, MaterialTypes.NEUTRONIUM]

export class Entity {
  // Entity name
  name: string

  // Entity type
  type: EntityTypes

  // Entity facing
  facing: Direction = "north"

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

  move(map: Map, start: Coordinate, position: Coordinate, facing: Direction): [Map, Coordinate, boolean] {
    let abs: Coordinate | null = null
    map.tiles[start.x][start.y].entities.forEach((v) => {
      if (v.name === this.name) {
        v.facing = facing
      }
    })
    
    for (const coordinate of this.reachableZone) {
      // Check position is reachable, in the map and safe
      if (coordinate.x == position.x && coordinate.y == position.y) {
        abs = { x: start.x + position.x, y: start.y + position.y }
        if (!map.inRange(abs)) {
          return [map, start, true]
        } else if (!StandableMaterialTypes.includes(map.tiles[abs.x][abs.y].material.type)) {
          return [map, start, true]
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

  dig(map: Map, start: Coordinate): [Map, boolean] {
    let abs: Coordinate | null = null
    const position: Coordinate = DirectionRelativePosition[this.facing]
    for (const coordinate of this.reachableZone) {
      // Check position is reachable, in the map and breakable
      if (coordinate.x == position.x && coordinate.y == position.y) {
        abs = { x: start.x + position.x, y: start.y + position.y }
        if (!map.inRange(abs)) {
          return [map, false]
        } else if (UnbreakableMaterialTypes.includes(map.tiles[abs.x][abs.y].material.type)) {
          return [map, false]
        } else {
          break
        }
      }
    }

    if (abs == null) {
      return [map, false]
    } else {
      // Select the tile by position
      const tile = map.tiles[abs.x][abs.y]
      // Add material to inventory
      map.inventory[tile.material.type] = (map.inventory[tile.material.type] ?? 0) + tile.mass
      // Set tile as vacuum
      map.tiles[abs.x][abs.y].mass = 0
      map.tiles[abs.x][abs.y].material.type = MaterialTypes.VACUUM
      map.tiles[abs.x][abs.y].material.temperature = new Temperature(0)

      return [map, true]
    }
  }
}