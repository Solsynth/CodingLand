import type { Material } from "@/libs/material"
import type { IMapGenerator } from "@/libs/map-generator"
import type { Entity } from "@/libs/entity"

export type Coordinate = { x: number, y: number }

export class MapTile {
  // Tile relative position
  position: Coordinate

  // Tile material
  material: Material

  // Tile entities
  entities: Entity[] = []

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

  // Robots of the map
  robots: { [name: string]: Entity } = {}

  // Map size(width, height)
  size: number[]

  constructor(tiles: MapTile[][] = [], size: number[] = [0, 0]) {
    this.tiles = tiles
    this.size = size
  }

  forEach(callback: (tile: MapTile) => void) {
    for (const rows of this.tiles) {
      for (const tile of rows) {
        callback(tile)
      }
    }
  }

  randomGenerate(generator: IMapGenerator, width: number, height: number, robots = 1) {
    generator.generate(width, height)
    generator.placeRobot(robots).forEach((v) => this.robots[v.name] = v)
    this.tiles = generator.tiles;
    this.size = [width, height]
  }
}