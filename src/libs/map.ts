import type { Material } from "@/libs/material"
import type { Entity } from "@/libs/entity"

export type Coordinate = { x: number, y: number }

export type Direction = "north" | "south" | "west" | "east"
export const DirectionRelativePosition: { [id: string]: Coordinate } = {
  center: { x: 0, y: 0 },
  north: { x: -1, y: 0 },
  south: { x: 1, y: 0 },
  west: { x: 0, y: -1 },
  east: { x: 0, y: 1 }
}

export class MapTile {
  // Tile absolute position
  position: Coordinate

  // Tile material
  material: Material

  // Tile entities
  entities: Entity[] = []

  // TODO Tile buildings

  // Tile mass(weight) use kilogram unit
  mass: number

  constructor(position: Coordinate, material: Material, mass: number) {
    this.position = position
    this.material = material
    this.mass = mass
  }
}

export class Map {
  // Tiles of the map
  tiles: MapTile[][]

  // Map size(width, height)
  size: Coordinate

  constructor(tiles: MapTile[][] = [], size: Coordinate) {
    this.tiles = tiles
    this.size = size
  }

  inRange(position: Coordinate): boolean {
    return this.size.x > position.x && position.x >= 0 && this.size.y > position.y && position.y >= 0
  }

  forEach(callback: (tile: MapTile) => void) {
    for (const rows of this.tiles) {
      for (const tile of rows) {
        callback(tile)
      }
    }
  }
}