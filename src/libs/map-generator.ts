import type { Coordinate } from "@/libs/map"
import { MapTile } from "@/libs/map"
import type { Entity } from "@/libs/entity"
import { Temperature } from "@/libs/temperature"
import { DirtMaterial } from "@/libs/materials/dirt"
import { RobotEntity } from "@/libs/entities/robot"
import { VacuumMaterial } from "@/libs/materials/vacuum"
import { SaveLoader } from "@/libs/loader"

export interface IMapGenerator {
  // Generated map
  tiles: MapTile[][];
  // Safe position to spawn entities(vacuum)
  safePoints: Coordinate[]

  // Generate functions
  generate(width: number, height: number): void

  placeRobot(amount: number): Entity[]
}

export class EarthMapGenerator implements IMapGenerator {
  tiles: MapTile[][] = []
  materials = [new VacuumMaterial(0, new Temperature(0)), new DirtMaterial(360, new Temperature(293.15))]
  safePoints: Coordinate[] = []

  generate(width: number, height: number) {
    const map: MapTile[][] = []
    for (let x = 0; x < width; x++) {
      map[x] = []
      for (let y = 0; y < height; y++) {
        // Deep copy the material in materials list
        const material = SaveLoader.fromJSON2Material(JSON.parse(JSON.stringify(this.materials[Math.floor(Math.random() * this.materials.length)])))
        const tile = new MapTile({ x, y }, material, Math.floor(Math.random() * 1000))
        map[x][y] = tile
        if (Object.getPrototypeOf(tile.material).constructor.attributes.standable) {
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
      const robot = new RobotEntity(`Robot${i + 1}`)
      this.tiles[position.x][position.y].entities.push(robot)
      robots.push(robot)
    }
    return robots
  }
}