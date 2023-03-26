import type { Coordinate } from "@/libs/engine/map"
import { MapTile } from "@/libs/engine/map"
import type { Entity } from "@/libs/engine/entity"
import { Temperature } from "@/libs/engine/temperature"
import { DirtMaterial } from "@/libs/engine/materials/dirt"
import { RobotEntity } from "@/libs/engine/entities/robot"
import { VacuumMaterial } from "@/libs/engine/materials/vacuum"
import { GameLoader } from "@/libs/engine/loader"
import { IronMaterial } from "@/libs/engine/materials/iron"
import { DiamondMaterial } from "@/libs/engine/materials/diamond"
import { CoalMaterial } from "@/libs/engine/materials/coal"
import chance from "chance"

export interface IMapGenerator {
  // Generated map
  tiles: MapTile[][];

  // Generate function
  generate(width: number, height: number): void

  // Generate robot position function
  placeRobot(amount: number): Entity[]
}

export class EarthMapGenerator implements IMapGenerator {
  tiles: MapTile[][] = []
  materials = [
    { material: new DirtMaterial(360, new Temperature(293.15)), possibility: 0.5 },
    { material: new CoalMaterial(360, new Temperature(293.15)), possibility: 0.4 },
    { material: new IronMaterial(360, new Temperature(293.15)), possibility: 0.3 },
    { material: new DiamondMaterial(360, new Temperature(293.15)), possibility: 0.15 },
    { material: new VacuumMaterial(0, new Temperature(0)), possibility: 0 }
  ]

  generate(width: number, height: number) {
    const map: MapTile[][] = []
    for (let x = 0; x < width; x++) {
      map[x] = []
      for (let y = 0; y < height; y++) {
        const key = chance().floating({ min: 0.15, max: 1 })
        for (const item of this.materials) {
          if (item.possibility < key) {
            // Deep copy the material in materials list
            const material = GameLoader.fromJSON2Material(JSON.parse(JSON.stringify(item.material)))
            const tile = new MapTile({ x, y }, material, Math.floor(Math.random() * 1000))
            map[x][y] = tile
            break
          }
        }
      }
    }

    this.tiles = map
    return map
  }

  placeRobot(amount: number) {
    const robots = []
    for (let i = 0; i < amount; i++) {
      const position: Coordinate = { x: chance().integer({ min: 0, max: 19 }), y: chance().integer({ min: 0, max: 19 }) }
      const robot = new RobotEntity(`Robot${i + 1}`, position)

      this.tiles[position.x][position.y].material = new VacuumMaterial(0, new Temperature(0))
      this.tiles[position.x][position.y].entities.push(robot)
      robots.push(robot)
    }
    return robots
  }
}