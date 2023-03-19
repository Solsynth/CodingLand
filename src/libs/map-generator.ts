import type { Coordinate } from "@/libs/map"
import { Map, MapTile } from "@/libs/map"
import { Material, MaterialTypes } from "@/libs/material"
import { Entity, EntityTypes } from "@/libs/entity"
import { Temperature } from "@/libs/temperature"

export interface IMapGenerator {
  // Generated map
  tiles: MapTile[][];
  // Material list the map will have
  materials: MaterialTypes[]
  // Safe position to spawn entities(vacuum)
  safePoints: Coordinate[]

  // Generate functions
  generate(width: number, height: number): void

  placeRobot(amount: number): Entity[]
}

export class EarthMapGenerator implements IMapGenerator {
  tiles: MapTile[][] = []
  materials = [MaterialTypes.VACUUM, MaterialTypes.WOOD, MaterialTypes.DIRT]
  safePoints: Coordinate[] = []

  generate(width: number, height: number) {
    const map: MapTile[][] = []
    for (let x = 0; x < width; x++) {
      map[x] = []
      for (let y = 0; y < height; y++) {
        const types = this.materials[Math.floor(Math.random() * this.materials.length)]
        const material = new Material(types)
        const tile = new MapTile({ x, y }, material, Math.floor(Math.random() * 1000))
        map[x][y] = tile

        if (tile.material.type == MaterialTypes.VACUUM) {
          this.safePoints.push(tile.position)
        }
      }
    }

    this.tiles = map
    return map
  }

  placeRobot(amount: number) {
    const robots = []
    for (let i = 0; i < amount; i++) {
      const position = this.safePoints[Math.floor(Math.random() * this.safePoints.length)]
      const robot = new Entity(EntityTypes.ROBOT, new Material(MaterialTypes.NEUTRONIUM, new Temperature(0)), 20, 100, `Robot${i + 1}`)
      this.tiles[position.x][position.y].entities.push(robot)
      robots.push(robot)
    }
    return robots
  }
}